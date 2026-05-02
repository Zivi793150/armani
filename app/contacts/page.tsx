import { Container } from "@/components/layout/Container";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      
      <main className="py-16 md:py-24">
        <Container>
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-brand-700">
              Контакты
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              Свяжитесь с нами
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-500">
              Мы всегда на связи и готовы ответить на любые вопросы о строительстве вашего будущего дома
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Contact Info Cards */}
            <div className="lg:col-span-4 space-y-4">
              <Card className="p-8 border-slate-100 bg-slate-50/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/20 mb-6">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Наш офис</h3>
                <p className="text-xl font-bold text-slate-900 leading-tight">
                  г. Иваново, <br />ул. Лежневская, 117
                </p>
              </Card>

              <Card className="p-8 border-slate-100 bg-slate-50/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/20 mb-6">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Телефоны</h3>
                <div className="space-y-1">
                  <a href="tel:+79203555522" className="block text-xl font-bold text-slate-900 hover:text-brand-600 transition-colors">+7 (920) 355-55-22</a>
                  <a href="tel:+79051073585" className="block text-xl font-bold text-slate-900 hover:text-brand-600 transition-colors">+7 (905) 107-35-85</a>
                </div>
              </Card>

              <Card className="p-8 border-slate-100 bg-slate-50/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/20 mb-6">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Режим работы</h3>
                <p className="text-xl font-bold text-slate-900">
                  Пн-Вс: с 09:00 до 20:00
                </p>
                <div className="mt-4 flex gap-3">
                  <a href="https://wa.me/79203555522" className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:underline">
                    Написать в WhatsApp
                  </a>
                </div>
              </Card>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-8">
              <Card className="p-8 md:p-12 border-none bg-slate-900 text-white shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <h2 className="text-3xl font-black mb-8 text-black">Напишите нам</h2>
                  <form className="grid gap-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ваше имя</label>
                        <input
                          className="h-14 w-full rounded-2xl bg-white/5 border border-white/20 px-5 text-sm font-bold text-white outline-none transition-all focus:border-brand-500 focus:bg-white/10"
                          placeholder="Как к вам обращаться?"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ваш телефон</label>
                        <input
                          className="h-14 w-full rounded-2xl bg-white/5 border border-white/20 px-5 text-sm font-bold text-white outline-none transition-all focus:border-brand-500 focus:bg-white/10"
                          placeholder="+7 (___) ___-__-__"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Сообщение</label>
                      <textarea
                        className="min-h-[120px] w-full rounded-2xl bg-white/5 border border-white/20 px-5 py-4 text-sm font-bold text-white outline-none transition-all focus:border-brand-500 focus:bg-white/10"
                        placeholder="Опишите вашу задачу или задайте вопрос"
                      />
                    </div>
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between pt-4">
                      <label className="flex cursor-pointer items-start gap-3 text-[10px] font-bold text-slate-500">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mt-0.5 h-4 w-4 rounded-md border-white/10 bg-white/5 text-brand-600 focus:ring-brand-500"
                        />
                        <span>Я согласен с политикой <br /> конфиденциальности</span>
                      </label>
                      <Button className="h-14 px-12 text-base shadow-xl shadow-brand-600/20 bg-brand-600 hover:bg-brand-700">
                        Отправить сообщение
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>

              {/* Map */}
              <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-slate-100 shadow-xl aspect-video relative group">
                <div className="absolute inset-0 bg-slate-200 animate-pulse group-hover:hidden" />
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa67edc6440509990492f4b916ad6ad51fa0e7c257b6859f44782ae4fc2fda100&amp;source=constructor"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="relative z-10"
                />
              </div>
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
