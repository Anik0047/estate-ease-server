import bcrypt from "bcrypt" // user password should be hash. so bcrypt help the password to be hash password.
import prisma from "../lib/prisma.js"

export const register = async (request, response) => {

    const { username, email, password } = request.body

    try{

        
        // Hash the password
        
        const hashedPassword = await bcrypt.hash(password, 10)
        
        // console.log(hashedPassword)
        
        // Create a new user and save to DB
        
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    })

    console.log(newUser)

    response.status(201).json({ message: "User created successfully " })
    
} catch (error){

    console.log(error);

    response.status(500).json({ message: "Failed to create user!" })
}
}

export const login = async (request, response) => {
    
    const {username, password} = request.body

    try{

    // Check if the user exists

    const user = await prisma.user.findUnique({

        where:{ username }

    })

    if(!user) return response.status(401).json({ message: "Invalid Credentials!" })

    // Check if the password is correct 

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid) return response.status(401).json({ message: "Invalid Credentials!" })

    // Generate cookie token and send to the user

    } catch (error){

        console.log(error)

        response.status(500).json({ message: "Failed to login!" })
    }

}

export const logout = (request, response) => {

    response.send("ok")
    // db operations
}
