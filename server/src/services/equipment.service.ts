import { EquipmentAttributes } from './../models/equipment.model';
import { EquipmentModel } from './../models/equipment.model';

class ServiceEquipment {
    constructor() {}

    // Obtener todos los equipos
    public async getEquipment() {
        try {
            const equipment = await EquipmentModel.findAll({
                attributes: ['id', 'model', 'serial', 'brand', 'category']
            });
            return { success: true, data: equipment };
        } catch (error: any) {
            return { success: false, message: "Error al obtener todos los equipos.", error: error.message };
        }
    }

    // Obtener un equipo por su id
    public async getOneEquipment(id: number) {
        try {
            const equipment = await EquipmentModel.findOne({ where: { id } });
            if (!equipment) {
                return { success: false, message: `El equipo con ID ${id} no pudo ser encontrado` };
            }
            return { success: true, data: equipment };
        } catch (error: any) {
            return { success: false, message: "Error al obtener el equipo.", error: error.message };
        }
    }

    // Crear un equipo nuevo
    public async createEquipment(data: EquipmentAttributes) {
        try {
            const newEquipment = await EquipmentModel.create(data);
            return { success: true, data: newEquipment };
        } catch (error: any) {
            return { success: false, message: "Error al crear el equipo.", error: error.message };
        }
    }

    // Actualizar un equipo
    public async updateEquipment(id: number, data: EquipmentAttributes) {
        try {
            const [updatedRows] = await EquipmentModel.update(data, { where: { id } });
            if (updatedRows === 0) {
                return { success: false, message: 'No se encontró el equipo o ya ha sido eliminado' };
            }
            const updatedEquipment = await EquipmentModel.findOne({ where: { id } });
            return { success: true, data: updatedEquipment };
        } catch (error: any) {
            return { success: false, message: 'Error al actualizar el equipo.', error: error.message };
        }
    }

    // Eliminar un equipo (eliminación lógica)
    public async deleteEquipment(id: number) {
        try {
            // Verifica si el equipo existe antes de eliminarlo
            const equipment = await EquipmentModel.findByPk(id);
            if (!equipment) {
                return { success: false, message: 'El equipo no existe.' };
            }

            // Marca el equipo como eliminado lógicamente
            await equipment.destroy();
            return { success: true, message: 'Equipo eliminado correctamente' };
        } catch (error: any) {
            return { success: false, message: 'Error al eliminar el equipo: ' + error.message };
        }
    }
}

export default new ServiceEquipment();
