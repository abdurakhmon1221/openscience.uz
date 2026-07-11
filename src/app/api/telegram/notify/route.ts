import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn("Telegram bot token or chat ID is missing in environment variables.");
      return NextResponse.json({ success: false, error: "Telegram config missing" }, { status: 500 });
    }

    // Determine message type
    let message = "";
    if (data.type === 'new_article') {
      message = `📝 *Yangi maqola yuklandi!*\n\n*Sarlavha:* ${data.title}\n*Muallif(lar):* ${data.authors}\n*Kategoriya:* ${data.category}\n*Kalit so'zlar:* ${data.keywords}\n\nAdmin panelga kirib tekshiring: https://openscience.com.uz/admin`;
    } else if (data.type === 'contact_message') {
      message = `📬 *Yangi xabar (Aloqa bo'limidan)*\n\n*Ism:* ${data.name}\n*Email:* ${data.email}\n*Xabar:* ${data.message}`;
    } else {
      message = `Noma'lum xabar turi.`;
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      throw new Error(`Telegram API xatosi: ${response.statusText}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Telegram notification error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
