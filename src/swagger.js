// swagger.js
import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "My Backend API",
    description: "🚀 Auto-generated API documentation",
    version: "1.0.0",
  },
  servers: [
    { url: "http://localhost:3000" }
  ],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["index.js", "./routes/authRoutes.js", "./routes/healthCheckRoutes.js"]; 
// add all your routes here

swaggerAutogen()(outputFile, endpointsFiles, doc);
