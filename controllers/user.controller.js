import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"

export const getUsers = async (request, response) => {
    
    try{

        const users = await prisma.user.findMany();

        response.status(200).json(users)

    }catch(error){
        console.log(error)
        response.status(500).json({ message: "Failed to get users" })
    }

}

export const getUser = async (request, response) => {

    const id = request.params.id

    try{

        const user = await prisma.user.findUnique({
            where: {id},
        });

        response.status(200).json(user)

    }catch(error){
        console.log(error)
        response.status(500).json({ message: "Failed to get user" })
    }

}

export const updateUser = async (request, response) => {

    const id = request.params.id

    const tokenUserId = request.userId;

    const {password, avatar, ...inputs} = request.body

    if(id !== tokenUserId){
        return response.status(403).json({ message: "Not Authorized" })
    }

    let updatedPassword = null;

    try{

        if(password){
            updatedPassword = await bcrypt.hash(password, 10)
        }

        const updateUser = await prisma.user.update({
            where: {id},
            data: {
                ...inputs,
                ...(updatedPassword && {password: updatedPassword}),
                ...(avatar && {avatar})
            }
        })

        response.status(200).json(updateUser)

    }catch(error){
        console.log(error)
        response.status(500).json({ message: "Failed to update user" })
    }

}

export const deleteUser = async (request, response) => {


    const id = request.params.id

    const tokenUserId = request.userId

    if(id !== tokenUserId){
        return response.status(403).json({ message: "Not Authorized" })
    }

    try{

        await prisma.user.delete({
            where: {id}
        })

        response.status(200).json({ message: "user Deleted" })

    }catch(error){
        console.log(error)
        response.status(500).json({ message: "Failed to delete user" })
    }

}