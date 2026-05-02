"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Типы для фильтров
const CATEGORIES = [
  { id: "all", label: "Все проекты" },
  { id: "gazobeton", label: "Газобетон" },
  { id: "kirpich", label: "Кирпич" },
  { id: "brus", label: "Брус" },
  { id: "karkas", label: "Каркас" },
  { id: "breveno", label: "Бревно" }
];

const AREAS = [
  { id: "all", label: "Любая" },
  { id: "small", label: "До 150 м²" },
  { id: "medium", label: "150-250 м²" },
  { id: "large", label: "250-400 м²" },
  { id: "xlarge", label: "Более 400 м²" }
];

// Заглушка для примера
const FALLBACK_ITEM = {
  _id: "1",
  title: "Современный коттедж в КП «Витязь»",
  location: "Ивановская область",
  category: "Газобетон",
  area: "350 м²",
  images: ["/images/0b57294cde4df577613d42aa97244f97.jpg"],
  tags: ["Под ключ", "Панорамное остекление"]
};

interface PortfolioItem {
  _id: string;
  title: string;
  location: string;
  category: string;
  area: string;
  images: string[];
  tags: string[];
  featured?: boolean;
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeArea, setActiveArea] = useState("all");
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dynamicCategories, setDynamicCategories] = useState<{ id: string, label: string }[]>([]);

  // Загрузка проектов и категорий из MongoDB
  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsRes, categoriesRes] = await Promise.all([
          fetch("/api/portfolio"),
          fetch("/api/categories?type=portfolio")
        ]);

        if (projectsRes.ok) {
          const { data } = await projectsRes.json();
          setProjects(data.length > 0 ? data : [FALLBACK_ITEM]);
        } else {
          setProjects([FALLBACK_ITEM]);
        }

        if (categoriesRes.ok) {
          const { data } = await categoriesRes.json();
          if (data && data.length > 0) {
            setDynamicCategories([
              { id: "all", label: "Все проекты" },
              ...data.map((c: any) => ({ id: c.slug, label: c.name }))
            ]);
          }
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setProjects([FALLBACK_ITEM]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Фильтрация проектов
  const filteredItems = projects.filter(item => {
    const categories = dynamicCategories.length > 0 ? dynamicCategories : CATEGORIES;
    const matchCategory = activeCategory === "all" ||
      item.category.toLowerCase().includes(
        categories.find(c => c.id === activeCategory)?.label.toLowerCase() || ""
      );
    
    let matchArea = true;
    if (activeArea === "small") matchArea = parseInt(item.area) <= 150;
    else if (activeArea === "medium") matchArea = parseInt(item.area) > 150 && parseInt(item.area) <= 250;
    else if (activeArea === "large") matchArea = parseInt(item.area) > 250 && parseInt(item.area) <= 400;
    else if (activeArea === "xlarge") matchArea = parseInt(item.area) > 400;
    
    return matchCategory && matchArea;
  });

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      
      <main className="py-12 md:py-20">
        <Container>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-brand-700">
              Наши работы
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Портфолио проектов
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-500">
              Посмотрите на дома, которые мы уже построили. Каждый проект — это результат тесного сотрудничества с заказчиком.
            </p>
          </div>

          {/* Main Layout: Sidebar + Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-72 lg:flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Category Filter */}
                <div className="bg-slate-50 rounded-3xl p-6">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Материал
                  </h3>
                  <div className="space-y-2">
                    {(dynamicCategories.length > 0 ? dynamicCategories : CATEGORIES).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                          activeCategory === cat.id
                            ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                            : "text-slate-600 hover:bg-white hover:shadow-md"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area Filter */}
                <div className="bg-slate-50 rounded-3xl p-6">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    Площадь
                  </h3>
                  <div className="space-y-2">
                    {AREAS.map((area) => (
                      <button
                        key={area.id}
                        onClick={() => setActiveArea(area.id)}
                        className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                          activeArea === area.id
                            ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                            : "text-slate-600 hover:bg-white hover:shadow-md"
                        }`}
                      >
                        {area.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => { setActiveCategory("all"); setActiveArea("all"); }}
                  className="w-full py-3 text-sm font-bold text-slate-500 hover:text-brand-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Сбросить фильтры
                </button>
              </div>
            </aside>

            {/* Projects Grid */}
            <div className="flex-1">
              <div className="mb-4 text-sm text-slate-500 font-medium">
                {loading ? "Загрузка..." : `Найдено проектов: ${filteredItems.length}`}
              </div>

              {/* Loading State */}
              {loading && (
                <div className="grid gap-6 md:grid-cols-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-slate-100 rounded-[2.5rem] h-[400px] animate-pulse" />
                  ))}
                </div>
              )}
              
              {!loading && filteredItems.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 items-stretch">
                  {filteredItems.map((item) => (
              <Link href={`/portfolio/${item._id}`} key={item._id} className="group h-full">
                <Card className="h-full flex flex-col overflow-hidden border-slate-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-[2.5rem]">
                  <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
                    <Image
                      src={item.images?.[0] || "/images/placeholder.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute bottom-6 left-6 flex gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider border border-white/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-sm font-bold text-slate-400">
                        {item.area}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 min-h-[64px]">
                      {item.title}
                    </h3>
                    <div className="mt-auto pt-4 flex items-center gap-2 text-slate-500">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm font-medium">{item.location}</span>
                    </div>
                  </div>
                </Card>
              </Link>
                  ))}
                </div>
              ) : !loading && (
                <div className="text-center py-20 bg-slate-50 rounded-3xl">
                  <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p className="text-slate-500 font-medium">
                    {projects.length === 0 ? "Пока нет проектов в базе данных" : "По выбранным фильтрам проектов не найдено"}
                  </p>
                  {projects.length > 0 && (
                    <button
                      onClick={() => { setActiveCategory("all"); setActiveArea("all"); }}
                      className="mt-4 text-brand-600 font-bold hover:underline"
                    >
                      Сбросить фильтры
                    </button>
                  )}
                </div>
              )}

              <div className="mt-20 rounded-[3rem] bg-slate-900 p-12 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <h2 className="text-3xl font-black md:text-4xl">Хотите такой же дом?</h2>
                  <p className="mt-4 text-slate-400 max-w-xl mx-auto">
                    Мы разработаем индивидуальный проект или адаптируем готовый под ваши пожелания и бюджет.
                  </p>
                  <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Button href="/#calc" className="bg-brand-600 hover:bg-brand-700 h-14 px-10 text-lg">
                      Рассчитать проект
                    </Button>
                    <Button href="/contacts" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-14 px-10 text-lg">
                      Обсудить детали
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
