import { Container } from "@/components/layout/Container";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-slate-900 py-32">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-50" 
            style={{ backgroundImage: "url('/images/fb9d283eda4942851374a1e7b8de5102.jpg')" }}
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/60" />
          
          <Container className="relative z-20 text-center text-white">
            <h1 className="mx-auto max-w-5xl text-balance text-5xl font-extrabold tracking-tight md:text-7xl lg:leading-[1.1]">
              Строительство загородных <br className="hidden md:block" /> домов и коттеджей под ключ
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-xl text-slate-100/90 md:text-2xl">
              Профессиональное проектирование и строительство <br className="hidden md:block" /> из любых материалов с гарантией качества
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <Button href="#calc" size="lg" className="bg-brand-600 px-10 text-lg hover:bg-brand-700 shadow-xl shadow-brand-600/20">
                Рассчитать стоимость
              </Button>
              <Button href="#projects" variant="outline" size="lg" className="border-white px-10 text-lg text-white hover:bg-white/10 backdrop-blur-sm">
                Смотреть проекты
              </Button>
            </div>
          </Container>
        </section>

        <section className="bg-white py-16">
          <Container>
            <Card className="p-8 shadow-2xl shadow-slate-200/50 md:p-10 border-slate-100">
              <div className="grid gap-8 md:grid-cols-12 md:items-end">
                <div className="md:col-span-12">
                  <h2 className="text-2xl font-bold text-slate-900">Подобрать проект дома</h2>
                </div>
                <div className="grid gap-6 md:col-span-10 md:grid-cols-3">
                  <div className="grid gap-3">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Цена дома</div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        className="h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 bg-slate-50 transition-all"
                        placeholder="от, ₽"
                      />
                      <input
                        className="h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 bg-slate-50 transition-all"
                        placeholder="до, ₽"
                      />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Общая площадь</div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        className="h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 bg-slate-50 transition-all"
                        placeholder="от, м²"
                      />
                      <input
                        className="h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 bg-slate-50 transition-all"
                        placeholder="до, м²"
                      />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Тип дома</div>
                    <select className="h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 bg-slate-50 transition-all appearance-none cursor-pointer">
                      <option>Все типы</option>
                      <option>Газобетон</option>
                      <option>Кирпич</option>
                      <option>Брус</option>
                      <option>Каркас</option>
                    </select>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Button className="w-full h-12 justify-center bg-brand-600 text-base hover:bg-brand-700 shadow-lg shadow-brand-600/20">
                    Найти
                  </Button>
                </div>
              </div>
            </Card>
          </Container>
        </section>

        <section id="projects" className="py-12 md:py-16">
          <Container>
            <div className="grid gap-4 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <div className="text-sm font-semibold text-brand-700">Разделы проектов</div>
                <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                  Категории проектов
                </div>
              </div>
              <div className="md:col-span-4 md:text-right">
                <Button href="#popular" variant="secondary">
                  Популярные проекты
                </Button>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-12">
              {[
                {
                  title: "Дома из газобетона",
                  image: "/images/b269db8b38463d7bc824070c858104e0.jpg"
                },
                {
                  title: "Дома из кирпича",
                  image: "/images/5fdf5172fea73934b264ec995f2077bd.jpg"
                },
                {
                  title: "Дома из бруса",
                  image: "/images/714a1c04d04878216281fd77e4c7c10d.jpg"
                },
                {
                  title: "Каркасные дома",
                  image: "/images/a10bba90ca0bb850b8e8adfc211edc9a.jpg"
                },
                {
                  title: "Дома из бревна",
                  image: "/images/6fb4d901e81a3ec00b686570ea6f530a.jpg"
                }
              ].map((c, idx) => (
                <a
                  key={c.title}
                  href="#"
                  className={[
                    "group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl",
                    idx < 2 ? "md:col-span-6" : "md:col-span-4"
                  ].join(" ")}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${c.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="relative flex min-h-[300px] items-end p-8">
                    <div>
                      <div className="text-2xl font-bold text-white md:text-3xl">
                        {c.title}
                      </div>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-brand-600/20">
                        Смотреть проекты
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </Container>
        </section>

        <section id="popular" className="border-y border-slate-200 bg-slate-50 py-12 md:py-16">
          <Container>
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-sm font-semibold text-brand-700">Проекты</div>
                <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                  Популярные проекты
                </div>
              </div>
              <Button href="#calc" variant="secondary">
                Рассчитать стоимость
              </Button>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Проект Кама",
                  area: "250м²",
                  price: "3 200 000",
                  image: "/images/fb9d283eda4942851374a1e7b8de5102.jpg",
                  badge: "Хит продаж"
                },
                {
                  title: "Проект Днепр",
                  area: "90м²",
                  price: "1 890 000",
                  image: "/images/226c019b59835336a26c6c3c147be7d4.JPG"
                },
                {
                  title: "Проект Вычегда",
                  area: "240м²",
                  price: "3 360 000",
                  image: "/images/6bb3f8e0a98ba61ceddcabfa57bac142.jpg"
                }
              ].map((p) => (
                <a
                  key={p.title}
                  href="#"
                  className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${p.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4">
                      {p.badge ? (
                        <div className="rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                          {p.badge}
                        </div>
                      ) : null}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-lg font-bold text-white">{p.title}</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-3 border-b border-slate-50 pb-4">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Площадь</div>
                        <div className="mt-0.5 text-base font-bold text-slate-900">{p.area}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Цена</div>
                        <div className="mt-0.5 text-base font-bold text-brand-600">{p.price} ₽</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-600">
                        Подробнее
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </Container>
        </section>

        <section id="calc" className="py-12 md:py-16">
          <Container>
            <div className="text-center">
              <div className="text-sm font-semibold text-brand-700">Калькулятор</div>
              <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                Расчет стоимости строительства частного дома
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-12">
              <Card className="lg:col-span-7">
                <div className="grid gap-5">
                  <div>
                    <div className="text-sm font-semibold">Материал стен дома</div>
                    <select className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20">
                      <option>Выбирите материал стен</option>
                      <option>Каркасный дом</option>
                      <option>Дом из газобетона</option>
                      <option>Кирпичный дом</option>
                      <option>Дом из бруса</option>
                      <option>Дом из бревна</option>
                    </select>
                  </div>

                  <div>
                    <div className="text-sm font-semibold">Общая площадь дома</div>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                        placeholder="0"
                      />
                      <div className="text-sm text-slate-600">кв.м</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold">Вариант исполнения</div>
                    <div className="mt-3 grid gap-2 text-sm text-slate-700">
                      {[
                        "Коробка дома (фундамент, стены, крыша)",
                        "Дом под отделку (инженерные системы + черновая отделка)",
                        "Дом под ключ (с чистовой отделкой)"
                      ].map((v, i) => (
                        <label
                          key={v}
                          className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 hover:border-brand-300"
                        >
                          <input
                            type="radio"
                            name="variant"
                            defaultChecked={i === 0}
                            className="mt-1 h-4 w-4 accent-blue-600"
                          />
                          <span>{v}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="lg:col-span-5">
                <div className="grid gap-4">
                  <div className="rounded-2xl bg-slate-900 p-8 text-white shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-brand-600 flex items-center justify-center">
                        <span className="text-2xl font-bold">₽</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ориентировочная стоимость</div>
                        <div className="mt-1 text-3xl font-bold text-brand-500">—</div>
                      </div>
                    </div>
                    <div className="mt-6 text-sm text-slate-400 leading-relaxed border-t border-slate-800 pt-6">
                      *Данный расчет является ориентировачным. Оставьте заявку — сделаем
                      бесплатный расчет сметы.
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <input
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                      placeholder="Ваше имя"
                    />
                    <input
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                      placeholder="Ваш номер телефона*"
                    />
                    <label className="flex cursor-pointer items-start gap-3 text-xs text-slate-600">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-0.5 h-4 w-4 accent-blue-600"
                      />
                      <span>
                        Согласие с политикой конфиденциальности
                      </span>
                    </label>
                    <Button href="#" className="w-full justify-center">
                      Заказать расчет
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </Container>
        </section>

        <section className="bg-slate-50 py-16 overflow-hidden">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: "url('/images/4d8a19f2c72e1264a65dfcae1b67f89a.jpg')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                  </span>
                  О компании
                </div>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:leading-tight">
                  АрманиCтрой — строим <br /> дома с душой с 2014 года
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
                  <p>
                    Мы занимаемся возведением объектов частного индивидуального
                    домостроения более 10 лет и предоставляем гарантию на все выполненные
                    работы.
                  </p>
                  <p>
                    Компания строит каменные и деревянные дома малой этажности: от уютных каркасных дач до статусных коттеджей из кирпича и газобетона.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { n: "147+", t: "Построенных домов" },
                    { n: "35", t: "Разработанных проектов" },
                    { n: "10", t: "Лет на рынке" },
                    { n: "60", t: "Профессиональных бригад" }
                  ].map((m) => (
                    <div key={m.t} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-hover hover:border-brand-200 hover:shadow-md">
                      <div className="text-2xl font-black text-brand-600">{m.n}</div>
                      <div className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{m.t}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button href="#" className="bg-slate-900 hover:bg-brand-600 shadow-lg shadow-slate-900/10">
                    Узнать больше о нас
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="portfolio" className="py-24 bg-white">
          <Container>
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-bold text-brand-700 uppercase tracking-widest">
                Портфолио
              </div>
              <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Наши выполненные работы
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-slate-500">
                Построенные нами дома — лучшее подтверждение нашего профессионализма и внимания к деталям
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {[
                {
                  title: "Строительство дома из газобетона",
                  image: "/images/0b57294cde4df577613d42aa97244f97.jpg",
                  tag: "Газобетон"
                },
                {
                  title: "Строительство каркасного дома в КП Витязь",
                  image: "/images/d430bdc571149eef0ae53d05aca1e7fc.jpg",
                  tag: "Каркас"
                },
                {
                  title: "Строительство кирпичного дома в д. Удачная",
                  image: "/images/541ea5b6757f6928e178236027f27eb1.jpg",
                  tag: "Кирпич"
                },
                {
                  title: "Строительство кирпичного дома в КП Воевода",
                  image: "/images/a3e449675325fae2db3394831c13de0b.JPG",
                  tag: "Кирпич"
                }
              ].map((i) => (
                <a
                  key={i.title}
                  href="#"
                  className="group relative block overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-lg transition-all hover:shadow-2xl"
                >
                  <div className="relative aspect-[16/10]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${i.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                    
                    <div className="absolute top-6 left-6">
                      <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md uppercase tracking-widest border border-white/30">
                        {i.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-8 left-8 right-8">
                      <h3 className="text-2xl font-bold text-white group-hover:text-brand-400 transition-colors">
                        {i.title}
                      </h3>
                      <div className="mt-4 flex items-center gap-2 text-sm font-bold text-white/80 transition-all group-hover:translate-x-2">
                        Смотреть подробнее
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button href="#" size="lg" variant="outline" className="px-12 border-slate-200 text-slate-900 hover:bg-slate-50">
                Смотреть все работы
              </Button>
            </div>
          </Container>
        </section>

        <section className="bg-slate-900 py-24 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px]" />
          
          <Container className="relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-sm font-bold text-brand-400 uppercase tracking-widest border border-brand-500/20">
                Почему мы?
              </div>
              <h2 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
                9 причин доверить нам строительство
              </h2>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  t: "Заканчиваем строительство в срок",
                  d: "Заканчиваем строительство точно в срок, указанный в договоре",
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                },
                {
                  t: "Профессиональные бригады",
                  d: "В нашей команде работают мастера с опытом от 7 лет и более",
                  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                },
                {
                  t: "Работаем строго по договору",
                  d: "Все наши обязательства прописаны в договоре. Фиксированная смета",
                  icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                },
                {
                  t: "Качественные материалы",
                  d: "Используем только сертифицированные материалы от проверенных поставщиков",
                  icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                },
                {
                  t: "Гарантия на работы",
                  d: "Предоставляем полную гарантию на построенный дом сроком от 5 лет",
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                },
                {
                  t: "Собственное проектное бюро",
                  d: "Разработаем индивидуальный проект любой сложности под ваши задачи",
                  icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                },
                { 
                  t: "Бесплатный тур по объекту", 
                  d: "Проведем подробный тур по строящемуся или готовому объекту",
                  icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                },
                {
                  t: "Честный бюджет",
                  d: "Поэтапная оплата. Точный расчет без скрытых платежей и доплат",
                  icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                },
                {
                  t: "Технический надзор",
                  d: "Осуществляем жесткий контроль качества на каждом этапе строительства",
                  icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                }
              ].map((a) => (
                <div key={a.t} className="group p-8 rounded-[2rem] bg-slate-800/50 border border-slate-700 transition-all hover:bg-slate-800 hover:border-brand-500/50 hover:-translate-y-1 shadow-lg">
                  <div className="h-14 w-14 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={a.icon} />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white group-hover:text-brand-400 transition-colors">
                    {a.t}
                  </h3>
                  <p className="mt-4 text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {a.d}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button href="#calc" size="lg" className="bg-brand-600 hover:bg-brand-700 px-12 text-lg shadow-xl shadow-brand-600/20">
                Рассчитать стоимость дома
              </Button>
            </div>
          </Container>
        </section>

        <section className="py-12 md:py-16">
          <Container>
            <div className="text-center">
              <div className="text-sm font-semibold text-brand-700">Партнёры</div>
              <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                Наши партнеры
              </div>
              <div className="mx-auto mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
                За годы работы мы наладили партнерские отношения с ведущими производителями
                строительных и отделочных материалов.
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {[
                { alt: "Isover", src: "/images/d1789ee00641ec48813b129a39019e66.jpg" },
                { alt: "Технониколь", src: "/images/b9d067309e80fa0fefe4a227afb81642.jpg" },
                { alt: "Кнауф", src: "/images/97b925f9079aefa3a23486d133238082.png" },
                { alt: "Dulux", src: "/images/653c218022f8c6ab2d556a44c0e0b976.jpg" },
                { alt: "Tikkurila", src: "/images/b85f6f18ea7852182f9a02b3d21883e8.jpg" },
                { alt: "Dufa", src: "/images/9844b453655b3e8cf820d215e66c9fc6.jpg" }
              ].map((p) => (
                <div
                  key={p.alt}
                  className="flex h-16 w-40 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <div
                    className="h-full w-full bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${p.src}')` }}
                    aria-label={p.alt}
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-12 md:py-16">
          <Container>
            <div className="text-center">
              <div className="text-sm font-semibold text-brand-700">Отзывы</div>
              <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                Отзывы наших клиентов
              </div>
              <div className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
                Благодарные отзывы наших клиентов - лучшее подтверждение высокого качества
                построенных нами домов
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Петр Александрович, дом по проекту Вычегда",
                  image: "/images/93bb74427a90e59515ca11ebd7fda866.jpg",
                  href: "https://youtu.be/sQNVTEOBqGs"
                },
                {
                  title: "Семья Ворониных, дом по проекту Елена",
                  image: "/images/c42ff4d1ed7ca0e9d90b7258f1141597.jpg",
                  href: "https://youtu.be/ahETZyyERNM"
                }
              ].map((r) => (
                <a
                  key={r.title}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${r.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  <div className="relative flex min-h-56 items-end p-6">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                        Смотреть видео
                      </div>
                      <div className="mt-3 text-sm font-semibold text-white">{r.title}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button href="#" variant="secondary">
                Все отзывы
              </Button>
            </div>
          </Container>
        </section>

        <section id="reviews" className="bg-slate-50 py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: "url('/images/6fb4d901e81a3ec00b686570ea6f530a.jpg')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 rounded-3xl bg-white/10 p-6 backdrop-blur-xl border border-white/20">
                    <div className="text-sm font-black uppercase tracking-widest text-brand-400">На связи</div>
                    <div className="mt-2 text-2xl font-black text-white">Арман Мкртчян</div>
                    <div className="text-sm font-bold text-white/70">Основатель компании</div>
                    <div className="mt-6 flex gap-3">
                      <a href="tel:+79203555522" className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition-transform hover:scale-110">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </a>
                      <a href="https://wa.me/79203555522" className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-lg shadow-green-500/30 transition-transform hover:scale-110">
                        <span className="font-bold">WA</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Card className="overflow-hidden border-none p-10 shadow-2xl shadow-slate-200/50 md:p-16">
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-brand-600">
                      Консультация
                    </div>
                    <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:leading-tight">
                      Есть вопросы по <br /> строительству?
                    </h2>
                    <p className="mt-4 text-lg text-slate-500">
                      Оставьте заявку, и я лично проконсультирую вас по всем этапам: от выбора проекта до финальной отделки.
                    </p>

                    <form className="mt-10 grid gap-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="relative">
                          <input
                            className="peer h-14 w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 text-sm font-bold outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                            placeholder="Как вас зовут?"
                          />
                        </div>
                        <div className="relative">
                          <input
                            className="peer h-14 w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 text-sm font-bold outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                            placeholder="+7 (___) ___-__-__"
                          />
                        </div>
                      </div>
                      <textarea
                        className="peer min-h-[120px] w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                        placeholder="Ваш вопрос или комментарий"
                      />
                      <div className="mt-2 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <label className="flex cursor-pointer items-start gap-3 text-[11px] font-bold leading-tight text-slate-400">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="mt-0.5 h-4 w-4 rounded-md border-slate-200 text-brand-600 focus:ring-brand-500"
                          />
                          <span>Я согласен с политикой <br /> конфиденциальности</span>
                        </label>
                        <Button className="h-14 px-10 text-base shadow-xl shadow-brand-600/20">
                          Получить консультацию
                        </Button>
                      </div>
                    </form>
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
