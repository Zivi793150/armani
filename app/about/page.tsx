import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Card } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      
      <main>
        {/* Hero Section with Parallax-like feel */}
        <section className="relative h-[50vh] min-h-[350px] overflow-hidden bg-slate-900">
          <Image
            src="/images/fb9d283eda4942851374a1e7b8de5102.jpg"
            alt="О компании АрманиСтрой"
            fill
            className="object-cover opacity-50 scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900" />
          <Container className="relative z-10 flex h-full flex-col justify-center text-center text-white">
            <div className="mx-auto max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-brand-400 backdrop-blur-md border border-brand-500/30">
                Основано в 2010 году
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl lg:text-6xl">
                Строим дома <span className="text-brand-500">с душой</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300 md:text-xl">
                Создаем архитектурное наследие и уют для сотен семей в Иваново и Ивановской области
              </p>
            </div>
          </Container>
        </section>

        {/* Philosophy with Image Composition */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
                    Наша история и <br /><span className="text-brand-600 underline decoration-brand-200 decoration-4 underline-offset-4">философия</span>
                  </h2>
                  <div className="space-y-4 text-lg leading-relaxed text-slate-600">
                    <p>
                      Компания "АрманиСтрой" начиналась как семейное дело. За 14 лет мы выросли в экспертное бюро, которое не просто строит коробки, а проектирует образ жизни.
                    </p>
                    <p>
                      Мы специализируемся на капитальном строительстве из камня, кирпича и газобетона. Наш принцип — бескомпромиссное качество материалов и прозрачность каждого этапа.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-8 border-t border-slate-100 pt-8">
                  <div className="group cursor-default">
                    <div className="text-4xl font-black text-brand-600">300+</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">Построенных домов</div>
                  </div>
                  <div className="group cursor-default">
                    <div className="text-4xl font-black text-brand-600">14 лет</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">Безупречного опыта</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="space-y-4">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-xl transition-transform hover:-rotate-1 duration-500">
                      <Image src="/images/0b57294cde4df577613d42aa97244f97.jpg" alt="Проект АрманиСтрой" fill className="object-cover" />
                    </div>
                    <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-xl transition-transform hover:rotate-1 duration-500">
                      <Image src="/images/541ea5b6757f6928e178236027f27eb1.jpg" alt="Интерьер" fill className="object-cover" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-xl transition-transform hover:rotate-1 duration-500">
                      <Image src="/images/d430bdc571149eef0ae53d05aca1e7fc.jpg" alt="Процесс стройки" fill className="object-cover" />
                    </div>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-xl transition-transform hover:-rotate-1 duration-500">
                      <Image src="/images/a3e449675325fae2db3394831c13de0b.JPG" alt="Готовый коттедж" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Technologies Grid with Modern Cards */}
        <section className="bg-slate-900 py-16 md:py-24 overflow-hidden">
          <Container>
            <div className="flex flex-col items-center text-center text-white mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-500 border border-brand-500/20">
                Наши компетенции
              </div>
              <h2 className="mt-6 text-3xl font-black tracking-tight md:text-5xl">
                Технологии <span className="text-brand-500">будущего</span>
              </h2>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { name: "Газобетон", img: "/images/b269db8b38463d7bc824070c858104e0.jpg", desc: "Эффективность" },
                { name: "Керамика", img: "/images/5fdf5172fea73934b264ec995f2077bd.jpg", desc: "Надежность" },
                { name: "Монолит", img: "/images/fb9d283eda4942851374a1e7b8de5102.jpg", desc: "Свобода" },
                { name: "Керамзит", img: "/images/226c019b59835336a26c6c3c147be7d4.JPG", desc: "Баланс" },
                { name: "Кирпич", img: "/images/6bb3f8e0a98ba61ceddcabfa57bac142.jpg", desc: "Классика" }
              ].map((tech) => (
                <div key={tech.name} className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-800">
                  <Image src={tech.img} alt={tech.name} fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-xl font-black text-white">{tech.name}</div>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Visual Blocks Section */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Юридическая чистота",
                  desc: "Каждый проект закреплен официальным договором. Фиксированная смета защищает ваш бюджет.",
                  icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                  color: "bg-blue-50 text-blue-600"
                },
                {
                  title: "Экспертный контроль",
                  desc: "Собственная служба технического надзора проверяет каждый этап: от фундамента до финиша.",
                  icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                  color: "bg-emerald-50 text-emerald-600"
                },
                {
                  title: "Забота о будущем",
                  desc: "Мы даем гарантию 5 лет на все конструктивы. Мы рядом даже после того, как вы отпразднуете новоселье.",
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  color: "bg-orange-50 text-orange-600"
                }
              ].map((val) => (
                <div key={val.title} className="group relative p-8 rounded-[2.5rem] bg-slate-50 border border-transparent transition-all hover:bg-white hover:border-slate-100 hover:shadow-xl">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${val.color} mb-6 transition-transform group-hover:scale-110`}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={val.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{val.title}</h3>
                  <p className="text-base text-slate-500 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Steps with Modern Layout */}
        <section className="bg-slate-50 py-16 md:py-24">
          <Container>
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl text-center">
                Прозрачный путь <br /> к <span className="text-brand-600">вашему дому</span>
              </h2>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
              {[
                { t: "Первая встреча", d: "Бесплатная консультация и выезд инженера на участок." },
                { t: "Точный расчет", d: "Составление детальной сметы с фиксированной стоимостью." },
                { t: "Договор и сроки", d: "Юридическое закрепление обязательств и графика работ." },
                { t: "Снабжение", d: "Прямые поставки от заводов по нашим спецценам." },
                { t: "Строительство", d: "Возведение дома под надзором прораба и технадзора." },
                { t: "Новоселье", d: "Передача ключей, гарантийного сертификата и документации." }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start p-6 rounded-2xl bg-white shadow-sm transition-transform hover:-translate-y-0.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-lg font-black text-white">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 mb-1">{step.t}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Modern CTA */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="relative overflow-hidden rounded-[3rem] bg-brand-600 px-8 py-16 text-center text-white md:py-24">
              <div className="absolute inset-0 z-0">
                <Image src="/images/fb9d283eda4942851374a1e7b8de5102.jpg" alt="Фон" fill className="object-cover opacity-20 mix-blend-overlay" />
              </div>
              <div className="relative z-10 mx-auto max-w-3xl">
                <h2 className="text-4xl font-black md:text-6xl leading-tight">Построим дом, в который <br /> хочется возвращаться</h2>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link href="/#calc" className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-black text-brand-600 shadow-xl transition-transform hover:scale-105 active:scale-95">
                    Рассчитать стоимость
                  </Link>
                  <a href="tel:+79203555522" className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-black text-white backdrop-blur-md transition-all hover:bg-white/20">
                    Обсудить проект
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
