import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold">АРМАНИ СТРОЙ</div>
            <div className="mt-2 text-sm text-slate-600">
              Строительство домов и ремонт под ключ в Иваново и области.
            </div>
          </div>

          <div className="text-sm text-slate-600">
            <div className="font-semibold text-slate-900">Контакты</div>
            <div className="mt-2 text-slate-600 leading-relaxed">
              г. Иваново, ул. Лежневская, 117<br />
              +7 (920) 355-55-22<br />
              info@armanistroi.ru
            </div>
          </div>

          <div className="text-sm text-slate-600">
            <div className="font-semibold text-slate-900">Быстрые ссылки</div>
            <div className="mt-2 grid gap-2">
              <Link className="hover:text-brand-600 transition-colors font-bold" href="/#projects">
                Проекты
              </Link>
              <Link className="hover:text-brand-600 transition-colors font-bold" href="/about">
                О компании
              </Link>
              <Link className="hover:text-brand-600 transition-colors font-bold" href="/portfolio">
                Портфолио
              </Link>
              <Link className="hover:text-brand-600 transition-colors font-bold" href="/contacts">
                Контакты
              </Link>
              <Link className="hover:text-brand-600 transition-colors font-bold" href="/#reviews">
                Отзывы
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Armanistroi. Все права защищены.</div>
          <div>Информация на сайте не является публичной офертой.</div>
        </div>
      </Container>
    </footer>
  );
}
