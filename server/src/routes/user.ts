import { Router } from 'express';
import UserController from '../controllers/user';
import authenticateToken from '../middleware/auth.middleware';


const router = Router();


// // Rutas públicas
router.post('/auth/register', UserController.register);
router.post('/auth/login', UserController.login);

// // Rutas protegidas
router.use(authenticateToken); // Aplica el middleware a todas las siguientes rutas

router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;
