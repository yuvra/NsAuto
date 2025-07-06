import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, mobile, village, landSize, location } = body;

    if (
      typeof name !== 'string' ||
      typeof mobile !== 'string' ||
      typeof village !== 'string'
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ✅ Clean location (set to null if invalid or missing)
    let cleanLocation = null;
    if (
      location &&
      typeof location.lat === 'number' &&
      typeof location.lng === 'number'
    ) {
      cleanLocation = {
        lat: location.lat,
        lng: location.lng,
      };
    }

    const newEntry = {
      name,
      mobile,
      village,
      landSize: landSize || '',
      location: cleanLocation,
      timestamp: new Date().toISOString(),
    };

    const dirPath = path.join(process.cwd(), 'public');
    const filePath = path.join(dirPath, 'registrations.json');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    const existingData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
      : [];

    existingData.push(newEntry);

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: 'Registered successfully' });
  } catch (err) {
    console.error('❌ Failed to save registration:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
