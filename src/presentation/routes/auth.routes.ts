import { Router } from 'express';
import passport from '../../application/config/passport.config';
import authenticateToken from '../../application/middlewares/auth';
import authController from '../controllers/auth.controller';

const router = Router();

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
    (req, res) => {
        // res.redirect('/');
    }
);
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    authController.googleCallback
);


// Route pour l'authentification par email et mot de passe
router.post('/login', authController.login);

// Middleware pour protéger les routes
router.get('/refresh-token', authController.refreshToken);

router.use(authenticateToken)

router.get('/logout', authController.logout);

export default router;