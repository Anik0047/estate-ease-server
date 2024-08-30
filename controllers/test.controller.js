import jwt from "jsonwebtoken"

export const shouldBeLoggedIn = async (request, response) => {

    console.log(request.userId)

    response.status(200).json({ message: "You are Authenticated!" })
    
}

export const shouldBeAdmin = async (request, response) => {

    const token = request.cookies.token

    if(!token) return response.status(401).json({ message: "Not Authenticated!" })

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
        if(error) return response.status(403).json({ message: "Token is not Valid!" })

        if(!payload.isAdmin) {
            return response.status(403).json({ message: "Not Authorized!" })
        }
    })

    response.status(200).json({ message: "You are Authenticated!" })
    
}