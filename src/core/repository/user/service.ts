import client from "../../../database/client"
import { CustomError } from "../../commons/exceptions"

const getUserId = async (token: string) => {
    try {
        await client.auth.refreshSession()
        const raw = token.split(" ")
        const jwt = raw[1]
        const { data: { user } } = await client.auth.getUser(jwt)
        if(user == null){
            throw new CustomError(401, 'User not found')
        }
        const { data, error } = await client.from('users').select('id').eq('email', user?.email!)
        if (error) {
            throw error
        }
        return data
    } catch (error) {
        throw error
    }
}

export { getUserId }