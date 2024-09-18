import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/users'; 

interface CustomRequest extends Request {
    user?: any;
}

const authenticateToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    // Obtener el token del encabezado Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET!, async (err: any, user: any) => {
        if (err) return res.sendStatus(403);

        try {
            // Buscar el usuario en la base de datos
            const dbUser = await UserModel.findByPk(user.id);
            if (!dbUser) return res.sendStatus(404);

            // Asignar el usuario al request
            req.user = dbUser;
            next();
        } catch (error: any) {
            res.status(500).json({ message: 'Error al buscar el usuario', error: error.message });
        }
    });
};

export default authenticateToken;
