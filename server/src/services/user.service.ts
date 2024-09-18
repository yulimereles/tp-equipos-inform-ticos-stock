import { UserModel, UserAttributes } from '../models/users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserService {
     // Registrar un nuevo usuario
     public async registerUser(data: UserAttributes) {
        try {
            const { email, password, role } = data; // Asegúrate de extraer role también
            //buscar en la base de datos que no exista un usuario con ese email
            const user = await UserModel.findOne({ where: { email } });
            if(user) return { success: false, message: 'El email ya existe' };
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await UserModel.create({
                email,
                password: hashedPassword,
                role, // Asegúrate de incluir role aquí
            });
            await newUser.save();
            return { success: true, data: newUser };
        } catch (error: any) {
            console.log(error)
            return { success: false, message: 'Error al registrar el usuario', error: error.message };
        }
    }

    // Login de usuario
    public async loginUser(email: string, password: string) {
        try {
            const user = await UserModel.findOne({ where: { email } });
            if (!user) return { success: false, message: 'Usuario no encontrado' };
            
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return { success: false, message: 'Contraseña incorrecta' };
            
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
            return { success: true, token };
        } catch (error: any) {
            return { success: false, message: 'Error al iniciar sesión', error: error.message };
        }
    }


    // Obtener todos los usuarios
    public async getUsers() {
        try {
            const users = await UserModel.findAll();
            return { success: true, data: users };
        } catch (error: any) {
            return { success: false, message: 'Error al obtener los usuarios', error: error.message };
        }
    }

    // Obtener un usuario por ID
    public async getUserById(id: number) {
        try {
            const user = await UserModel.findByPk(id);
            if (user) {
                return { success: true, data: user };
            }
            return { success: false, message: 'Usuario no encontrado' };
        } catch (error: any) {
            return { success: false, message: 'Error al obtener el usuario', error: error.message };
        }
    }

    // Crear un nuevo usuario
    public async createUser(data: UserAttributes) {
        try {
            const newUser = await UserModel.create(data);
            return { success: true, data: newUser };
        } catch (error: any) {
            return { success: false, message: 'Error al crear el usuario', error: error.message };
        }
    }

    // Actualizar un usuario por ID
    public async updateUser(id: number, data: UserAttributes) {
        try {
            const user = await UserModel.findByPk(id);
            if (user) {
                await user.update(data);
                return { success: true, data: user };
            }
            return { success: false, message: 'Usuario no encontrado' };
        } catch (error: any) {
            return { success: false, message: 'Error al actualizar el usuario', error: error.message };
        }
    }

    // Eliminar un usuario
    public async deleteUser(id: number) {
        try {
            const user = await UserModel.findByPk(id);
            if (user) {
                await user.destroy();
                return { success: true, message: 'Usuario eliminado' };
            }
            return { success: false, message: 'Usuario no encontrado' };
        } catch (error: any) {
            return { success: false, message: 'Error al eliminar el usuario', error: error.message };
        }
    }
}

export default new UserService();
