// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
    constructor() {}

    // Registro de usuario
    public async register(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await UserService.registerUser({ email, password, role: 'user' });
            if (result.success) {
                res.status(201).json(result.data);
            } else {
                res.status(400).json({ message: result.message });
            }
        } catch (error: any) {
            res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
        }
    }

    // Login de usuario
    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await UserService.loginUser(email, password);
            if (result.success) {
                res.status(200).json({ token: result.token });
            } else {
                res.status(401).json({ message: result.message });
            }
        } catch (error: any) {
            res.status(500).json({ message: "Error en el inicio de sesión", error: error.message });
        }
    }

    // Obtener todos los usuarios
    public async getAllUsers(req: Request, res: Response) {
        try {
            const result = await UserService.getUsers();
            if (result.success) {
                res.status(200).json(result.data);
            } else {
                res.status(500).json({ message: result.message });
            }
        } catch (error: any) {
            res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
        }
    }

    // Obtener un usuario por ID
    public async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await UserService.getUserById(parseInt(id));
            if (result.success) {
                res.status(200).json(result.data);
            } else {
                res.status(404).json({ message: result.message });
            }
        } catch (error: any) {
            res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
        }
    }

    // Crear un nuevo usuario
    public async createUser(req: Request, res: Response) {
        try {
            const data = req.body;
            const result = await UserService.createUser(data);
            if (result.success) {
                res.status(201).json(result.data);
            } else {
                res.status(500).json({ message: result.message });
            }
        } catch (error: any) {
            res.status(500).json({ message: "Error al crear el usuario", error: error.message });
        }
    }

    // Actualizar un usuario por ID
    public async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await UserService.updateUser(parseInt(id), data);
            if (result.success) {
                res.status(200).json(result.data);
            } else {
                res.status(404).json({ message: result.message });
            }
        } catch (error: any) {
            res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
        }
    }

    // Eliminar un usuario
    public async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await UserService.deleteUser(parseInt(id));
            if (result.success) {
                res.status(200).json({ message: result.message });
            } else {
                res.status(404).json({ message: result.message });
            }
        } catch (error: any) {
            res.status(500).json({ message: "Error al eliminar el usuario", error: error.message });
        }
    }
}

export default new UserController();
