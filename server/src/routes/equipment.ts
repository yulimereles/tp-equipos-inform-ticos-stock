import { Router} from 'express';
import  ControllerEquipment  from '../controllers/equipment';

const {
    getAllEquipments,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment

} = ControllerEquipment;

const router = Router();

router.get("/", getAllEquipments);
router.get("/:id", getEquipmentById);
router.post("/", createEquipment);
router.put("/:id", updateEquipment);
router.delete("/:id", deleteEquipment);


export default router; 