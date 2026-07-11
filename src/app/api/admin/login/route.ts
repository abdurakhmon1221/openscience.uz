import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    // In production, these should be in your environment variables (.env.local)
    // For now we check against env vars, fallback to default if not set
    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'butcher1221';
    
    const editorUser = process.env.EDITOR_USERNAME || 'editor';
    const editorPass = process.env.EDITOR_PASSWORD || 'editor123';
    
    if (username === adminUser && password === adminPass) {
      return NextResponse.json({ success: true, role: 'admin' });
    }
    
    if (username === editorUser && password === editorPass) {
      return NextResponse.json({ success: true, role: 'editor' });
    }

    return NextResponse.json({ success: false, error: "Login yoki parol noto'g'ri!" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
