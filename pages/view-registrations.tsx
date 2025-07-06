'use client';

import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from '@/app/lib/firebaseClient'; // assuming this exports firebase.firestore()

interface Registration {
  name: string;
  mobile: string;
  village: string;
  landSize?: string;
  location?: {
    lat: number;
    lng: number;
  } | null;
  timestamp: any; // Firestore Timestamp object
}

export default function ViewRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await db.collection('weatherRegistrations').get();

        const data = snapshot.docs.map((doc) => {
          const d = doc.data();
        
          let formattedTimestamp = '';
          if (d.timestamp && typeof d.timestamp.toDate === 'function') {
            // Firestore Timestamp object
            formattedTimestamp = d.timestamp.toDate().toISOString();
          } else if (typeof d.timestamp === 'string') {
            // already ISO string
            formattedTimestamp = d.timestamp;
          } else {
            formattedTimestamp = '';
          }
        
          return {
            ...d,
            timestamp: formattedTimestamp,
          } as Registration;
        });


        setRegistrations(data);
      } catch (err: any) {
        console.error('Error loading data:', err);
        setError('डेटा लोड करण्यात अडचण आली.');
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>नोंदणीकृत हवामान केंद्र यादी</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {registrations.length === 0 && !error ? (
        <p>नोंदणी आढळली नाही.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={th}>नाव</th>
              <th style={th}>मोबाईल</th>
              <th style={th}>गाव</th>
              <th style={th}>शेती क्षेत्र</th>
              <th style={th}>स्थान</th>
              <th style={th}>नोंदणी वेळ</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, index) => (
              <tr key={index}>
                <td style={td}>{reg.name}</td>
                <td style={td}>{reg.mobile}</td>
                <td style={td}>{reg.village}</td>
                <td style={td}>{reg.landSize || '-'}</td>
                <td style={td}>
                  {reg.location
                    ? `${reg.location.lat}, ${reg.location.lng}`
                    : 'NA'}
                </td>
                <td style={td}>
                  {reg.timestamp
                    ? new Date(reg.timestamp).toLocaleString()
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
  background: '#f2f2f2',
  fontWeight: 'bold',
};

const td: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
};
