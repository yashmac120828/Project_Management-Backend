import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import swaggerUi from "swagger-ui-express";
import redoc from "redoc-express";
import fs from "fs";

const app = express()
const swaggerFile = JSON.parse(fs.readFileSync("./src/swagger-output.json", "utf-8"));


//basic configurations
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//cors configurations
app.use(cors({
    origin : process.env.ORIGIN?.split(",") || "localhost:5173",
    credentials:true,
    methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders:["Authorization","Content-Type"]
}))

//import the routes
import healthCheckRouter from "./routes/healthCheckRoutes.js"
import authRouter from "./routes/authRoutes.js"

app.use("/api/v1/healthcheck", healthCheckRouter)
app.use("/api/v1/auth",authRouter)

// Redoc
app.get("/docs", redoc({
  title: "API Docs",
  specUrl: "/swagger.json"
}));

// Serve swagger.json
app.get("/swagger.json", (req, res) => {
  res.json(swaggerFile);
});

// Root landing page
app.get("/", (req, res) => {
  res.send(`
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Backend Project</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --primary: #6366f1;
      --primary-dark: #4f46e5;
      --secondary: #8b5cf6;
      --accent: #06d6a0;
      --dark: #0f172a;
      --dark-lighter: #1e293b;
      --gray: #64748b;
      --gray-light: #f1f5f9;
      --white: #ffffff;
      --gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06d6a0 100%);
      --shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      --shadow-lg: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--dark);
      color: var(--white);
      line-height: 1.6;
      overflow-x: hidden;
    }

    /* Animated background */
    .bg-animation {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: var(--dark);
      overflow: hidden;
    }

    .bg-animation::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: conic-gradient(from 0deg, transparent, var(--primary), transparent);
      animation: rotate 20s linear infinite;
      opacity: 0.1;
    }

    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Header */
    header {
      position: relative;
      padding: 4rem 2rem;
      text-align: center;
      background: var(--gradient);
      background-size: 400% 400%;
      animation: gradientShift 8s ease infinite;
      clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .hero-title {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      margin-bottom: 1rem;
      background: linear-gradient(45deg, #fff, #f0f9ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .hero-subtitle {
      font-size: 1.2rem;
      opacity: 0.95;
      font-weight: 400;
      max-width: 600px;
      margin: 0 auto;
    }

    .phase-badge {
      display: inline-block;
      background: rgba(255,255,255,0.2);
      backdrop-filter: blur(10px);
      padding: 0.5rem 1.5rem;
      border-radius: 50px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-top: 1rem;
      border: 1px solid rgba(255,255,255,0.1);
    }

    /* Container */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    /* Section styling */
    section {
      margin: 4rem 0;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 2rem;
      position: relative;
      display: inline-block;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 50px;
      height: 3px;
      background: var(--accent);
      border-radius: 2px;
    }

    /* Cards grid */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .card {
      background: var(--dark-lighter);
      border-radius: 20px;
      padding: 2rem;
      text-decoration: none;
      color: inherit;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(255,255,255,0.1);
      position: relative;
      overflow: hidden;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--gradient);
      transform: scaleX(0);
      transition: transform 0.4s ease;
    }

    .card:hover::before {
      transform: scaleX(1);
    }

    .card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-lg);
      border-color: rgba(255,255,255,0.2);
    }

    .card-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      display: block;
    }

    .card-title {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .card-desc {
      color: var(--gray);
      font-size: 0.9rem;
    }

    /* Info list */
    .info-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .info-item {
      background: var(--dark-lighter);
      padding: 1.5rem;
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all 0.3s ease;
    }

    .info-item:hover {
      border-color: var(--primary);
      transform: translateY(-2px);
    }

    .info-icon {
      font-size: 1.5rem;
    }

    .info-text {
      font-weight: 500;
    }

    /* Coming soon section */
    .coming-soon {
      background: linear-gradient(135deg, var(--dark-lighter), var(--dark));
      border-radius: 24px;
      padding: 3rem 2rem;
      text-align: center;
      border: 1px solid rgba(255,255,255,0.1);
      position: relative;
      overflow: hidden;
      margin: 3rem 0;
    }

    .coming-soon::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: conic-gradient(from 0deg, transparent, var(--accent), transparent);
      animation: rotate 15s linear infinite;
      opacity: 0.05;
    }

    .coming-soon-content {
      position: relative;
      z-index: 1;
    }

    .coming-soon h3 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .coming-soon p {
      color: var(--gray);
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }

    .feature-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
      justify-content: center;
      margin-top: 1.5rem;
    }

    .tag {
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.3);
      padding: 0.4rem 1rem;
      border-radius: 20px;
      font-size: 0.85rem;
      color: #a5b4fc;
      backdrop-filter: blur(10px);
    }

    /* Footer */
    footer {
      text-align: center;
      padding: 3rem 0;
      margin-top: 4rem;
      border-top: 1px solid rgba(255,255,255,0.1);
      background: var(--dark-lighter);
    }

    .footer-text {
      color: var(--gray);
      font-size: 0.95rem;
    }

    .footer-text span {
      color: var(--accent);
      font-weight: 600;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .cards-grid {
        grid-template-columns: 1fr;
      }
      
      .info-list {
        grid-template-columns: 1fr;
      }
      
      header {
        padding: 3rem 1rem;
      }
      
      .container {
        padding: 0 1rem;
      }
      
      .feature-tags {
        justify-content: flex-start;
      }
    }

    /* Smooth scrolling */
    html {
      scroll-behavior: smooth;
    }

    /* Loading animation */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .fade-in {
      animation: fadeInUp 0.6s ease forwards;
    }
  </style>
</head>
<body>
  <div class="bg-animation"></div>
  
  <header>
    <h1 class="hero-title">🚀 Backend Project </h1>
    <p class="hero-subtitle">Enterprise-grade authentication system with MongoDB, JWT, and modern security practices</p>
    <div class="phase-badge">Phase 1 — Foundation & Authentication</div>
  </header>

  <div class="container">
    <section class="fade-in">
      <h2 class="section-title">📚 API Documentation</h2>
      <div class="cards-grid">
        <a class="card" href="/api-docs">
          <span class="card-icon">🎮</span>
          <div class="card-title">Swagger UI</div>
          <div class="card-desc">Interactive API playground for testing endpoints</div>
        </a>
        <a class="card" href="/docs">
          <span class="card-icon">📖</span>
          <div class="card-title">Redoc Documentation</div>
          <div class="card-desc">Clean, comprehensive API reference</div>
        </a>
        <a class="card" href="/swagger.json">
          <span class="card-icon">⚡</span>
          <div class="card-title">OpenAPI Spec</div>
          <div class="card-desc">Raw JSON specification file</div>
        </a>
      </div>
    </section>

    <section class="fade-in">
      <h2 class="section-title">⚙️ Current Stack</h2>
      <div class="info-list">
        <div class="info-item">
          <span class="info-icon">🛢️</span>
          <span class="info-text">MongoDB Database</span>
        </div>
        <div class="info-item">
          <span class="info-icon">🔐</span>
          <span class="info-text">JWT Authentication</span>
        </div>
        <div class="info-item">
          <span class="info-icon">🍪</span>
          <span class="info-text">Secure HTTP Cookies</span>
        </div>
        <div class="info-item">
          <span class="info-icon">🛡️</span>
          <span class="info-text">Advanced Security</span>
        </div>
      </div>
    </section>

    <section class="coming-soon fade-in">
      <div class="coming-soon-content">
        <h3>🔮 More Amazing Features Coming Soon</h3>
        <p>We're constantly evolving and building the next phases of backend services</p>
        
      </div>
    </section>
  </div>

  <footer>
    <div class="footer-text">
      Crafted with <span>❤️</span> by <span>Yash Machhi</span> — 2025
    </div>
  </footer>

  <script>
    // Add fade-in animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'all 0.6s ease';
      observer.observe(section);
    });
  </script>
</body>
</html>
  `);
});





export default app