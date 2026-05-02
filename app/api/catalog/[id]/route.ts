import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Catalog from '@/models/Catalog';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const item = await Catalog.findById(params.id);
    
    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Проект не найден' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: item }, { status: 200 });
  } catch (error) {
    console.error('Error fetching catalog item:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка при получении проекта' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    const item = await Catalog.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Проект не найден' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: item }, { status: 200 });
  } catch (error) {
    console.error('Error updating catalog item:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка при обновлении проекта' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const item = await Catalog.findByIdAndDelete(params.id);
    
    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Проект не найден' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Проект удален' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting catalog item:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка при удалении проекта' },
      { status: 500 }
    );
  }
}
