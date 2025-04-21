import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import * as dotenv from "dotenv";
import router from "../../presentation/routes/readingRoute";
import passport from "../../application/config/passport.config";

import authRoutes from '../../presentation/routes/auth.routes';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
const PORT = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET;

app.use(cookieParser()); // Ajoutez ce middleware pour analyser les cookies
app.use(cors({
    origin: CLIENT_URL, // Autoriser le domaine de votre front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Autoriser les cookies et les sessions
    allowedHeaders: ['Content-Type', 'Authorization'], // Autoriser les en-têtes spécifiques
}));

// Vérifiez que JWT_SECRET est défini
if (!jwtSecret) {
    throw new Error('JWT_SECRET environment variable is not defined');
}

// Middleware
app.use(express.json());
app.use(session({
    secret: jwtSecret, // Utilisez la variable vérifiée
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lections', router)

export default app;