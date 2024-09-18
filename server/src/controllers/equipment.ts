import ServiceEquipment from '../services/equipment.service';
import { EquipmentAttributes } from './../models/equipment.model';
import { Request, Response } from "express";

class ControllerEquipment {
    constructor() {}

    // Obtener todos los equipos
    public async getAllEquipments(req: Request, res: Response) {
        try {
            const result = await ServiceEquipment.getEquipment();
            if (!result.success) {
                return res.status(500).json({ message: result.message });
            }
            res.status(200).json(result.data);
        } catch (error: any) {
            res.status(500).json({ message: "Error al obtener los equipos", error: error.message });
        }
    }

    // Obtener un equipo por su ID
    public async getEquipmentById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await ServiceEquipment.getOneEquipment(parseInt(id));
            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }
            res.status(200).json(result.data);
        } catch (error: any) {
            res.status(500).json({ message: "Error al obtener el equipo", error: error.message });
        }
    }

    // Crear un nuevo equipo
    public async createEquipment(req: Request, res: Response) {
        try {
            const data: EquipmentAttributes = req.body;
            const result = await ServiceEquipment.createEquipment(data);
            if (!result.success) {
                return res.status(500).json({ message: result.message });
            }
            res.status(201).json(result.data);
        } catch (error: any) {
            res.status(500).json({ message: "Error al crear el equipo", error: error.message });
        }
    }

    // Actualizar un equipo por su ID
    public async updateEquipment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: EquipmentAttributes = req.body;
            const result = await ServiceEquipment.updateEquipment(parseInt(id), data);
            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }
            res.status(200).json(result.data);
        } catch (error: any) {
            res.status(500).json({ message: "Error al actualizar el equipo", error: error.message });
        }
    }

    // Eliminar un equipo
    public async deleteEquipment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await ServiceEquipment.deleteEquipment(parseInt(id));
            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }
            res.status(200).json({ message: result.message });
        } catch (error: any) {
            res.status(500).json({ message: "Error al eliminar el equipo", error: error.message });
        }
    }
}

export default new ControllerEquipment();
