import React, { useState, useEffect } from 'react';
import './WeatherRegistrationForm.css';

interface FormData {
  name: string;
  mobile: string;
  village: string;
  landSize: string;
}

interface Location {
  lat: number | null;
  lng: number | null;
}

const WeatherRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    village: '',
    landSize: '',
  });

  const [location, setLocation] = useState<Location>({
    lat: null,
    lng: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [locationFetched, setLocationFetched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setLocationFetched(true);
        },
        (err) => {
          console.warn('Location error:', err.message);
          setLocationFetched(true);
        }
      );
    } else {
      setLocationFetched(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      location: location.lat !== null && location.lng !== null
        ? { lat: location.lat, lng: location.lng }
        : null,
    };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const { error } = await res.json();
        setError(error || 'Something went wrong');
      } else {
        setSubmitted(true);
      }
    } catch (err: any) {
      setError('Failed to submit form.');
      console.error(err);
    }
  };

  return (
    <div className="weather-registration-container">
      <div className="weather-registration-card">
        <h2>हवामान केंद्र नोंदणी फॉर्म</h2>
        {submitted ? (
          <div className="success-message">
            ✅ नोंदणी यशस्वी!{' '}
            {location.lat === null ? (
              <span style={{ color: 'darkorange' }}>
                (स्थान उपलब्ध झाले नाही)
              </span>
            ) : (
              'लोकेशनसह फॉर्म सबमिट झाला आहे.'
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="weather-form">
            <label>
              नाव:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              मोबाईल नंबर:
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                pattern="[0-9]{10}"
                required
              />
            </label>
            <label>
              गाव:
              <input
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              शेती क्षेत्र (गुंठे/एकर):
              <input
                type="text"
                name="landSize"
                value={formData.landSize}
                onChange={handleChange}
              />
            </label>

            {locationFetched ? (
              location.lat && location.lng ? (
                <p>📍 तुमचे स्थान: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
              ) : (
                <p style={{ color: 'red' }}>❗ लोकेशन मिळवता आले नाही.</p>
              )
            ) : (
              <p>📡 लोकेशन शोधत आहोत...</p>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit">नोंदणी करा</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default WeatherRegistrationForm;
