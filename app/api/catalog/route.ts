import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Catalog from '@/models/Catalog';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const material = searchParams.get('material');
    const isFeatured = searchParams.get('featured');
    
    const query: any = { isActive: true };
    if (category) query.category = category;
    if (material) query.material = material;
    if (isFeatured === 'true') query.isFeatured = true;
    
    const items = await Catalog.find(query)
      .sort({ createdAt: -1 })
      .select('-__v');
    
    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    console.error('Error fetching catalog:', error);
    return NextResponse.json(
      { success: false, error: 'Не удалось загрузить каталог' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    // Простая валидация
    const requiredFields = ['title', 'slug', 'price', 'area', 'material', 'category'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Отсутствует обязательное поле: ${field}` },
          { status: 400 }
        );
      }
    }
    
    const item = await Catalog.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating catalog item:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Проект с таким slug уже существует' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Не удалось создать проект в каталоге' },
      { status: 500 }
    );
  }
}
