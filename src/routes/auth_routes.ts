import { login, register } from "../controllers/auth_controller";
import validateBody, { loginSchema, registerSchema } from "../core/validator";

const { Router } = require('express');

const authRoutes = Router();

authRoutes.post('/register', validateBody(registerSchema), register)
authRoutes.post('/login', validateBody(loginSchema), login)

export default authRoutes;