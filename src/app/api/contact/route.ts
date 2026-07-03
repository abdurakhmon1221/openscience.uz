import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Maydonlar to\'liq emas' }, { status: 400 });
    }

    // Supabase client funksiya ichida yaratiladi (build vaqtida muammo bo'lmasin)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase
        .from('contact_messages')
        .insert([{ name, email, subject, message, status: 'unread' }]);
    }

    // 2. Telegramga yuborish
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramBotToken && telegramChatId) {
      const text = `📨 *Yangi xabar (OpenScience)*\n\n👤 *Ism:* ${name}\n📧 *Email:* ${email}\n📝 *Mavzu:* ${subject || 'Yo\'q'}\n\n💬 *Xabar:*\n${message}`;
      
      const tgResponse = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: text,
          parse_mode: 'Markdown'
        })
      });

      if (!tgResponse.ok) {
        console.error("Telegram API Error:", await tgResponse.text());
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
