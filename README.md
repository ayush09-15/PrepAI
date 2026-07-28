# PrepAI — AI Interview Preparation Platform

A full stack MERN application that generates personalized interview questions from your resume using Google Gemini AI, tracks your progress, and provides AI-powered feedback on your answers.

---

## Features

- **Resume-based Question Generation** — Upload your PDF resume and get 10 AI-generated interview questions tailored to your experience and role
- **AI Feedback** — Receive a detailed performance summary after completing an interview, powered by Gemini AI
- **Progress Dashboard** — Track completed and pending interviews with a visual progress chart
- **Interview History** — View all past interviews with your answers and scores
- **JWT Authentication** — Secure login and registration with token-based auth
- **Delete Interview** — Remove interviews and automatically clean up uploaded resume files from the server
- **Mobile Responsive** — Fully responsive design that works seamlessly on mobile, tablet, and desktop

---

## Tech Stack

**Frontend**
- React.js
- React Router
- Context API
- Recharts
- Axios
- react-hot-toast

**Backend**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Multer (file uploads)
- PDF text extraction

**AI**
- Google Gemini AI (gemini-3.6-flash)

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Google Gemini API key from [aistudio.google.com](https://aistudio.google.com)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/ayush09-15/PrepAI.git
cd PrepAI
```

**2. Backend setup**
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:
```bash
npm run dev
```

**3. Frontend setup**
```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port (default: 8000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `GEMINI_API_KEY` | Google Gemini AI API key |

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get token |

### Interviews
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/interviews` | Get all user interviews |
| POST | `/api/interviews/upload-resume` | Upload resume and generate questions |
| GET | `/api/interviews/:id` | Get interview by ID |
| POST | `/api/interviews/:id/submit` | Submit answers and get AI feedback |
| DELETE | `/api/interviews/:id` | Delete an interview |

---

## Project Structure

```
PrepAI/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── interviewController.js
│   ├── models/
│   │   ├── user.js
│   │   └── Interview.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── interviewRoutes.js
│   ├── services/
│   │   ├── geminiService.js
│   │   └── pdfService.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   └── app.js
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Interview.jsx
    │   │   └── InterviewDetails.jsx
    │   ├── services/
    │   │   └── api/
    │   │       ├── authApi.js
    │   │       └── interviewApi.js
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   └── App.jsx
    └── index.html
```

---

## License

This project is licensed under the MIT License.