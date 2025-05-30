import { Request, Response, NextFunction } from 'express';

// Middleware de gestion des erreurs
function errorLoggingMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    // Log l'erreur
    console.error('Erreur capturée:', err);

    // Répondre avec un message d'erreur générique
    res.status(500).json({
        message: 'Une erreur interne est survenue. Veuillez réessayer plus tard.',
    });
}

export default errorLoggingMiddleware;

