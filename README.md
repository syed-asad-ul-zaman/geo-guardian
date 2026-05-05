# 🌍 Geo-Guardian: Planetary Tactical Intelligence

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![NASA API](https://img.shields.io/badge/NASA_EONET-v3-blue?style=for-the-badge&logo=nasa)](https://eonet.gsfc.nasa.gov/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**Geo-Guardian** is a high-performance, real-time intelligence platform designed to monitor natural disasters across the globe. By leveraging NASA's EONET (Earth Observatory Natural Event Tracker) and GIBS satellite imagery, it provides a "Tactical View" of wildfires, storms, volcanoes, and more.

---

## ✨ Key Features

- **🛰️ Tactical Grid**: Real-time map interface with category-specific custom icons (Wildfires, Storms, Earthquakes, etc.).
- **🔥 Live Event Feed**: High-density feed of active planetary events with proximity intelligence.
- **🛰️ Satellite Integration**: Direct connection to NASA GIBS for real-time satellite layer visualization.
- **🌑 Premium Theme System**: Sleek, glassmorphic UI with automated Light/Dark mode transitions.
- **📱 PWA Ready**: Optimized for mobile with a social-style layout and gesture-based navigation.
- **🌡️ Micro-Intelligence**: Dynamic weather tracking based on user geolocation.

---

## 🚀 0 to Run (Local Setup)

Follow these steps to get your own tactical command center running locally.

### 1. Clone the Repository
```bash
git clone https://github.com/syed-asad-ul-zaman/geo-guardian.git
cd geo-guardian
```

### 2. Install Dependencies
We recommend using **pnpm** for speed and disk efficiency.
```bash
pnpm install
# or
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

### 4. Launch the Grid
```bash
pnpm dev
# or
npm run dev
```
The application will be live at `http://localhost:3000`.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS 4.0 |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Map Engine** | Leaflet / React-Leaflet |
| **Data Source** | NASA EONET v3 API |

---

## 📂 Project Architecture

```text
src/
├── app/              # Next.js App Router (Pages & API)
├── components/       # UI Components (Map, Feed, Cards)
├── hooks/            # Custom React Hooks (Feed logic, Geo)
├── lib/              # API Clients & Utility functions
└── public/           # Static assets & Manifest
```

---

## 📡 API Sources
- **NASA EONET**: Source for natural event data.
- **NASA GIBS**: Source for satellite imagery layers.
- **WeatherAPI**: Real-time atmospheric data.

---

## 🤝 Contributing
This is an open intelligence project. Feel free to fork and submit PRs for new tactical features or data visualizations.

---

## 📜 License
MIT License. Created by **Syed Asad**.
