# Interface Monitoring Dashboard (MERN Stack)

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)

## 🌐 Live Demo

Explore the deployed application:
- **Frontend**: [https://interface-monitor.vercel.app](https://interface-monitor.vercel.app)
- **Backend API**: [https://interface-monitor-api.onrender.com](https://interface-monitor-api.onrender.com)

## Features

- **Real-time Monitoring** with Socket.io integration
- **Interactive Dashboard** with time-series charts
- **High-Performance Log Management** (500k+ records)
- **CSV Export** functionality
- **Responsive Design** works on all devices

## Tech Stack

### Frontend
- React.js with Vite
- TanStack Query for data fetching
- Material-UI components
- Chart.js for visualizations
- Deployed on Vercel

### Backend
- Node.js + Express.js
- MongoDB Atlas (cloud database)
- Redis for caching
- Deployed on Render

## Try It Out

1. Visit the [live dashboard](https://interface-monitor.vercel.app)
2. Explore the interface metrics
3. Try filtering logs by:
   - Status (Success/Failed)
   - Date range
   - Interface name

## API Documentation

The backend API is available at:
[https://interface-monitor-api.onrender.com/api-docs](https://interface-monitor-api.onrender.com/api-docs)

Sample API Endpoints:
- `GET /api/logs` - Retrieve interface logs
- `GET /api/summary?range=24h` - Get 24-hour summary
- `GET /api/logs/export` - Export logs as CSV

## Development Setup

```bash
# Clone repository
git clone https://github.com/athu2773/interface-monitor.git
cd interface-monitor

# Backend setup
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend setup (in new terminal)
cd ../frontend
npm install
npm run dev
```

## Known Limitations

The demo uses free-tier hosting services:
- Render may spin down inactive backend instances (first load might be slow)
- MongoDB Atlas has limited storage in free tier
- Rate limiting is applied to prevent abuse

## Screenshots

![Dashboard View](/screenshots/dashboard.png)
*Dashboard with summary cards and charts*

![Logs View](/screenshots/logs.png)
*Filterable logs table with pagination*

## License

MIT License - See [LICENSE](LICENSE) for details.

## Feedback

Found a bug or have suggestions? Please [open an issue](https://github.com/athu2773/interface-monitor/issues).

---

*Note: The deployed links above are placeholder URLs. Replace them with your actual deployed URLs when available.*