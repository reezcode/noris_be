import { exceptionResponse, response } from "../core/commons/response"
import { Request, Response } from 'express';
import { registerUser } from "../core/repository/auth/service";


const register = async (req: Request, res: Response) => {
    try {
        const model = req.body
        const data = await registerUser(model)
        if(data.user) {
            return response(
                res, {
                    code: 200,
                    success: true,
                    message: 'User registered successfully',
                    content: data
                }
            )
        } else {
            return response(
                res, {
                    code: 400,
                    success: false,
                    message: 'User registered failed',
                    content: data
                }
            )
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

export { register }