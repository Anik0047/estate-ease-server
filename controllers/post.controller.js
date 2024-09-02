import prisma from "../lib/prisma.js"

export const getPosts = async (request, response) => {

    try{

        const posts = await prisma.post.findMany()

        response.status(200).json(posts)

    }catch(error){

        console.log(error)

        response.status(500).json({ message: "Failed to get posts" })

    }

}


export const getPost = async (request, response) => {

    const id = request.params.id

    try{

        const post = await prisma.post.findUnique({
            where:{id},
            include: {
                postDetail: true,
                user: {
                    select:{
                        username: true,
                        avatar: true
                    }
                }
            }
        })

        response.status(200).json(post)

    }catch(error){

        console.log(error)

        response.status(500).json({ message: "Failed to get post" })

    }

}

export const addPost = async (request, response) => {

    const body = request.body

    const tokenUserId = request.userId

    try{

        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail:{
                    create: body.postDetail
                }
            }
        })

        response.status(200).json(newPost)

    }catch(error){

        console.log(error)

        response.status(500).json({ message: "Failed to create post" })

    }

}


export const updatePost = async (request, response) => {

    try{

        response.status(200).json()

    }catch(error){

        console.log(error)

        response.status(500).json({ message: "Failed to update post" })

    }

}


export const deletePosts = async (request, response) => {

    const id = request.params.id

    const tokenUserId = request.userId

    try{

        const post = await prisma.post.findUnique({
            where:{id}
        })

        if(post.userId !== tokenUserId) {
            return response.status(403).json({ message: "Not Authorized" })
        }

        await prisma.post.delete({
            where:{id}
        })

        response.status(200).json({ message: "Post Deleted" })

    }catch(error){

        console.log(error)

        response.status(500).json({ message: "Failed to delete post" })

    }

}