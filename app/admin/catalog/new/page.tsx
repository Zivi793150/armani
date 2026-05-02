"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UploadingFile {
  file: File;
  preview: string;
  uploading: boolean;
  uploaded: boolean;
  path?: string;
}

const STEPS = [
  { id: 1, title: "Основная информация", fields: ["title", "category", "material", "area"] },
  { id: 2, title: "Характеристики", fields: ["floors", "bedrooms", "bathrooms", "price"] },
  { id: 3, title: "Описание и фото", fields: ["description", "images"] },
  { id: 4, title: "Проверка", fields: [] }
];

const CATEGORIES = [
  { id: "house", label: "Коттедж" },
  { id: "dacha", label: "Дачный дом" },
  { id: "banya", label: "Баня" }
];

export default function NewCatalogPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dynamicMaterials, setDynamicMaterials] = useState<{id: string, label: string}[]>([]);
  const [dynamicBuildingTypes, setDynamicBuildingTypes] = useState<{id: string, label: string}[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    material: "",
    area: "",
    floors: "1",
    bedrooms: "1",
    bathrooms: "1",
    price: "",
    oldPrice: "",
    description: "",
    images: [] as string[],
    features: [] as string[],
    isFeatured: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [materialsRes, typesRes] = await Promise.all([
          fetch("/api/categories?type=catalog"),
          fetch("/api/categories?type=building_type")
        ]);

        if (materialsRes.ok) {
          const { data } = await materialsRes.json();
          if (data && data.length > 0) {
            setDynamicMaterials(data.map((c: any) => ({ id: c.slug, label: c.name })));
          }
        }

        if (typesRes.ok) {
          const { data } = await typesRes.json();
          if (data && data.length > 0) {
            const types = data.map((c: any) => ({ id: c.slug, label: c.name }));
            setDynamicBuildingTypes(types);
            if (!formData.category && types.length > 0) {
              setFormData(prev => ({ ...prev, category: types[0].id }));
            }
          }
        }
      } catch (err) {
        console.error("Error loading settings:", err);
      }
    };
    loadSettings();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-zа-я0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Введите название";
      if (!formData.material) newErrors.material = "Выберите материал";
      if (!formData.area) newErrors.area = "Введите площадь";
    }
    if (step === 2) {
      if (!formData.price) newErrors.price = "Введите цену";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1 && !formData.slug) {
        setFormData(prev => ({ ...prev, slug: generateSlug(prev.title) }));
      }
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
          area: Number(formData.area),
          floors: Number(formData.floors),
          bedrooms: Number(formData.bedrooms),
          bathrooms: Number(formData.bathrooms)
        })
      });

      if (response.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || "Ошибка при сохранении");
      }
    } catch (err) {
      console.error("Error saving:", err);
      alert("Ошибка при соединении с сервером");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Container className="max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/admin" className="text-sm font-bold text-slate-500 hover:text-brand-600 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Назад в админку
          </Link>
          <div className="flex gap-2">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`w-8 h-1.5 rounded-full transition-colors ${
                  currentStep >= s.id ? "bg-brand-600" : "bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Новый проект каталога</h1>
            <p className="text-slate-500 mb-10">Шаг {currentStep}: {STEPS[currentStep - 1].title}</p>

            {currentStep === 1 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Название проекта *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Например: Коттедж «Армани-1»"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-500"
                  />
                  {errors.title && <p className="mt-2 text-xs text-red-500 font-bold">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Тип постройки *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {(dynamicBuildingTypes.length > 0 ? dynamicBuildingTypes : CATEGORIES).map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        className={`px-4 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                          formData.category === cat.id
                            ? "border-brand-600 bg-brand-50 text-brand-700"
                            : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    Настроить типы построек можно в{" "}
                    <Link href="/admin/settings" className="text-brand-600 hover:underline">настройках</Link>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-4">Материал *</label>
                  <div className="flex flex-wrap gap-2">
                    {dynamicMaterials.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setFormData({ ...formData, material: m.label })}
                        className={`px-4 py-2 rounded-full text-xs font-bold border-2 transition-all ${
                          formData.material === m.label
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                    <Link href="/admin/settings" className="px-4 py-2 rounded-full text-xs font-bold border-2 border-dashed border-slate-200 text-slate-400 hover:border-brand-300 hover:text-brand-600 transition-all">
                      + Настроить
                    </Link>
                  </div>
                  {errors.material && <p className="mt-2 text-xs text-red-500 font-bold">{errors.material}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Общая площадь (м²) *</label>
                  <input
                    type="number"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="150"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Этажей</label>
                    <input
                      type="number"
                      value={formData.floors}
                      onChange={(e) => setFormData({ ...formData, floors: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Спален</label>
                    <input
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">С/у</label>
                    <input
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Цена (₽) *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="5000000"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-500"
                    />
                    {errors.price && <p className="mt-2 text-xs text-red-500 font-bold">{errors.price}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Старая цена (₽)</label>
                    <input
                      type="number"
                      value={formData.oldPrice}
                      onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                      placeholder="6500000"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-5 h-5 text-brand-600 rounded-lg focus:ring-brand-500"
                  />
                  <label htmlFor="featured" className="text-sm font-bold text-amber-900">
                    Показать на главной странице (спецпредложение)
                  </label>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Описание проекта</label>
                  <textarea
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Расскажите о преимуществах этого проекта..."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-4">Фотографии</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden group">
                        <img src={img} alt="Превью" className="w-full h-full object-cover" />
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    
                    <label className="aspect-video rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-brand-300 hover:bg-brand-50/50 transition-all">
                      <div className={`flex flex-col items-center ${isUploading ? "animate-pulse" : ""}`}>
                        <svg className="w-8 h-8 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-xs font-bold text-slate-400">Добавить фото</span>
                      </div>
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={async (e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length === 0) return;
                          setIsUploading(true);
                          const uploadData = new FormData();
                          files.forEach(f => uploadData.append('files', f));
                          try {
                            const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
                            if (res.ok) {
                              const { data } = await res.json();
                              setFormData(prev => ({ ...prev, images: [...prev.images, ...data] }));
                            }
                          } catch (err) { console.error(err); }
                          finally { setIsUploading(false); }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <h3 className="text-xl font-black text-slate-900 mb-4">{formData.title}</h3>
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <div className="text-slate-500">Тип: <span className="text-slate-900 font-bold">{CATEGORIES.find(c => c.id === formData.category)?.label}</span></div>
                    <div className="text-slate-500">Материал: <span className="text-slate-900 font-bold">{formData.material}</span></div>
                    <div className="text-slate-500">Площадь: <span className="text-slate-900 font-bold">{formData.area} м²</span></div>
                    <div className="text-slate-500">Цена: <span className="text-brand-600 font-black">{Number(formData.price).toLocaleString()} ₽</span></div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm font-bold text-green-800">Проект готов к публикации в каталоге</p>
                </div>
              </div>
            )}

            <div className="mt-12 flex gap-4">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Назад
                </button>
              )}
              {currentStep < STEPS.length ? (
                <button
                  onClick={handleNext}
                  className="flex-[2] py-4 bg-brand-600 text-white rounded-2xl font-bold hover:bg-brand-700 shadow-lg shadow-brand-600/20 transition-all"
                >
                  Продолжить
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-lg transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Сохранение..." : "Опубликовать проект"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Container({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`max-w-7xl mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
}
