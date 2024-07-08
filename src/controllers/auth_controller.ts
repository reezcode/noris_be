import { exceptionResponse, response } from "../core/commons/response"
import { Request, Response } from 'express';
import { loginUser, refreshSession, registerUser } from "../core/repository/auth/service";
import { CustomError } from "../core/commons/exceptions";


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
            return exceptionResponse(res, new CustomError(400, 'User registered failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const model = req.body
        const data = await loginUser(model)
        if(data.user) {
            return response(
                res, {
                    code: 200,
                    success: true,
                    message: 'User logged in successfully',
                    content: data
                }
            )
        } else {
            return exceptionResponse(res, new CustomError(400, 'User not found'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const getRefreshSession = async (req: Request, res:Response) => {
    try {
        const token = req.body.refresh_token
        const data = await refreshSession(token)
        if(data) {
            return response(res, {
                code: 200,
                success: true,
                message: 'Token refreshed successfully',
                content: data
            }) 
        } else {
            return exceptionResponse(res, new CustomError(400, 'Token not found'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

export { register, login, getRefreshSession }