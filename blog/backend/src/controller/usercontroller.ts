import User from "../model/User";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
const saltround: number = 10
const secretkey: string = "sumitrawat"
const register = async (request: Request, response: Response): Promise<Response> => {
    try {
        interface userinfo {
            FirstName: string;
            LastName: string;
            Email: string;
            Password: string
            Confirmpassword: string,
            DOB: string
        }
        const { FirstName, LastName, Email, Password, Confirmpassword, DOB }: userinfo = request.body;


        const requiredFields = ['FirstName', 'LastName', 'Email', 'Password', 'Confirmpassword', 'DOB'];
        console.log(requiredFields)


        const missingFields = requiredFields.filter(field => !request.body[field]);

        if (missingFields.length > 0) {

            return response.status(200).json({ msg: `fields missing: ${missingFields.join(', ')}` });
        }
        else {
            const Checking_email = await User.findOne({ Email: Email })
            if (Checking_email) {
                return response.status(200).json(
                    {
                        msg: "user email is already register"
                    }
                )

            }
            if (Password === Confirmpassword) {
                const hashpassword = bcrypt.hashSync(Password, saltround)

                const userdata = await User.create(
                    {
                        FirstName: FirstName,
                        LastName: LastName,
                        Email: Email,
                        Password: hashpassword,

                        DOB: DOB


                    }
                )
                return response.status(200).json(
                    {
                        msg: "user is register",
                        user: userdata
                    }
                )



            }
            else {
                return response.status(200).json(
                    {
                        msg: "password and Confirm passwordis not match"
                    }
                )
            }
        }

    } catch (error) {
        return response.status(500).json(
            {
                msg: error
            }
        )

    }

}

const login = async (request: Request, response: Response): Promise<Response> => {
    try {
        interface userinfo {
            Email: string,
            Password: string
        }

        const { Email, Password }: userinfo = request.body
        const requiredfield=["Email","Password"]
        
        const missingFields = requiredfield.filter(field => !request.body[field]); 
        if (missingFields.length > 0) {

            return response.status(200).json({ msg: `fields missing: ${missingFields.join(', ')}` });
        }
        else {

       
        const check_emal = await User.findOne({ Email: Email })
        if (!check_emal) {
            return response.status(200).json(
                {
                    msg: "email id not exist"
                }
            )

        }
        else {
            const compare = bcrypt.compareSync(Password, check_emal.Password)
            const id = check_emal._id;
            if (!compare) {
                return response.status(200).json(
                    {
                        msg: "user password is not match"
                    }
                )

            }
            else {
                const token =  jwt.sign({ Email: Email }, secretkey, {
                    expiresIn: "21 days",
                });
                return response.status(200).json(
                    {
                        msg: "user is login",
                        Email: Email,
                        Password: Password,
                        tokken: token,
                        userid: id,
                        login: true
                    }
                )
            }

        } }

    } catch (error) {
        return response.status(500).json(
            {
                msg: error
            }
        )


    }
}
const home = async (request: Request, response: Response): Promise<Response> => {
    return response.status(200).json(
        {
            msg: "welcome "
        }
    )
}

export default { register, login, home }