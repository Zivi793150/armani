"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface CatalogItem {
  _id: string;
  title: string;
  slug: string;
  price: number;
  oldPrice?: number;
  area: number;
  floors: number;
  bedrooms: number;
  bathrooms: number;
  material: string;
  category: string;
  images: string[];
  features: string[];
}

const CATEGORIES = [
  { id: "all", label: "Все типы" },
  { id: "house", label: "Коттеджи" },
  { id: "dacha", label: "Дачные дома" },
  { id: "banya", label: "Бани" }
];

const AREAS = [
  { id: "all", label: "Любая" },
  { id: "small", label: "До 100 м²" },
  { id: "medium", label: "100-200 м²" },
  { id: "large", label: "Более 200 м²" }
];

export default function CatalogPage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeMaterial, setActiveMaterial] = useState("all");
  const [activeArea, setActiveArea] = useState("all");
  const [dynamicMaterials, setDynamicMaterials] = useState<{id: string, label: string}[]>([]);
  const [dynamicBuildingTypes, setDynamicBuildingTypes] = useState<{id: string, label: string}[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [catalogRes, materialsRes, typesRes] = await Promise.all([
          fetch("/api/catalog"),
          fetch("/api/categories?type=catalog"),
          fetch("/api/categories?type=building_type")
        ]);

        if (catalogRes.ok) {
          const { data } = await catalogRes.json();
          setItems(data);
        }

        if (materialsRes.ok) {
          const { data } = await materialsRes.json();
          if (data && data.length > 0) {
            setDynamicMaterials([
              { id: "all", label: "Все материалы" },
              ...data.map((c: any) => ({ id: c.slug, label: c.name }))
            ]);
          }
        }

        if (typesRes.ok) {
          const { data } = await typesRes.json();
          if (data && data.length > 0) {
            setDynamicBuildingTypes([
              { id: "all", label: "Все типы" },
              ...data.map((c: any) => ({ id: c.slug, label: c.name }))
            ]);
          }
        }
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredItems = items.filter(item => {
    const matchCategory = activeCategory === "all" || item.category === activeCategory;
    const matchMaterial = activeMaterial === "all" || 
      item.material.toLowerCase() === dynamicMaterials.find(m => m.id === activeMaterial)?.label.toLowerCase();
    
    let matchArea = true;
    if (activeArea === "small") matchArea = item.area <= 100;
    else if (activeArea === "medium") matchArea = item.area > 100 && item.area <= 200;
    else if (activeArea === "large") matchArea = item.area > 200;

    return matchCategory && matchMaterial && matchArea;
  });

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      
      <main className="py-12 md:py-20">
        <Container>
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-brand-700">
              Каталог проектов
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Типовые проекты домов
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-500">
              Выбирайте готовое решение для вашего будущего дома. Любой проект можно доработать под ваши нужды.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-72 lg:flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Type Filter */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">Тип постройки</h3>
                  <div className="space-y-1.5">
                    {(dynamicBuildingTypes.length > 0 ? dynamicBuildingTypes : CATEGORIES).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          activeCategory === cat.id
                            ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                            : "text-slate-600 hover:bg-white"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material Filter */}
                {dynamicMaterials.length > 0 && (
                  <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">Материал</h3>
                    <div className="space-y-1.5">
                      {dynamicMaterials.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setActiveMaterial(m.id)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                            activeMaterial === m.id
                              ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                              : "text-slate-600 hover:bg-white"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Area Filter */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">Площадь</h3>
                  <div className="space-y-1.5">
                    {AREAS.map((area) => (
                      <button
                        key={area.id}
                        onClick={() => setActiveArea(area.id)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          activeArea === area.id
                            ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                            : "text-slate-600 hover:bg-white"
                        }`}
                      >
                        {area.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => { setActiveCategory("all"); setActiveMaterial("all"); setActiveArea("all"); }}
                  className="w-full py-3 text-sm font-bold text-slate-400 hover:text-brand-600 transition-colors flex items-center justify-center gap-2"
                >
                  Сбросить всё
                </button>
              </div>
            </aside>

            {/* Catalog Grid */}
            <div className="flex-1">
              <div className="mb-6 text-sm text-slate-500 font-medium">
                {loading ? "Загрузка проектов..." : `Найдено проектов: ${filteredItems.length}`}
              </div>

              {loading ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-slate-100 rounded-[2.5rem] aspect-[4/5] animate-pulse" />
                  ))}
                </div>
              ) : filteredItems.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
                  {filteredItems.map((item) => (
                    <Link href={`/catalog/${item.slug}`} key={item._id} className="group">
                      <Card className="overflow-hidden border-slate-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-[2.5rem] h-full flex flex-col">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={item.images[0] || "/images/placeholder.jpg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-6 left-6 flex flex-col gap-2">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-brand-700 border border-white/50">
                              {item.area} м²
                            </span>
                          </div>
                          {item.oldPrice && (
                            <div className="absolute top-6 right-6">
                              <span className="px-3 py-1 bg-red-500 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                                Акция
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-8 flex flex-col flex-1">
                          <div className="mb-4">
                            <h3 className="text-2xl font-black text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-slate-500 mt-1 font-medium">{item.material}</p>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mb-8 py-4 border-y border-slate-50">
                            <div className="text-center">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Этажей</p>
                              <p className="text-sm font-black text-slate-900">{item.floors}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Спален</p>
                              <p className="text-sm font-black text-slate-900">{item.bedrooms}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">С/у</p>
                              <p className="text-sm font-black text-slate-900">{item.bathrooms}</p>
                            </div>
                          </div>

                          <div className="mt-auto flex items-center justify-between">
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Стоимость от</p>
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-brand-600">{item.price.toLocaleString()} ₽</span>
                                {item.oldPrice && (
                                  <span className="text-sm text-slate-400 line-through font-bold">{item.oldPrice.toLocaleString()} ₽</span>
                                )}
                              </div>
                            </div>
                            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white group-hover:bg-brand-600 transition-colors">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                  <p className="text-slate-500 font-bold">Проектов не найдено</p>
                  <button
                    onClick={() => { setActiveCategory("all"); setActiveMaterial("all"); setActiveArea("all"); }}
                    className="mt-4 text-brand-600 font-bold hover:underline"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
