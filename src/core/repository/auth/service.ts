import client from "../../../database/client"
import { LoginModel, RegisterModel } from "./model"

const registerUser = async (model: RegisterModel) => {
    try {
        const { name, email, password, confirm_password, avatar_url, phone_number } = model
        if(password !== confirm_password) {
            throw new Error('Password and Confirm Password do not match')
        } else {
            const { data, error } = await client.auth.signUp({
                email: model.email,
                password: model.password,
                options: {
                    data: {
                        display_name: model.name.toLowerCase().replace(/\s+/g, ''),
                        phone: model.phone_number
                    }
                }
            })
            if(error) {
                throw new Error(error.message)
            } else {
                const {error} =  await client.from('users').insert({
                    name: name,
                    email: email,
                    avatar_url: avatar_url,
                    phone_number: phone_number
                })
                if(error) {
                    throw new Error(error.message)
                } else {
                    return data
                }
            }
        }
    } catch (error) {
        throw error
    }
}

const loginUser = async (model: LoginModel) => {
    try {
        const { data, error } = await client.auth.signInWithPassword({
            email: model.email,
            password: model.password
        })
        if(error) {
            throw new Error(error.message)
        } else {
            return data
        }
    } catch (error) {
        throw error
    }
}

export { registerUser, loginUser }