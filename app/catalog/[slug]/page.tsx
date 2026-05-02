"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/Button";
import { InquiryModal } from "@/components/ui/InquiryModal";

interface CatalogItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  area: number;
  floors: number;
  bedrooms: number;
  bathrooms: number;
  dimensions?: string;
  material: string;
  category: string;
  images: string[];
  features: string[];
}

export default function CatalogItemPage({ params }: { params: { slug: string } }) {
  const [item, setItem] = useState<CatalogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadItem = async () => {
      try {
        // В реальности лучше искать по slug, но для простоты используем API с фильтром
        const response = await fetch(`/api/catalog`);
        if (response.ok) {
          const { data } = await response.json();
          const found = data.find((i: CatalogItem) => i.slug === params.slug);
          setItem(found);
        }
      } catch (err) {
        console.error("Error loading item:", err);
      } finally {
        setLoading(false);
      }
    };
    loadItem();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <main className="py-20">
          <Container>
            <div className="animate-pulse space-y-8">
              <div className="h-10 bg-slate-100 w-1/3 rounded-xl" />
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="aspect-video bg-slate-100 rounded-[2.5rem]" />
                <div className="space-y-4">
                  <div className="h-8 bg-slate-100 w-full rounded-xl" />
                  <div className="h-8 bg-slate-100 w-2/3 rounded-xl" />
                  <div className="h-32 bg-slate-100 w-full rounded-xl" />
                </div>
              </div>
            </div>
          </Container>
        </main>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <main className="py-20 text-center">
          <Container>
            <h1 className="text-3xl font-black mb-4">Проект не найден</h1>
            <Link href="/catalog" className="text-brand-600 font-bold hover:underline">
              Вернуться в каталог
            </Link>
          </Container>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      
      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type="order"
        title={`Заказать проект «${item.title}»`}
      />

      <main className="py-12 md:py-20">
        <Container>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-brand-600 transition-colors">Каталог</Link>
            <span>/</span>
            <span className="text-slate-900">{item.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-2xl shadow-slate-200/50">
                <Image
                  src={item.images[activeImage] || "/images/placeholder.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              {item.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {item.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative aspect-video rounded-2xl overflow-hidden border-2 transition-all ${
                        activeImage === idx ? "border-brand-600 shadow-lg shadow-brand-600/20" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt={`${item.title} - фото ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-700 mb-4">
                  Проект дома
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  {item.title}
                </h1>
                <p className="mt-4 text-lg text-slate-500 font-medium">
                  {item.material} • {item.area} м²
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Площадь</p>
                  <p className="text-lg font-black text-slate-900">{item.area} м²</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Этажей</p>
                  <p className="text-lg font-black text-slate-900">{item.floors}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Спален</p>
                  <p className="text-lg font-black text-slate-900">{item.bedrooms}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">С/у</p>
                  <p className="text-lg font-black text-slate-900">{item.bathrooms}</p>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex flex-wrap items-center justify-between gap-6 p-8 bg-slate-900 rounded-[2.5rem] text-white">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Стоимость строительства от</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-brand-400">{item.price.toLocaleString()} ₽</span>
                    {item.oldPrice && (
                      <span className="text-lg text-slate-500 line-through font-bold">{item.oldPrice.toLocaleString()} ₽</span>
                    )}
                  </div>
                </div>
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  size="lg" 
                  className="bg-brand-600 hover:bg-brand-700 h-16 px-10 text-lg shadow-xl shadow-brand-600/20"
                >
                  Заказать проект
                </Button>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Описание проекта</h3>
                <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {item.description}
                </div>
              </div>

              {/* Features Tags */}
              {item.features && item.features.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Особенности</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature, idx) => (
                      <span key={idx} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
                        {feature}
                      </span>
                    ))}
                  </div>
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
