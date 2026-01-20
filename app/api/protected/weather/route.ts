import { NextResponse } from 'next/server';

// Sample weather data
const weatherData = {
    location: 'San Francisco, CA',
    temperature: 68,
    unit: 'F',
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    windDirection: 'NW',
    forecast: [
        { day: 'Monday', high: 70, low: 55, condition: 'Sunny' },
        { day: 'Tuesday', high: 68, low: 54, condition: 'Cloudy' },
        { day: 'Wednesday', high: 72, low: 56, condition: 'Sunny' },
        { day: 'Thursday', high: 69, low: 53, condition: 'Partly Cloudy' },
        { day: 'Friday', high: 67, low: 52, condition: 'Rain' },
    ],
    lastUpdated: new Date().toISOString(),
};

export async function GET() {
    return NextResponse.json({
        success: true,
        data: weatherData,
        message: 'Weather data retrieved successfully. This is a paid API endpoint protected by x402.',
    });
}
