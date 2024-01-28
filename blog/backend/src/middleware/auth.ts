import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const secretkey: string = "sumitrawat"
const auth = async (request: Request, response: Response, next: NextFunction) => {

    const bearer = request.headers["authorization"]
    if (bearer == undefined) {
        return response.status(200).json(
            {
                msg: "no token"
            }
        )

    }
    else {
        const token = bearer.split(" ")[1]
        console.log(token)
        if (token) {
            try {
                const verify = jwt.verify(token, secretkey)
                console.log(verify)
                if (verify) {
                    next()
                }
                else {
                    return response.status(200).json(
                        {
                            msg: "unauthorised"
                        }
                    )
                }
            } catch (error) {
              

                return response.status(500).json(
                    {
                        message: error,


                    }
                )

            }
        }
        else {
            return response.status(200).json(
                {
                    msg: "no tokken again"
                }
            )
        }
    }

}
export default auth