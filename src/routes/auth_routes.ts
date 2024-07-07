import { register } from "../controllers/auth_controller";
import validateBody, { registerSchema } from "../core/validator";
import { Request, Response } from "express";

const { Router } = require('express');

const authRoutes = Router();

authRoutes.post('/register', validateBody(registerSchema), register)
authRoutes.get('/', (req: Request, res: Response) => {
    res.send('NORIS BE is Active')
})

export default authRoutes;