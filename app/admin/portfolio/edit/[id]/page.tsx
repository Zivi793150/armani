"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

const CATEGORIES = [
  { id: "gazobeton", label: "Газобетон" },
  { id: "kirpich", label: "Кирпич" },
  { id: "brus", label: "Брус" },
  { id: "karkas", label: "Каркас" },
  { id: "breveno", label: "Бревно" }
];

export default function EditPortfolioPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    category: "",
    area: "",
    description: "",
    featured: false
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Загрузка данных проекта
  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await fetch(`/api/portfolio/${id}`);
        if (response.ok) {
          const { data } = await response.json();
          setFormData({
            title: data.title || "",
            location: data.location || "",
            category: data.category || "",
            area: data.area || "",
            description: data.description || "",
            featured: data.featured || false
          });
        }
      } catch (error) {
        console.error("Error loading project:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProject();
  }, [id]);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert("Ошибка при сохранении");
      }
    } catch {
      alert("Ошибка при сохранении");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE"
      });
      
      if (response.ok) {
        router.push("/admin");
      } else {
        alert("Ошибка при удалении");
      }
    } catch {
      alert("Ошибка при удалении");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Загрузка проекта...</p>
        </div>
      </div>
    );
  }

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
            <h1 className="text-lg font-black text-slate-900">Редактирование проекта</h1>
          </div>
          
          {saveSuccess && (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-bold">
              ✓ Сохранено
            </span>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Название проекта
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Местоположение
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            {/* Category & Area */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Материал
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Площадь
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">м²</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Описание
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 resize-none"
              />
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 text-brand-600 border-slate-300 rounded focus:ring-brand-500"
              />
              <label htmlFor="featured" className="text-sm font-medium text-slate-700">
                Показывать на главной странице
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-6 py-3 bg-red-50 text-red-700 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors"
          >
            Удалить проект
          </button>

          <div className="flex gap-3">
            <Link
              href="/admin"
              className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              Отмена
            </Link>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-8 py-3 rounded-xl font-bold text-sm transition-colors ${
                isSaving
                  ? "bg-slate-400 text-white cursor-not-allowed"
                  : "bg-brand-600 text-white hover:bg-brand-700"
              }`}
            >
              {isSaving ? "Сохранение..." : "Сохранить изменения"}
            </button>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-black text-slate-900 text-center mb-2">Удалить проект?</h3>
            <p className="text-sm text-slate-500 text-center mb-6">
              Это действие нельзя отменить. Проект будет удалён из базы данных.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors"
              >
                Да, удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
