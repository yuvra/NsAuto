import { NextRequest, NextResponse } from 'next/server';
import { db, admin } from '@/app/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, mobile, village, landSize, location } = body;

    if (!name || !mobile || !village) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newEntry = {
      name,
      mobile,
      village,
      landSize: landSize || '',
      location:
        location && typeof location.lat === 'number' && typeof location.lng === 'number'
          ? new admin.firestore.GeoPoint(location.lat, location.lng)
          : null,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('weatherRegistrations').add(newEntry);

    return NextResponse.json({ success: true, message: 'Registered successfully' });
  } catch (err) {
    console.error('❌ Firebase Admin Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
