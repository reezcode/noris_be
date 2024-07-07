interface RegisterModel {
    name: string
    email: string,
    password: string
    confirm_password: string,
    avatar_url: string,
    phone_number: string,
}

interface LoginModel {
    email: string
    password: string
}

export { RegisterModel, LoginModel }