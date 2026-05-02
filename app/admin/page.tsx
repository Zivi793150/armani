"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  location?: string;
  category: string;
  area: string;
  featured?: boolean;
  isFeatured?: boolean;
  createdAt: string;
  price?: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"portfolio" | "catalog">("portfolio");
  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>([]);
  const [catalogItems, setCatalogItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ portfolio: 0, catalog: 0, inquiries: 0 });

  // Загрузка проектов и заявок
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load portfolio
        const portfolioRes = await fetch("/api/portfolio");
        const portfolioData = portfolioRes.ok ? (await portfolioRes.json()).data : [];
        setPortfolioProjects(portfolioData);

        // Load catalog
        const catalogRes = await fetch("/api/catalog");
        const catalogData = catalogRes.ok ? (await catalogRes.json()).data : [];
        setCatalogItems(catalogData);

        // Load inquiries
        const inquiriesRes = await fetch("/api/inquiries");
        const inquiriesData = inquiriesRes.ok ? (await inquiriesRes.json()).data : [];
        const newInquiries = inquiriesData.filter((i: any) => i.status === 'new');
        
        setStats({ 
          portfolio: portfolioData.length,
          catalog: catalogData.length,
          inquiries: newInquiries.length 
        });
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить проект?")) return;
    
    try {
      const endpoint = activeTab === "portfolio" ? `/api/portfolio/${id}` : `/api/catalog/${id}`;
      const response = await fetch(endpoint, { method: "DELETE" });
      if (response.ok) {
        if (activeTab === "portfolio") {
          setPortfolioProjects(prev => prev.filter(p => p._id !== id));
          setStats(prev => ({ ...prev, portfolio: prev.portfolio - 1 }));
        } else {
          setCatalogItems(prev => prev.filter(p => p._id !== id));
          setStats(prev => ({ ...prev, catalog: prev.catalog - 1 }));
        }
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const currentItems = activeTab === "portfolio" ? portfolioProjects : catalogItems;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900">Админ-панель</h1>
              <p className="text-xs text-slate-500">Armani Строительство</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/settings" className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" title="Настройки материалов">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
            <Link href="/" className="text-sm font-bold text-slate-600 hover:text-brand-600 transition-colors">
              ← На сайт
            </Link>
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-bold hover:bg-red-200 transition-colors">
              Выйти
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Проектов в портфолио</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{stats.portfolio}</p>
              </div>
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Проектов в каталоге</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{stats.catalog}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Заявок за месяц</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{stats.inquiries}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`flex-1 px-6 py-4 text-sm font-bold transition-colors ${
                activeTab === "portfolio"
                  ? "bg-brand-50 text-brand-700 border-b-2 border-brand-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Портфолио (готовые проекты)
            </button>
            <button
              onClick={() => setActiveTab("catalog")}
              className={`flex-1 px-6 py-4 text-sm font-bold transition-colors ${
                activeTab === "catalog"
                  ? "bg-brand-50 text-brand-700 border-b-2 border-brand-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Каталог (типовые проекты)
            </button>
          </div>

          <div className="p-6">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Поиск..."
                    className="w-64 pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  />
                  <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-brand-500">
                  <option>Все материалы</option>
                  <option>Газобетон</option>
                  <option>Кирпич</option>
                  <option>Брус</option>
                </select>
              </div>
              <Link
                href={`/admin/${activeTab}/new`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white rounded-xl font-bold text-sm hover:bg-brand-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Добавить {activeTab === "portfolio" ? "проект" : "проект в каталог"}
              </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-slate-500">Название</th>
                    <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-slate-500">Категория</th>
                    <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-slate-500">Площадь</th>
                    <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-slate-500">Статус</th>
                    <th className="text-right py-3 px-4 text-xs font-black uppercase tracking-wider text-slate-500">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">
                        Загрузка...
                      </td>
                    </tr>
                  ) : currentItems.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">
                        Пока нет проектов. Добавьте первый проект.
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((project) => (
                      <tr key={project._id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-200 rounded-lg flex-shrink-0" />
                            <div>
                              <p className="font-bold text-slate-900">{project.title}</p>
                              <p className="text-xs text-slate-500">{project.location || (project.price ? `${project.price.toLocaleString()} ₽` : '')}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex px-2.5 py-1 bg-brand-100 text-brand-700 rounded-lg text-xs font-bold">
                            {project.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm font-medium text-slate-700">{project.area} м²</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                            (project.featured || project.isFeatured) 
                              ? "bg-amber-100 text-amber-700" 
                              : "bg-green-100 text-green-700"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              (project.featured || project.isFeatured) ? "bg-amber-600" : "bg-green-600"
                            }`} />
                            {(project.featured || project.isFeatured) ? "На главной" : "Опубликован"}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/${activeTab}/edit/${project._id}`}
                              className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                              title="Редактировать"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </Link>
                            <button
                              onClick={() => handleDelete(project._id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Удалить"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Empty State (shown when no items) */}
            <div className="hidden text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-slate-900 font-bold mb-1">Нет проектов</p>
              <p className="text-slate-500 text-sm mb-4">Добавьте первый проект, чтобы он отобразился на сайте</p>
              <Link
                href={`/admin/${activeTab}/new`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white rounded-xl font-bold text-sm hover:bg-brand-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Добавить проект
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
