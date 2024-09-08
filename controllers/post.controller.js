import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken";

export const getPosts = async (request, response) => {

    const query = request.query
    try{

        const posts = await prisma.post.findMany({
            where: {
                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                  gte: parseInt(query.minPrice) || 0,
                  lte: parseInt(query.maxPrice) || 100000000,
                },
              },
        })

        response.status(200).json(posts)

    }catch(error){

        console.log(error)

        response.status(500).json({ message: "Failed to get posts" })

    }

}


export const getPost = async (request, response) => {
    const id = request.params.id;

    try {
        // Find the post
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                postDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    },
                },
            },
        });

        // Check if the post exists
        // if (!post) {
        //     return response.status(404).json({ message: "Post not found" });
        // }

        // Retrieve the token from cookies
        const token = request.cookies?.token;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
                if (err) {
                    return response.status(401).json({ message: "Invalid token" });
                }

                // Find saved post for the authenticated user
                const saved = await prisma.savedPost.findUnique({
                    where: {
                        userId_postId: {
                            postId: id,
                            userId: payload.id,
                        },
                    },
                });

                // Respond with post data and whether it's saved by the user
                response.status(200).json({ ...post, isSaved: saved ? true : false });

            });
        } else {
            // If no token is provided, respond without saved status
            return response.status(200).json({ ...post, isSaved: false });
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Failed to get post" });
    }
};


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

        response.status(500).json({ message: "Failed to Delete Post" })

    }

}