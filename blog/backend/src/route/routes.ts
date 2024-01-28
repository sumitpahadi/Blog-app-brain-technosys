import { Router } from "express";
import postcontroller from "../controller/postcontroller";
import usercontroller from "../controller/usercontroller";
import auth from "../middleware/auth";
const routes=Router()
routes.post("/register",usercontroller.register)
routes.post("/login",usercontroller.login)
routes.get("/home",auth,usercontroller.home)
routes.post("/posting",postcontroller.posting)
routes.get("/getpost",postcontroller.getpost)
//applly middle ware on these three routes updatepost deletepost getuserpost
routes.put("/updatepost/:id/:postid",postcontroller.updatepost)
routes.delete("/deletpost/:postid",postcontroller.deletepost)
routes.get("/getuserpost/:id",postcontroller.getuserpost)
routes.put("/like/:postid",postcontroller.Like)
routes.put("/dislike/:postid",postcontroller.dislike)
routes.put("/comment/:postid/:userid",postcontroller.commentpost)
routes.get("/user_info/:userid",postcontroller.userinformation)
routes.get("*",postcontroller.errorpage)
export default routes
