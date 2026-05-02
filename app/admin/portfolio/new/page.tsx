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

// Простая форма с пошаговым заполнением для не-tech пользователей
const STEPS = [
  { id: 1, title: "Основная информация", fields: ["title", "location", "category", "area"] },
  { id: 2, title: "Описание", fields: ["description"] },
  { id: 3, title: "Фотографии", fields: ["images"] },
  { id: 4, title: "Проверка", fields: [] }
];

const CATEGORIES = [
  { id: "gazobeton", label: "Газобетон" },
  { id: "kirpich", label: "Кирпич" },
  { id: "brus", label: "Брус" },
  { id: "karkas", label: "Каркас" },
  { id: "breveno", label: "Бревно" }
];

export default function NewPortfolioPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dynamicCategories, setDynamicCategories] = useState<{id: string, label: string}[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    category: "",
    area: "",
    description: "",
    images: [] as string[],
    featured: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch("/api/categories?type=portfolio");
        if (response.ok) {
          const { data } = await response.json();
          if (data && data.length > 0) {
            setDynamicCategories(data.map((c: any) => ({ id: c.slug, label: c.name })));
          }
        }
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    loadCategories();
  }, []);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Введите название проекта";
      if (!formData.location.trim()) newErrors.location = "Введите местоположение";
      if (!formData.category) newErrors.category = "Выберите категорию";
      if (!formData.area.trim()) newErrors.area = "Введите площадь";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Генерация slug из названия
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9а-яё\s]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50);
    
    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, slug })
      });
      
      if (response.ok) {
        router.push("/admin");
      } else {
        alert("Ошибка при сохранении. Попробуйте снова.");
      }
    } catch {
      alert("Ошибка при сохранении. Попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="p-2 -ml-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-lg font-black text-slate-900">Новый проект в портфолио</h1>
          </div>
          <div className="text-sm text-slate-500">
            Шаг {currentStep} из {STEPS.length}
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex gap-2">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  step.id <= currentStep ? "bg-brand-600" : "bg-slate-200"
                }`}
              />
            ))}
          </div>
          <p className="mt-3 text-sm font-bold text-slate-900">{STEPS[currentStep - 1].title}</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Название проекта <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Например: Коттедж в КП «Витязь»"
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all ${
                    errors.title ? "border-red-300" : "border-slate-200"
                  }`}
                />
                {errors.title && <p className="mt-1.5 text-xs text-red-600">{errors.title}</p>}
                <p className="mt-1.5 text-xs text-slate-500">Название будет отображаться на сайте</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Местоположение <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Например: Ивановская область, д. Удачная"
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all ${
                    errors.location ? "border-red-300" : "border-slate-200"
                  }`}
                />
                {errors.location && <p className="mt-1.5 text-xs text-red-600">{errors.location}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Категория (материал)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {(dynamicCategories.length > 0 ? dynamicCategories : CATEGORIES).map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.label })}
                        className={`px-4 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                          formData.category === cat.label
                            ? "border-brand-600 bg-brand-50 text-brand-700"
                            : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                  {errors.category && <p className="mt-1 text-xs text-red-500 font-bold">{errors.category}</p>}
                  <p className="mt-2 text-xs text-slate-400">
                    Управлять списком материалов можно в{" "}
                    <Link href="/admin/settings" className="text-brand-600 hover:underline">настройках</Link>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    Площадь <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="350"
                      className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all ${
                        errors.area ? "border-red-300" : "border-slate-200"
                      }`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">м²</span>
                  </div>
                  {errors.area && <p className="mt-1.5 text-xs text-red-600">{errors.area}</p>}
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-amber-800">
                  Обязательные поля помечены звёздочкой. Заполните все поля, чтобы перейти к следующему шагу.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Description */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Описание проекта
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Опишите особенности проекта: планировку, материалы отделки, уникальные решения..."
                  rows={8}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 resize-none"
                />
                <p className="mt-1.5 text-xs text-slate-500">
                  Хорошее описание помогает клиентам лучше понять проект. Рекомендуем 100-300 символов.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 text-brand-600 border-slate-300 rounded focus:ring-brand-500"
                />
                <label htmlFor="featured" className="text-sm font-medium text-slate-700">
                  Показывать на главной странице (рекомендуемые проекты)
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Images */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Upload Button */}
              <div className="text-center">
                <label className="inline-flex items-center gap-2 px-6 py-4 bg-brand-600 text-white rounded-xl font-bold text-sm hover:bg-brand-700 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Добавить фото
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={async (e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length === 0) return;

                      setIsUploading(true);
                      
                      // Create preview objects
                      const newFiles: UploadingFile[] = files.map(file => ({
                        file,
                        preview: URL.createObjectURL(file),
                        uploading: true,
                        uploaded: false
                      }));
                      
                      setUploadingFiles(prev => [...prev, ...newFiles]);

                      // Upload files
                      const formDataUpload = new FormData();
                      files.forEach(file => formDataUpload.append('files', file));

                      try {
                        const response = await fetch('/api/upload', {
                          method: 'POST',
                          body: formDataUpload
                        });

                        if (response.ok) {
                          const { data } = await response.json();
                          setFormData(prev => ({ ...prev, images: [...prev.images, ...data] }));
                          
                          // Mark as uploaded
                          setUploadingFiles(prev => 
                            prev.map((f, i) => 
                              i >= prev.length - files.length 
                                ? { ...f, uploading: false, uploaded: true, path: data[i - (prev.length - files.length)] }
                                : f
                            )
                          );
                        } else {
                          alert('Ошибка при загрузке файлов');
                          setUploadingFiles(prev => prev.filter(f => !newFiles.find(nf => nf.preview === f.preview)));
                        }
                      } catch (err) {
                        console.error('Upload error:', err);
                        alert('Ошибка при загрузке файлов');
                        setUploadingFiles(prev => prev.filter(f => !newFiles.find(nf => nf.preview === f.preview)));
                      } finally {
                        setIsUploading(false);
                      }
                    }}
                  />
                </label>
                <p className="mt-3 text-xs text-slate-400">JPG, PNG, WEBP. Макс. 10 МБ каждая.</p>
              </div>

              {/* Image Preview Grid */}
              {(formData.images.length > 0 || uploadingFiles.length > 0) ? (
                <div className="grid grid-cols-3 gap-4">
                  {/* Completed uploads */}
                  {formData.images.map((img, index) => (
                    <div key={`uploaded-${index}`} className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden group">
                      <img src={img} alt={`Фото ${index + 1}`} className="w-full h-full object-cover" />
                      {index === 0 && (
                        <span className="absolute top-2 left-2 px-2 py-1 bg-brand-600 text-white text-[10px] font-bold uppercase rounded">
                          Обложка
                        </span>
                      )}
                      <button
                        onClick={() => {
                          const newImages = formData.images.filter((_, i) => i !== index);
                          setFormData({ ...formData, images: newImages });
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {/* Uploading previews */}
                  {uploadingFiles.filter(f => f.uploading).map((file, index) => (
                    <div key={`uploading-${index}`} className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden">
                      <img src={file.preview} alt={`Загрузка ${index + 1}`} className="w-full h-full object-cover opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                  <svg className="w-12 h-12 mx-auto text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-slate-500">Нажмите кнопку выше, чтобы добавить фотографии</p>
                </div>
              )}

              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-800">
                  Первая фотография будет использована как главная (обложка) на странице проекта.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-sm text-slate-500">Название</span>
                  <span className="text-sm font-bold text-slate-900">{formData.title || "—"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-sm text-slate-500">Местоположение</span>
                  <span className="text-sm font-bold text-slate-900">{formData.location || "—"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-sm text-slate-500">Категория</span>
                  <span className="text-sm font-bold text-slate-900">
                    {CATEGORIES.find(c => c.id === formData.category)?.label || "—"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-sm text-slate-500">Площадь</span>
                  <span className="text-sm font-bold text-slate-900">{formData.area ? `${formData.area} м²` : "—"}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-slate-500">На главной</span>
                  <span className="text-sm font-bold text-slate-900">{formData.featured ? "Да" : "Нет"}</span>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <p className="text-sm text-green-800">
                  <span className="font-bold">Проверьте данные.</span> После публикации проект сразу появится на сайте.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-colors ${
              currentStep === 1
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            ← Назад
          </button>

          {currentStep < STEPS.length ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-brand-600 text-white rounded-xl font-bold text-sm hover:bg-brand-700 transition-colors"
            >
              Далее →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-xl font-bold text-sm transition-colors ${
                isSubmitting
                  ? "bg-slate-400 text-white cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {isSubmitting ? "Сохранение..." : "✓ Опубликовать проект"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
