import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import * as dotenv from "dotenv";
import passport from "../../application/config/passport.config";

// Import des routes
import authRoutes from '../../presentation/routes/auth.routes';
import bibleReadingRoutes from '../../presentation/routes/bibleReading.routes';
import bibleTextRoutes from '../../presentation/routes/bibleText.routes';
import favoriteBibleReadingRoutes from '../../presentation/routes/favorite-bibleReading.routes';
import insertBibleReadingByJsonRoutes from '../../presentation/routes/insertBibleReadingByJson.routes';
import errorLoggingMiddleware from "../../application/middlewares/error-log/error-logging-filter";
import logger from "../../application/helper/logger/logRotation";

dotenv.config();
const app = express();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
const PORT = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET;

// Middleware
// app.use(cookieParser());
app.use(express.json());
// app.use(cors({
//     origin: CLIENT_URL,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// Vérifiez que JWT_SECRET est défini
if (!jwtSecret) {
    throw new Error('JWT_SECRET environment variable is not defined');
}

app.use(session({
    secret: jwtSecret,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Create a write stream for logging
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    console.info(`${req.method} ${req.url}`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Bible Reading API');
});

app.use('/api/auth', authRoutes);
app.use('/api/bible-readings', bibleReadingRoutes);
app.use('/api/bible-texts', bibleTextRoutes);
app.use('/api/favorites', favoriteBibleReadingRoutes);
app.use('/api/insert-readings', insertBibleReadingByJsonRoutes);

app.use(errorLoggingMiddleware)

// Middleware to handle 404 errors
app.use((req: any, res: any) => {
    logger.warn(`404 Not Found: ${req.method} ${req.url}`);
    console.warn(`404 Not Found: ${req.method} ${req.url}`);
    res
        .status(404)
        .send({ error: "Not Found" });
});

export default app;