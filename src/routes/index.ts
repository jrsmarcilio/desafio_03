import { Router } from "express";
import EmployerController from "../controller/Employer";

const router = Router();

const employerController = new EmployerController();

router.get('/employees', employerController.index);
router.post('/employees', employerController.store);

export { router }