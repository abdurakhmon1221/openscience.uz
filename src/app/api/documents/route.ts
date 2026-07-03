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

    if (mode === "cert1" || mode === "cert2") {
      // Generate Certificates
      const pdfDoc = await PDFDocument.create();
      
      const page = pdfDoc.addPage([842, 595]); 
      const { width, height } = page.getSize();
      
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const timesRomanItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
      const qrImage = await pdfDoc.embedPng(qrCodeImageBytes);

      // Programmatic beautiful background
      // 1. Light cream background
      page.drawRectangle({
        x: 0, y: 0, width: width, height: height,
        color: rgb(0.98, 0.97, 0.95),
      });

      // 2. Thick Dark Blue Border
      page.drawRectangle({
        x: 20, y: 20, width: width - 40, height: height - 40,
        borderColor: rgb(0.05, 0.15, 0.35),
        borderWidth: 6,
      });

      // 3. Thin Gold Border inside
      page.drawRectangle({
        x: 32, y: 32, width: width - 64, height: height - 64,
        borderColor: rgb(0.8, 0.65, 0.2),
        borderWidth: 2,
      });

      // 4. Corner decorative squares (Dark Blue)
      const cornerSize = 15;
      const drawCorner = (x: number, y: number) => {
        page.drawRectangle({ x, y, width: cornerSize, height: cornerSize, color: rgb(0.05, 0.15, 0.35) });
      };
      drawCorner(25, 25);
      drawCorner(width - 40, 25);
      drawCorner(25, height - 40);
      drawCorner(width - 40, height - 40);

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
        // Appreciation Certificate
        drawTextCentered("OPENSCIENCE", height - 100, 20, width - 200, helveticaBold, rgb(0.5, 0.5, 0.5));
        
        page.drawLine({
          start: { x: width / 2 - 50, y: height - 120 },
          end: { x: width / 2 + 50, y: height - 120 },
          thickness: 2,
          color: rgb(0.8, 0.65, 0.2)
        });

        drawTextCentered("CERTIFICATE OF APPRECIATION", height - 170, 36, width - 100, helveticaBold, rgb(0.05, 0.15, 0.35));
        
        drawTextCentered("THIS CERTIFICATE IS PROUDLY PRESENTED TO", height - 230, 12, width - 200, helveticaBold, rgb(0.4, 0.4, 0.4));
        
        // Author Name
        drawTextCentered(article.authors.toUpperCase(), height - 290, 32, width - 200, timesRomanItalic, rgb(0.1, 0.1, 0.1));

        page.drawLine({
          start: { x: width / 2 - 200, y: height - 310 },
          end: { x: width / 2 + 200, y: height - 310 },
          thickness: 1,
          color: rgb(0.8, 0.8, 0.8)
        });

        drawTextCentered("For successfully publishing the research article titled:", height - 350, 14, width - 200, helveticaFont, rgb(0.3, 0.3, 0.3));
        drawTextCentered(`"${article.title}"`, height - 390, 18, width - 250, helveticaBold, rgb(0.1, 0.1, 0.1));

        // Signatures and Date area
        page.drawText("DATE", { x: 200, y: 100, size: 12, font: helveticaBold, color: rgb(0.3, 0.3, 0.3) });
        page.drawText(new Date(article.created_at).toLocaleDateString(), { x: 190, y: 120, size: 12, font: helveticaFont, color: rgb(0.1, 0.1, 0.1) });
        page.drawLine({ start: { x: 150, y: 115 }, end: { x: 280, y: 115 }, thickness: 1, color: rgb(0.5, 0.5, 0.5) });

        page.drawText("SIGNATURE", { x: width - 250, y: 100, size: 12, font: helveticaBold, color: rgb(0.3, 0.3, 0.3) });
        page.drawLine({ start: { x: width - 300, y: 115 }, end: { x: width - 150, y: 115 }, thickness: 1, color: rgb(0.5, 0.5, 0.5) });

        // QR Code in bottom center
        page.drawImage(qrImage, { x: width / 2 - 40, y: 60, width: 80, height: 80 });

      } else {
        // Publication Certificate (Cert 2)
        drawTextCentered("INTERNATIONAL PUBLICATION DIPLOMA", height - 140, 32, width - 150, helveticaBold, rgb(0.05, 0.15, 0.35));
        drawTextCentered("Scientific Conference & Monthly Journal", height - 180, 16, width - 200, helveticaFont, rgb(0.4, 0.4, 0.4));

        drawTextCentered("This diploma is awarded to", height - 240, 14, width - 200, timesRomanItalic, rgb(0.3, 0.3, 0.3));
        drawTextCentered(article.authors.toUpperCase(), height - 290, 26, width - 250, helveticaBold, rgb(0.1, 0.1, 0.1));
        
        drawTextCentered(`For the outstanding paper: "${article.title}"`, height - 340, 18, width - 300, helveticaFont, rgb(0.2, 0.2, 0.2));

        // Draw logos/badges at the bottom edges
        const logos = ["Google Scholar", "Zenodo", "ResearchGate", "ResearchBib"];
        logos.forEach((logo, i) => {
          page.drawRectangle({
            x: 100 + (i * 150), y: 70, width: 120, height: 30,
            color: rgb(0.9, 0.9, 0.9),
            borderColor: rgb(0.8, 0.65, 0.2),
            borderWidth: 1
          });
          page.drawText(logo, {
            x: 110 + (i * 150), y: 80, size: 10, font: helveticaBold, color: rgb(0.3, 0.3, 0.3)
          });
        });

        // QR Code
        page.drawImage(qrImage, { x: width / 2 - 40, y: 120, width: 80, height: 80 });
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
