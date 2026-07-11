import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get("mode"); // 'watermark', 'cert1', 'cert2'
  const id = searchParams.get("id");

  if (!mode || !id) {
    return new NextResponse("Missing parameters", { status: 400 });
  }

  try {
    const supabase = await createClient();
    
    // Fetch article from database
    const { data: article, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !article) {
      return new NextResponse("Article not found", { status: 404 });
    }

    const articleUrl = `https://openscience.com.uz/article/${article.id}`;
    
    // Generate QR Code buffer
    const qrCodeDataUrl = await QRCode.toDataURL(articleUrl, { margin: 1 });
    const qrCodeImageBytes = Buffer.from(qrCodeDataUrl.split(',')[1], 'base64');

    if (mode === "watermark") {
      // Fetch original PDF
      const response = await fetch(article.file_url);
      if (!response.ok) throw new Error("Failed to fetch PDF");
      const pdfBytes = await response.arrayBuffer();

      const pdfDoc = await PDFDocument.load(pdfBytes);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const qrImage = await pdfDoc.embedPng(qrCodeImageBytes);

      const pages = pdfDoc.getPages();
      
      // Add watermark to each page
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        const margin = 30;
        const qrSize = 50;

        // Top watermark box (Moved from bottom to top)
        page.drawRectangle({
          x: margin,
          y: height - margin - qrSize - 10,
          width: width - margin * 2,
          height: qrSize + 10,
          color: rgb(0.95, 0.95, 0.95),
          opacity: 0.8,
        });

        // Draw QR Code at TOP
        page.drawImage(qrImage, {
          x: margin + 5,
          y: height - margin - qrSize - 5,
          width: qrSize,
          height: qrSize,
        });

        // Draw text at TOP
        page.drawText("OpenScience Ilmiy Jurnali", {
          x: margin + qrSize + 15,
          y: height - margin - 20,
          size: 12,
          font: helveticaBold,
          color: rgb(0, 0.2, 0.6),
        });

        let titleText = article.title;
        if (titleText.length > 60) titleText = titleText.substring(0, 60) + "...";
        
        page.drawText(`Maqola: ${titleText}`, {
          x: margin + qrSize + 15,
          y: height - margin - 40,
          size: 10,
          font: helveticaFont,
          color: rgb(0.2, 0.2, 0.2),
        });
        
        page.drawText(`Tasdiqlangan ID: ${article.id.slice(0, 8)}`, {
          x: margin + qrSize + 15,
          y: height - margin - 55,
          size: 8,
          font: helveticaFont,
          color: rgb(0.5, 0.5, 0.5),
        });

        // Bottom footer
        const dateStr = new Date().toLocaleDateString('uz-UZ');
        const footerText = `ISSN: XXXX-XXXX | Volume: 1 | Date: ${dateStr}`;
        const textWidth = helveticaFont.widthOfTextAtSize(footerText, 10);
        
        page.drawText(footerText, {
          x: (width - textWidth) / 2,
          y: 20,
          size: 10,
          font: helveticaFont,
          color: rgb(0.4, 0.4, 0.4),
        });
      });

      const modifiedPdfBytes = await pdfDoc.save();

      return new NextResponse(Buffer.from(modifiedPdfBytes), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="OpenScience_${article.id.slice(0, 6)}.pdf"`,
        },
      });
    }

    if (mode === "cert1" || mode === "cert2" || mode === "cert3" || mode === "cert4") {
      // Generate Certificates
      const pdfDoc = await PDFDocument.create();
      
      const isPortrait = mode === "cert4";
      const page = pdfDoc.addPage(isPortrait ? [595, 842] : [842, 595]); 
      const { width, height } = page.getSize();
      
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const timesRomanItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
      const qrImage = await pdfDoc.embedPng(qrCodeImageBytes);

      // Helper function to scale text to fit width
      const drawTextCentered = (text: string, y: number, maxSize: number, maxWidth: number, font: any, color: any) => {
        let size = maxSize;
        let textWidth = font.widthOfTextAtSize(text, size);
        while (textWidth > maxWidth && size > 10) {
          size -= 1;
          textWidth = font.widthOfTextAtSize(text, size);
        }
        page.drawText(text, {
          x: (width - textWidth) / 2,
          y: y,
          size: size,
          font: font,
          color: color,
        });
      };

      if (mode === "cert1") {
        // Standard Publication Certificate
        page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.98, 0.97, 0.95) });
        page.drawRectangle({ x: 20, y: 20, width: width - 40, height: height - 40, borderColor: rgb(0.05, 0.15, 0.35), borderWidth: 6 });
        page.drawRectangle({ x: 32, y: 32, width: width - 64, height: height - 64, borderColor: rgb(0.8, 0.65, 0.2), borderWidth: 2 });
        const drawCorner = (x: number, y: number) => page.drawRectangle({ x, y, width: 15, height: 15, color: rgb(0.05, 0.15, 0.35) });
        drawCorner(25, 25); drawCorner(width - 40, 25); drawCorner(25, height - 40); drawCorner(width - 40, height - 40);

        // Watermark
        drawTextCentered("OPENSCIENCE", height / 2, 80, width, helveticaBold, rgb(0.95, 0.95, 0.93));

        drawTextCentered("OPENSCIENCE", height - 100, 20, width - 200, helveticaBold, rgb(0.5, 0.5, 0.5));
        page.drawLine({ start: { x: width / 2 - 50, y: height - 120 }, end: { x: width / 2 + 50, y: height - 120 }, thickness: 2, color: rgb(0.8, 0.65, 0.2) });
        drawTextCentered("RASMIY NASHR SERTIFIKATI", height - 170, 36, width - 100, helveticaBold, rgb(0.05, 0.15, 0.35));
        drawTextCentered("Ushbu sertifikat quyidagi muallifga taqdim etiladi:", height - 230, 14, width - 200, helveticaBold, rgb(0.4, 0.4, 0.4));
        drawTextCentered(article.authors.toUpperCase(), height - 290, 32, width - 200, timesRomanItalic, rgb(0.1, 0.1, 0.1));
        page.drawLine({ start: { x: width / 2 - 200, y: height - 310 }, end: { x: width / 2 + 200, y: height - 310 }, thickness: 1, color: rgb(0.8, 0.8, 0.8) });
        drawTextCentered("Google Scholar bazasida indekslanuvchi xalqaro jurnalda", height - 340, 14, width - 200, helveticaFont, rgb(0.3, 0.3, 0.3));
        drawTextCentered("quyidagi maqolani muvaffaqiyatli nashr etganligi uchun:", height - 360, 14, width - 200, helveticaFont, rgb(0.3, 0.3, 0.3));
        drawTextCentered(`"${article.title}"`, height - 410, 18, width - 250, helveticaBold, rgb(0.1, 0.1, 0.1));

        page.drawText("SANA", { x: 200, y: 100, size: 12, font: helveticaBold, color: rgb(0.3, 0.3, 0.3) });
        page.drawText(new Date(article.created_at).toLocaleDateString(), { x: 190, y: 120, size: 12, font: helveticaFont, color: rgb(0.1, 0.1, 0.1) });
        page.drawLine({ start: { x: 150, y: 115 }, end: { x: 280, y: 115 }, thickness: 1, color: rgb(0.5, 0.5, 0.5) });

        page.drawText("IMZO VA MUHR", { x: width - 270, y: 100, size: 12, font: helveticaBold, color: rgb(0.3, 0.3, 0.3) });
        page.drawLine({ start: { x: width - 300, y: 115 }, end: { x: width - 150, y: 115 }, thickness: 1, color: rgb(0.5, 0.5, 0.5) });

        page.drawImage(qrImage, { x: width / 2 - 40, y: 60, width: 80, height: 80 });

      } else if (mode === "cert2") {
        // OpenScience International Scientific Conference (Landscape)
        page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.95, 0.97, 1.0) });
        page.drawRectangle({ x: 15, y: 15, width: width - 30, height: height - 30, borderColor: rgb(0.1, 0.3, 0.6), borderWidth: 4 });
        
        drawTextCentered("OPENSCIENCE", height / 2, 80, width, helveticaBold, rgb(0.9, 0.93, 0.98));

        drawTextCentered("CERTIFICATE OF PARTICIPATION", height - 120, 34, width - 100, helveticaBold, rgb(0.1, 0.3, 0.6));
        drawTextCentered("OpenScience International Scientific Conference", height - 160, 20, width - 150, helveticaFont, rgb(0.8, 0.4, 0.1));
        drawTextCentered("This certifies that", height - 220, 16, width - 200, timesRomanItalic, rgb(0.3, 0.3, 0.3));
        drawTextCentered(article.authors.toUpperCase(), height - 280, 28, width - 250, helveticaBold, rgb(0.1, 0.1, 0.1));
        drawTextCentered("actively participated and presented the research paper:", height - 330, 14, width - 300, helveticaFont, rgb(0.2, 0.2, 0.2));
        drawTextCentered(`"${article.title}"`, height - 380, 16, width - 300, helveticaBold, rgb(0.1, 0.1, 0.1));

        page.drawImage(qrImage, { x: 100, y: 80, width: 80, height: 80 });
        page.drawText("OpenScience Organizing Committee", { x: width - 320, y: 100, size: 14, font: helveticaBold, color: rgb(0.1, 0.3, 0.6) });
        page.drawLine({ start: { x: width - 350, y: 120 }, end: { x: width - 80, y: 120 }, thickness: 1, color: rgb(0.1, 0.3, 0.6) });

      } else if (mode === "cert3") {
        // Yosh Olimlar va Innovatsiyalar - 2026 (Premium color)
        page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(1, 0.98, 0.95) });
        page.drawRectangle({ x: 20, y: 20, width: width - 40, height: height - 40, borderColor: rgb(0.6, 0.1, 0.1), borderWidth: 8 });
        
        drawTextCentered("YOSH OLIMLAR - 2026", height / 2, 70, width, helveticaBold, rgb(0.98, 0.95, 0.9));

        drawTextCentered("ENG YAXSHI TADQIQOTCHI DIPLOMI", height - 120, 36, width - 100, helveticaBold, rgb(0.6, 0.1, 0.1));
        drawTextCentered("\"YOSH OLIMLAR VA INNOVATSIYALAR - 2026\" TANLOVI", height - 160, 18, width - 150, helveticaBold, rgb(0.8, 0.6, 0.2));
        drawTextCentered("Fanga qo'shgan hissasi uchun mukofotlanadi:", height - 220, 14, width - 200, helveticaFont, rgb(0.3, 0.3, 0.3));
        drawTextCentered(article.authors.toUpperCase(), height - 280, 30, width - 250, timesRomanItalic, rgb(0.6, 0.1, 0.1));
        drawTextCentered(`Ilmiy ish mavzusi:`, height - 330, 14, width - 300, helveticaFont, rgb(0.2, 0.2, 0.2));
        drawTextCentered(`"${article.title}"`, height - 380, 18, width - 300, helveticaBold, rgb(0.1, 0.1, 0.1));

        page.drawImage(qrImage, { x: width / 2 - 45, y: 80, width: 90, height: 90 });
        page.drawText("Hakamlar hay'ati", { x: 150, y: 100, size: 14, font: helveticaBold, color: rgb(0.6, 0.1, 0.1) });
        page.drawLine({ start: { x: 100, y: 120 }, end: { x: 300, y: 120 }, thickness: 1, color: rgb(0.6, 0.1, 0.1) });

      } else if (mode === "cert4") {
        // Ilmiy Ma'lumotnoma (Spravka) (Portrait, official)
        page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(1, 1, 1) });
        
        // Watermark
        drawTextCentered("OPENSCIENCE", height / 2, 60, width, helveticaBold, rgb(0.97, 0.97, 0.97));

        // Header
        page.drawText("OPENSCIENCE ILMIY JURNALI TAHRIRIYATI", { x: 50, y: height - 80, size: 14, font: helveticaBold, color: rgb(0.1, 0.1, 0.1) });
        page.drawLine({ start: { x: 50, y: height - 90 }, end: { x: width - 50, y: height - 90 }, thickness: 2, color: rgb(0.1, 0.1, 0.1) });
        
        page.drawText(`Sana: ${new Date(article.created_at).toLocaleDateString()}`, { x: width - 200, y: height - 120, size: 12, font: helveticaFont, color: rgb(0.1, 0.1, 0.1) });
        page.drawText(`Qayd raqami: #${article.id.split('-')[0]}`, { x: 50, y: height - 120, size: 12, font: helveticaFont, color: rgb(0.1, 0.1, 0.1) });

        drawTextCentered("MA'LUMOTNOMA (SPRAVKA)", height - 200, 22, width - 100, helveticaBold, rgb(0.1, 0.1, 0.1));

        const bodyText = `Ushbu ma'lumotnoma ${article.authors} tomonidan yozilgan "${article.title}" nomli ilmiy maqola OpenScience xalqaro ilmiy jurnalida muvaffaqiyatli chop etilganligini tasdiqlash uchun berildi.`;
        
        // Manual wrapping for bodyText (approximate)
        page.drawText(`Ushbu ma'lumotnoma`, { x: 80, y: height - 260, size: 14, font: helveticaFont, color: rgb(0.1, 0.1, 0.1) });
        page.drawText(`${article.authors}`, { x: 80, y: height - 280, size: 14, font: helveticaBold, color: rgb(0.1, 0.1, 0.1) });
        page.drawText(`tomonidan yozilgan`, { x: 80, y: height - 300, size: 14, font: helveticaFont, color: rgb(0.1, 0.1, 0.1) });
        
        // Wrap title
        const words = `"${article.title}"`.split(' ');
        let line = '';
        let yPos = height - 340;
        for(let w of words) {
            if (helveticaBold.widthOfTextAtSize(line + w + ' ', 14) > width - 160) {
                page.drawText(line, { x: 80, y: yPos, size: 14, font: helveticaBold, color: rgb(0.1, 0.1, 0.1) });
                line = w + ' ';
                yPos -= 20;
            } else {
                line += w + ' ';
            }
        }
        page.drawText(line, { x: 80, y: yPos, size: 14, font: helveticaBold, color: rgb(0.1, 0.1, 0.1) });
        
        yPos -= 30;
        page.drawText(`nomli ilmiy maqola OpenScience xalqaro ilmiy jurnalida`, { x: 80, y: yPos, size: 14, font: helveticaFont, color: rgb(0.1, 0.1, 0.1) });
        yPos -= 20;
        page.drawText(`muvaffaqiyatli chop etilganligini tasdiqlash uchun berildi.`, { x: 80, y: yPos, size: 14, font: helveticaFont, color: rgb(0.1, 0.1, 0.1) });

        yPos -= 50;
        page.drawText(`Maqola Google Scholar va boshqa xalqaro ilmiy bazalarga indeksatsiya qilindi.`, { x: 80, y: yPos, size: 12, font: helveticaBold, color: rgb(0.1, 0.1, 0.1) });

        // Footer signatures
        page.drawText("Bosh Muharrir:", { x: 80, y: yPos - 100, size: 12, font: helveticaBold, color: rgb(0.1, 0.1, 0.1) });
        page.drawLine({ start: { x: 200, y: yPos - 100 }, end: { x: 400, y: yPos - 100 }, thickness: 1, color: rgb(0.1, 0.1, 0.1) });
        
        page.drawImage(qrImage, { x: width - 150, y: yPos - 140, width: 100, height: 100 });
      }

      const certBytes = await pdfDoc.save();

      return new NextResponse(Buffer.from(certBytes), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="Sertifikat_${mode}_${article.id.slice(0, 6)}.pdf"`,
        },
      });
    }

    return new NextResponse("Invalid mode", { status: 400 });

  } catch (error: any) {
    console.error("PDF Generation Error:", error);
    return new NextResponse("Error generating document: " + error.message, { status: 500 });
  }
}
