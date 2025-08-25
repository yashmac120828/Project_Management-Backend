# 🚀 Backend Project (Phase 1)

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)  
![Express](https://img.shields.io/badge/Express.js-Backend-blue?logo=express)  
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)  
![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-brightgreen?logo=swagger)  
![License](https://img.shields.io/badge/License-MIT-yellow)

This is **Phase 1** of my backend project — built with **Node.js, Express, and MongoDB**.  
It includes **authentication, user management, JWT, cookies, and auto-generated API documentation**.

---

## ✨ Features

- 🛢️ **MongoDB Integration** - Robust database connectivity with Mongoose ODM
- 🔑 **Authentication System** - Complete JWT-based auth with HTTP-only cookies
- ⚙️ **Express Server** - Production-ready server with comprehensive middleware
- 🧩 **Modular Architecture** - Clean separation with Routes, Controllers, and Models
- 📖 **Comprehensive API Documentation**
  - **Swagger UI** - Interactive API playground for testing
  - **Redoc** - Clean, professional API reference
  - **OpenAPI Spec** - Standard JSON specification
- 🎨 **Modern Landing Page** - Stylish developer portal with project overview
- 🛡️ **Security Features** - CORS, cookie security, input validation
- 🔄 **Hot Reload** - Development server with nodemon for instant updates

---

## 📂 Project Structure

```
backend-project/
├── db/                     # Database connection & configuration
│   └── index.js           # MongoDB connection setup
├── routes/                 # API route definitions
│   ├── auth.js            # Authentication routes
│   ├── health.js          # Health check endpoints
│   └── index.js           # Route aggregation
├── controllers/            # Business logic handlers
│   ├── auth.controller.js # Authentication logic
│   └── health.controller.js # Health check logic
├── models/                 # Mongoose data models
│   └── user.model.js      # User schema definition
├── middleware/             # Custom middleware functions
│   ├── auth.middleware.js # Authentication middleware
│   └── validation.js      # Input validation middleware
├── utils/                  # Utility functions
│   ├── constants.js       # Application constants
│   └── helpers.js         # Helper functions
├── config/                 # Configuration files
│   └── database.js        # Database configuration
├── docs/                   # Documentation files
│   └── swagger.json       # Generated Swagger spec
├── app.js                  # Express application setup
├── index.js                # Application entry point
├── swagger.js              # Swagger auto-generation config
├── package.json            # Dependencies & scripts
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore patterns
└── README.md              # Project documentation
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or cloud instance)
- **Git** for version control

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/backend-project.git
cd backend-project
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/backend-project
# For MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# CORS Configuration
ORIGIN=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

# Cookie Configuration
COOKIE_SECRET=your-cookie-secret-key
```

### 4️⃣ Start the Development Server

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start

# Generate fresh API documentation
npm run docs:generate
```

### 5️⃣ Verify Installation

Visit these URLs to confirm everything is working:

- **🌐 Landing Page:** [http://localhost:3000](http://localhost:3000)
- **🔍 Health Check:** [http://localhost:3000/api/v1/health](http://localhost:3000/api/v1/health)

---

## 📖 API Documentation

Once the server is running, access comprehensive API documentation:

| Documentation Type | URL | Description |
|-------------------|-----|-------------|
| 🎮 **Swagger UI** | [http://localhost:3000/api-docs](http://localhost:3000/api-docs) | Interactive API playground for testing endpoints |
| 📘 **Redoc** | [http://localhost:3000/docs](http://localhost:3000/docs) | Clean, professional API reference documentation |
| 📄 **OpenAPI Spec** | [http://localhost:3000/swagger.json](http://localhost:3000/swagger.json) | Raw JSON specification file |

### 🔗 Available Endpoints

#### Authentication Routes
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/profile` - Get user profile
- `POST /api/v1/auth/refresh` - Refresh JWT token

#### Health & Monitoring
- `GET /api/v1/health` - Basic health check
- `GET /api/v1/health/detailed` - Detailed system health

---

## 🛠️ Tech Stack

### Backend Framework
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework

### Database & ODM
- **MongoDB** - NoSQL document database
- **Mongoose** - Elegant MongoDB object modeling

### Authentication & Security
- **JWT (jsonwebtoken)** - Secure token-based authentication
- **bcryptjs** - Password hashing and encryption
- **cookie-parser** - HTTP cookie parsing middleware
- **cors** - Cross-Origin Resource Sharing configuration

### API Documentation
- **Swagger UI Express** - Interactive API documentation
- **Redoc CLI** - Alternative documentation interface
- **swagger-autogen** - Automatic OpenAPI specification generation

### Development Tools
- **nodemon** - Development server with hot reload
- **dotenv** - Environment variable management
- **morgan** - HTTP request logger middleware

---

## 🚀 Deployment

### Environment Setup

1. **Production Environment Variables**
   ```env
   NODE_ENV=production
   PORT=8080
   MONGODB_URI=your-production-mongodb-uri
   JWT_SECRET=your-production-jwt-secret
   ORIGIN=https://your-frontend-domain.com
   ```

2. **Build Command**
   ```bash
   npm install --production
   npm run docs:generate
   ```

3. **Start Command**
   ```bash
   npm start
   ```

### Deployment Platforms

- **Heroku** - Easy deployment with git integration
- **Vercel** - Serverless deployment for Node.js
- **DigitalOcean App Platform** - Container-based deployment
- **AWS EC2** - Traditional server deployment

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

---

## 📝 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Start** | `npm start` | Start production server |
| **Development** | `npm run dev` | Start development server with hot reload |
| **Docs** | `npm run docs:generate` | Generate fresh API documentation |
| **Test** | `npm test` | Run test suite |
| **Lint** | `npm run lint` | Check code quality |

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style Guidelines

- Use **ES6+** features and modern JavaScript
- Follow **RESTful API** design principles
- Write **descriptive commit messages**
- Add **JSDoc comments** for functions
- Maintain **consistent indentation** (2 spaces)


---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Check MongoDB service status
brew services list | grep mongodb  # macOS
sudo systemctl status mongod        # Linux
```

**Port Already in Use**
```bash
# Kill process using port 3000
npx kill-port 3000
```

**JWT Token Issues**
- Ensure `JWT_SECRET` is set in `.env`
- Check token expiration settings
- Verify cookie configuration

---


## ❤️ Acknowledgements

A huge shoutout to the amazing developers and educators who inspired this project:

- **🙌 Hitesh Choudhary** - For exceptional teaching and mentorship
- **☕ Chai aur Code** - For creating an incredible learning community
- **🌟 Open Source Community** - For the amazing tools and libraries

Special thanks to all contributors and the Node.js community for making backend development accessible and enjoyable!

---

## 📞 Support & Contact

- **📧 Email:** [your-email@example.com](mailto:yashmachhi1408@gmail.com)
- **🐛 Issues:** [GitHub Issues](https://github.com/yashmac120828/Project_Management-Backend/issues)
- **💬 Discussions:** [GitHub Discussions](https://github.com/yashmac120828/Project_Management-Backend/discussions)


---

<div align="center">

**⭐ If you found this project helpful, please consider giving it a star!**

Made with ❤️ by **Yash Machhi** — 2025

</div>