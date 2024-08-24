import bcrypt from "bcrypt"

export const register = async (request, response) => {

    const { username, email, password } = request.body

    // Hash the password

    const hashedPassword = await bcrypt.hash(password, 10)

    console.log(hashedPassword)

    // Create a new user and save to DB
}

export const login = (request, response) => {
    // db operations
}

export const logout = (request, response) => {
    // db operations
}
