'use client';

import { useEffect, useState } from 'react';

interface Registration {
  name: string;
  mobile: string;
  village: string;
  landSize?: string;
  location?: {
    lat: number;
    lng: number;
  } | null;
  timestamp: string;
}

export default function ViewRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/registrations.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load registrations');
        return res.json();
      })
      .then((data) => setRegistrations(data))
      .catch((err) => setError(err.message));
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
                  {reg.location ? `${reg.location.lat.toFixed(4)}, ${reg.location.lng.toFixed(4)}` : 'NA'}
                </td>
                <td style={td}>{new Date(reg.timestamp).toLocaleString()}</td>
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
