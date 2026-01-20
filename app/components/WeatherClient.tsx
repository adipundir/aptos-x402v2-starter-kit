'use client';

import { useState } from 'react';
import { x402axios } from 'aptos-x402';

interface WeatherData {
  location: string;
  temperature: number;
  unit: string;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
  }>;
  lastUpdated: string;
}

interface ApiResponse {
  success: boolean;
  data: WeatherData;
  message: string;
}

export default function WeatherClient() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<{ transactionHash?: string } | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    setPaymentInfo(null);

    try {
      const response = await x402axios.get<ApiResponse>(
        `${window.location.origin}/api/protected/weather`,
        {
          privateKey: process.env.NEXT_PUBLIC_SENDER_PRIVATE_KEY!,
        }
      );

      setWeather(response.data.data);
      if (response.paymentInfo) {
        setPaymentInfo(response.paymentInfo);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-client">
      <div className="header-box">
        <h2>WEATHER SERVICE</h2>
        <span className="badge">SECURED BY X402</span>
      </div>

      <div className="price-info">
        <span className="label">FEE:</span>
        <strong>0.001 USDC</strong>
      </div>

      <button
        onClick={fetchWeather}
        disabled={loading}
        className="fetch-button"
      >
        {loading ? 'PROCESSING...' : 'FETCH DATA'}
      </button>

      {error && (
        <div className="error-box">
          <strong>ERROR:</strong> {error}
        </div>
      )}

      {paymentInfo?.transactionHash && (
        <div className="success-box">
          <strong>PAYMENT SUCCESSFUL</strong>
          <a
            href={`https://explorer.aptoslabs.com/txn/${paymentInfo.transactionHash}?network=testnet`}
            target="_blank"
            rel="noopener noreferrer"
          >
            VIEW TRANSACTION
          </a>
        </div>
      )}

      {weather && (
        <div className="weather-data-container">
          <div className="location-bar">
            <h3>{weather.location.toUpperCase()}</h3>
          </div>

          <div className="current-stats">
            <div className="main-temp">
              <span className="temp-value">{weather.temperature}°{weather.unit}</span>
              <span className="condition-text">{weather.condition.toUpperCase()}</span>
            </div>

            <div className="sub-stats">
              <div className="stat-line">
                <span>HUMIDITY:</span>
                <span>{weather.humidity}%</span>
              </div>
              <div className="stat-line">
                <span>WIND:</span>
                <span>{weather.windSpeed} MPH {weather.windDirection}</span>
              </div>
            </div>
          </div>

          <div className="forecast-section">
            <h4>EXTENDED FORECAST</h4>
            <div className="forecast-grid">
              {weather.forecast.map((day) => (
                <div key={day.day} className="forecast-item">
                  <span className="day-name">{day.day.slice(0, 3).toUpperCase()}</span>
                  <span className="day-cond">{day.condition.toUpperCase()}</span>
                  <span className="day-temp">{day.high}° / {day.low}°</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
