import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="hidden border-b border-slate-50 bg-slate-50/50 py-2 md:block">
        <Container className="max-w-[95%] flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <svg className="h-3.5 w-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Пн-Вс: 9:00 - 20:00
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-3.5 w-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Иваново, ул. Лежневская, 117
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:info@armanistroi.ru" className="hover:text-brand-600 transition-colors">info@armanistroi.ru</a>
            <div className="h-3 w-px bg-slate-200"></div>
            <div className="flex gap-3">
              <a href="#" className="hover:text-brand-600 transition-colors">WhatsApp</a>
              <a href="#" className="hover:text-brand-600 transition-colors">Telegram</a>
            </div>
          </div>
        </Container>
      </div>
      <Container className="max-w-[95%] flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative h-14 w-48 transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="АРМАНИ СТРОЙ"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>
        
        <nav className="hidden lg:flex lg:items-center lg:gap-8 flex-1 justify-center">
          {[
            { name: "Проекты", href: "#projects" },
            { name: "Калькулятор", href: "#calc" },
            { name: "О компании", href: "#about" },
            { name: "Портфолио", href: "#portfolio" },
            { name: "Отзывы", href: "#reviews" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-bold text-slate-600 transition-colors hover:text-brand-600 whitespace-nowrap"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6 shrink-0">
          <div className="hidden xl:block">
            <div className="text-right">
              <a href="tel:+79203555522" className="text-lg font-black text-slate-900 hover:text-brand-600 transition-colors">
                +7 (920) 355-55-22
              </a>
              <div className="flex items-center justify-end gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                Ждем вашего звонка
              </div>
            </div>
          </div>
          <Button href="#calc" className="hidden sm:flex shadow-xl shadow-brand-600/10">
            Заказать расчет
          </Button>
        </div>
      </Container>
    </header>
  );
}
