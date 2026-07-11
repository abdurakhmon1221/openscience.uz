"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, XCircle, Search, FileText, AlertTriangle,
  Eye, Settings, Users, BarChart3, Mail, Lock, LogOut, Bell,
  Edit, Trash2, Save, X, ExternalLink, ShieldCheck, Award, Download
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Admin and Editor credentials are now securely handled on the server.
type Tab = "pending" | "approved" | "rejected" | "settings" | "stats" | "contact";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("pending");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<"admin" | "editor" | null>(null);
  const [secretClickCount, setSecretClickCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const secretTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const supabase = createClient();

  const [articles, setArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);

  // Site settings state (editable)
  const [siteSettings, setSiteSettings] = useState({
    siteTitle: "OpenScience.uz",
    issn: "XXXX-XXXX (tahminiy)",
    contactEmail: "info@openscience.uz",
    contactPhone: "+998 88 038 80 71",
    contactAddress: "Andijon viloyati, Andijon shahar, Milliy tiklanish ko'chasi 28",
    facebook: "openscience_uz",
    instagram: "openscience_uz",
    telegram: "@MaxmudovHikmatillo",
  });
  const [editingSettings, setEditingSettings] = useState(false);
  const [savedSettings, setSavedSettings] = useState(false);
  const fetchArticles = async () => {
    setLoadingArticles(true);
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (data) setArticles(data);
    setLoadingArticles(false);
  };

  const pendingArticles = articles.filter(a => a.status === 'pending');
  const approvedArticles = articles.filter(a => a.status === 'approved');
  const rejectedArticles = articles.filter(a => a.status === 'rejected');

  const stats = [
    { label: "Jami maqolalar", value: "147", change: "+12 bu oy", color: "blue" },
    { label: "Tasdiqlangan", value: "123", change: "+8 bu oy", color: "green" },
    { label: "Kutilmoqda", value: "2", change: "", color: "amber" },
    { label: "Foydalanuvchilar", value: "89", change: "+5 bu oy", color: "purple" },
  ];

  // Secret: click logo 5 times within 4s
  const handleLogoClick = () => {
    const newCount = secretClickCount + 1;
    setSecretClickCount(newCount);
    if (secretTimer.current) clearTimeout(secretTimer.current);
    secretTimer.current = setTimeout(() => setSecretClickCount(0), 4000);
    if (newCount >= 5) {
      setSecretClickCount(0);
      setShowLoginModal(true);
    }
  };

  const handleLogin = async () => {
    try {
      setLoginError("");
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setIsLoggedIn(true);
        setRole(data.role);
        setShowLoginModal(false);
        fetchArticles();
      } else {
        setLoginError(data.error || "Login yoki parol noto'g'ri!");
      }
    } catch (err) {
      setLoginError("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    }
  };

  const updateArticleStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('articles').update({ status: newStatus }).eq('id', id);
    if (!error) {
      fetchArticles(); // Refresh list
    } else {
      alert("Xatolik yuz berdi: " + error.message);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    setLoginForm({ username: "", password: "" });
    setActiveTab("pending");
  };

  const handleSaveSettings = () => {
    setEditingSettings(false);
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 3000);
  };

  const getPlagiarismColor = (score: number) =>
    score >= 75 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";

  const getArticleList = () => {
    if (activeTab === "pending") return pendingArticles;
    if (activeTab === "approved") return approvedArticles;
    if (activeTab === "rejected") return rejectedArticles;
    return [];
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="liquid-glass-card p-8 w-full max-w-sm mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Admin Kirish</h2>
              <button onClick={() => setShowLoginModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Login yoki Email</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm(p => ({ ...p, username: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    placeholder="admin yoki botcher111@gmail.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Parol</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(p => ({ ...p, password: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    placeholder="Parol"
                  />
                </div>
              </div>
              {loginError && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> {loginError}
                </p>
              )}
              <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-colors shadow">
                Kirish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Public page: click logo 5 times */}
      {!isLoggedIn && (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <div className="liquid-glass-card p-12 text-center max-w-md">
            <button
              onClick={handleLogoClick}
              className="cursor-default select-none"
              style={{ WebkitTapHighlightColor: "transparent" }}
              aria-label="hidden admin access"
            >
              <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-amber-500 font-serif block mb-4">
                OpenScience.uz
              </span>
            </button>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Bu sahifa tahririyat hay'ati uchun mo'ljallangan.
            </p>
            {secretClickCount > 0 && secretClickCount < 5 && (
              <div className="mt-4 flex gap-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i < secretClickCount ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Admin Dashboard - only after login */}
      {isLoggedIn && (
        <>
          {/* Admin Header */}
          <div className="bg-slate-900 dark:bg-slate-950 text-white py-4 px-6 sticky top-0 z-40 flex justify-between items-center border-b border-slate-800">
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold font-serif">OpenScience</span>
              <span className="text-xs bg-blue-600 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {role === "admin" ? "Admin" : "Muharrir"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-5 h-5 text-slate-300" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  {pendingArticles.length}
                </span>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 text-slate-300 hover:text-white text-sm transition-colors">
                <LogOut className="w-4 h-4" /> Chiqish
              </button>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => (
                <div key={i} className="liquid-glass-card p-4">
                  <div className={`text-2xl font-bold ${stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' : stat.color === 'green' ? 'text-green-600 dark:text-green-400' : stat.color === 'amber' ? 'text-amber-600 dark:text-amber-400' : 'text-purple-600 dark:text-purple-400'}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">{stat.label}</div>
                  {stat.change && <div className="text-xs text-green-600 dark:text-green-400 mt-1">{stat.change}</div>}
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar */}
              <div className="w-full md:w-56 shrink-0">
                <div className="liquid-glass-card p-3 space-y-1">
                  {[
                    { key: "pending" as Tab, label: "Yangi Kelganlar", icon: <Bell className="w-4 h-4" />, badge: pendingArticles.length },
                    { key: "approved" as Tab, label: "Tasdiqlangan", icon: <CheckCircle className="w-4 h-4" />, badge: null },
                    { key: "rejected" as Tab, label: "Rad etilgan", icon: <XCircle className="w-4 h-4" />, badge: null },
                    { key: "stats" as Tab, label: "Statistika", icon: <BarChart3 className="w-4 h-4" />, badge: null },
                    ...(role === "admin" ? [
                      { key: "settings" as Tab, label: "Sayt Sozlamalari", icon: <Settings className="w-4 h-4" />, badge: null },
                      { key: "contact" as Tab, label: "Aloqa Ma'lumotlari", icon: <Mail className="w-4 h-4" />, badge: null },
                    ] : []),
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg font-medium transition-all text-sm flex items-center justify-between ${activeTab === item.key ? "bg-blue-600 text-white shadow" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                    >
                      <span className="flex items-center gap-2">{item.icon}{item.label}</span>
                      {item.badge != null && item.badge > 0 && (
                        <span className="bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{item.badge}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Panel */}
              <div className="flex-1 space-y-4">
                {/* Articles Tabs */}
                {(activeTab === "pending" || activeTab === "approved" || activeTab === "rejected") && (
                  <>
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {activeTab === "pending" && "Yangi kelgan maqolalar"}
                        {activeTab === "approved" && "Tasdiqlangan maqolalar"}
                        {activeTab === "rejected" && "Rad etilgan maqolalar"}
                      </h2>
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Qidirish..." className="pl-9 pr-4 py-2 text-sm rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      {getArticleList().map((article) => (
                        <div key={article.id} className="liquid-glass-card p-5 flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500 dark:text-slate-400">#{article.id.slice(0, 8)}</span>
                              <span className={`text-xs font-semibold ${activeTab === "pending" ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30" : activeTab === "approved" ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30" : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30"} px-2 py-1 rounded-full`}>
                                {activeTab === "pending" ? "Tekshiruvda" : activeTab === "approved" ? "Tasdiqlangan" : "Rad etilgan"}
                              </span>
                              <span className="text-xs text-blue-600">{article.category}</span>
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white">{article.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Muallif: {article.authors} | Yuborildi: {new Date(article.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="flex flex-col gap-2 shrink-0">
                            <div className="flex items-center gap-2 justify-end">
                              <a href={article.file_url} target="_blank" rel="noreferrer" className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-colors" title="Original faylni o'qish">
                                <Eye className="w-4 h-4" />
                              </a>
                              {activeTab === "pending" && (
                                <>
                                  <button onClick={() => updateArticleStatus(article.id, 'approved')} className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 transition-colors" title="Tasdiqlash">
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => updateArticleStatus(article.id, 'rejected')} className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors" title="Rad etish">
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                            
                            {activeTab === "approved" && (
                              <div className="flex gap-2 mt-2">
                                <a href={`/api/documents?mode=watermark&id=${article.id}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-bold transition-colors">
                                  <ShieldCheck className="w-3.5 h-3.5" /> Tasdiqlangan PDF
                                </a>
                                <a href={`/api/documents?mode=cert1&id=${article.id}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 border border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-amber-700 dark:text-amber-500 rounded-lg text-xs font-bold transition-colors">
                                  <Award className="w-3.5 h-3.5" /> Sertifikat 1
                                </a>
                                <a href={`/api/documents?mode=cert2&id=${article.id}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 border border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-700 dark:text-purple-500 rounded-lg text-xs font-bold transition-colors">
                                  <Download className="w-3.5 h-3.5" /> Sertifikat 2
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Statistics */}
                {activeTab === "stats" && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Statistika va Hisobotlar</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="liquid-glass-card p-6">
                        <h3 className="font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-blue-500" /> Oylik yuklashlar
                        </h3>
                        <div className="space-y-3">
                          {[["Iyun 2026", 42], ["May 2026", 38], ["Aprel 2026", 55], ["Mart 2026", 31]].map(([month, count]) => (
                            <div key={month as string} className="flex items-center gap-3">
                              <span className="text-sm text-slate-500 dark:text-slate-400 w-24 shrink-0">{month}</span>
                              <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(count as number) / 55 * 100}%` }}></div>
                              </div>
                              <span className="text-sm font-bold text-slate-900 dark:text-white w-8 text-right">{count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="liquid-glass-card p-6">
                        <h3 className="font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                          <FileText className="w-5 h-5 text-amber-500" /> Sohalar bo'yicha
                        </h3>
                        <div className="space-y-3">
                          {[["Tibbiyot", 45], ["Pedagogika", 32], ["Iqtisodiyot", 28], ["IT & Texnika", 22], ["Kimyo", 15], ["Boshqa", 5]].map(([cat, pct]) => (
                            <div key={cat as string} className="flex items-center gap-3">
                              <span className="text-sm text-slate-500 dark:text-slate-400 w-24 shrink-0">{cat}</span>
                              <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                              </div>
                              <span className="text-sm font-bold text-slate-900 dark:text-white w-8 text-right">{pct}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Site Settings - admin only */}
                {activeTab === "settings" && role === "admin" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Settings className="w-5 h-5" /> Sayt Sozlamalari
                      </h2>
                      {!editingSettings ? (
                        <button onClick={() => setEditingSettings(true)} className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" /> Tahrirlash
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button onClick={handleSaveSettings} className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <Save className="w-4 h-4" /> Saqlash
                          </button>
                          <button onClick={() => setEditingSettings(false)} className="flex items-center gap-2 text-sm bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <X className="w-4 h-4" /> Bekor
                          </button>
                        </div>
                      )}
                    </div>
                    {savedSettings && (
                      <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-3 text-green-700 dark:text-green-300 text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Sozlamalar muvaffaqiyatli saqlandi!
                      </div>
                    )}
                    <div className="liquid-glass-card p-6 space-y-5">
                      {Object.entries(siteSettings).map(([key, value]) => (
                        <div key={key}>
                          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                            {key === "siteTitle" ? "Sayt nomi" : key === "issn" ? "ISSN" : key === "contactEmail" ? "Elektron pochta" : key === "contactPhone" ? "Telefon" : key === "contactAddress" ? "Manzil" : key === "facebook" ? "Facebook" : key === "instagram" ? "Instagram" : "Telegram"}
                          </label>
                          {editingSettings ? (
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => setSiteSettings(prev => ({ ...prev, [key]: e.target.value }))}
                              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
                            />
                          ) : (
                            <p className="text-slate-800 dark:text-slate-200 text-sm font-medium">{value}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact settings */}
                {activeTab === "contact" && role === "admin" && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Mail className="w-5 h-5" /> Tahririyat A'zolari
                    </h2>
                    <div className="liquid-glass-card p-6">
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                        Tahririyat hay'ati a'zolarini boshqaring. Ma'lumotlarni tahrirlash, qo'shish yoki o'chirish mumkin.
                      </p>
                      <div className="space-y-3">
                        {[
                          { name: "Rishat Anvari", role: "Bosh muharrir", inst: "Toshkent Kimyo Xalqaro Universiteti" },
                          { name: "Qozoqboyeva Dilfuza", role: "Bosh muharrir o'rinbosari", inst: "Andijan State Institute of Foreign Languages" },
                          { name: "Zulunova Iqbolkhon", role: "A'zo", inst: "Andijan State Medical Institute" },
                        ].map((member, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div>
                              <p className="font-semibold text-sm text-slate-900 dark:text-white">{member.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{member.role} — {member.inst}</p>
                            </div>
                            <div className="flex gap-2">
                              <button className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
                        + Yangi a'zo qo'shish
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
