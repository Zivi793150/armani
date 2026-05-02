"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  active: boolean;
  type: 'portfolio' | 'catalog' | 'building_type';
}

export default function SettingsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    type: "portfolio" as 'portfolio' | 'catalog' | 'building_type',
    order: 0,
    active: true
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const { data } = await response.json();
        setCategories(data);
      }
    } catch (err) {
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingCategory 
        ? `/api/categories/${editingCategory._id}` 
        : "/api/categories";
      const method = editingCategory ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsModalOpen(false);
        setEditingCategory(null);
        setFormData({ name: "", slug: "", description: "", type: "portfolio", order: 0, active: true });
        loadCategories();
      } else {
        const error = await response.json();
        alert(error.error || "Ошибка при сохранении");
      }
    } catch (err) {
      console.error("Error saving category:", err);
      alert("Ошибка при сохранении");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить категорию?")) return;
    
    try {
      const response = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (response.ok) {
        loadCategories();
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      type: category.type,
      order: category.order,
      active: category.active
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", slug: "", description: "", type: "portfolio", order: 0, active: true });
    setIsModalOpen(true);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-zа-я0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900">Настройки</h1>
              <p className="text-xs text-slate-500">Материалы для фильтров</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm font-bold text-slate-600 hover:text-brand-600 transition-colors">
              ← Назад в админку
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Description */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-8">
          <p className="text-slate-600">
            Управляйте материалами для фильтров в портфолио и каталоге. 
            Добавляйте новые категории (газобетон, кирпич, брус и др.) 
            для удобной навигации по проектам.
          </p>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900">Категории материалов</h2>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white rounded-xl font-bold text-sm hover:bg-brand-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Добавить категорию
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-slate-500">Название</th>
                  <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-slate-500">Slug</th>
                  <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-slate-500">Тип</th>
                  <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-slate-500">Порядок</th>
                  <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-slate-500">Статус</th>
                  <th className="text-right py-3 px-4 text-xs font-black uppercase tracking-wider text-slate-500">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">Загрузка...</td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      Пока нет категорий. Добавьте первую.
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category._id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-bold text-slate-900">{category.name}</p>
                        <p className="text-xs text-slate-500">{category.description}</p>
                      </td>
                      <td className="py-4 px-4">
                        <code className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600">{category.slug}</code>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold ${
                          category.type === 'portfolio' 
                            ? 'bg-brand-100 text-brand-700' 
                            : category.type === 'catalog'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {category.type === 'portfolio' ? 'Портфолио' : category.type === 'catalog' ? 'Каталог' : 'Тип постройки'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-700">{category.order}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                          category.active 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${category.active ? 'bg-green-600' : 'bg-slate-400'}`} />
                          {category.active ? 'Активна' : 'Скрыта'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(category)}
                            className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                            title="Редактировать"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(category._id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Удалить"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Default Categories Info */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-sm font-bold text-blue-900 mb-2">Рекомендуемые категории</h3>
          <p className="text-sm text-blue-700 mb-3">
            Для удобства работы с фильтрами рекомендуем добавить следующие категории:
          </p>
          <div className="flex flex-wrap gap-2">
            {['Газобетон', 'Кирпич', 'Брус', 'Бревно', 'Керамический блок', 'СИП-панели', 'Пеноблок', 'Монолит'].map(cat => (
              <span key={cat} className="px-3 py-1 bg-white rounded-lg text-sm text-blue-700 border border-blue-200">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">
              {editingCategory ? 'Редактировать категорию' : 'Добавить категорию'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Название *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData({ 
                      ...formData, 
                      name,
                      slug: editingCategory ? formData.slug : generateSlug(name)
                    });
                  }}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                  placeholder="Например: Газобетон"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                  placeholder="gazobeton"
                />
                <p className="mt-1 text-xs text-slate-500">Используется в URL и API</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 resize-none"
                  rows={2}
                  placeholder="Краткое описание категории"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Тип *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'portfolio' | 'catalog' | 'building_type' })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                  >
                    <option value="portfolio">Портфолио (Материал)</option>
                    <option value="catalog">Каталог (Материал)</option>
                    <option value="building_type">Тип постройки (Каталог)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Порядок</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                />
                <label htmlFor="active" className="text-sm font-medium text-slate-700">Активна (показывать в фильтрах)</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-brand-600 text-white rounded-xl font-bold text-sm hover:bg-brand-700 transition-colors"
                >
                  {editingCategory ? 'Сохранить' : 'Добавить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
