import jwt from "jsonwebtoken"

export const verifyToken = (request, response, next) => {

    const token = request.cookies.token

    if(!token) return response.status(401).json({ message: "Not Authenticated!" })

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
        if(error) return response.status(403).json({ message: "Token is not Valid!" })

            request.userId = payload.id;
    
        next();
    })


}