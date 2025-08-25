import { body } from "express-validator";


const userRegisterValidator = ()=>{
    return [
        body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),

        body("username")
        .trim()
        .notEmpty()
        .withMessage("username is required")
        .isLowercase("username must be in lowercase")
        .isLength({min:3})
        .withMessage("Username must be atleast 3 characters long"),


        body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required"),

        body("fullName")
        .optional()
        .trim()
        



        
    ]
}

const userLoginValidator = ()=>{
    return [
        body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Email is invalid"),

        body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")

    ]
}

const userChangedCurrentPasswordValidator = ()=>{
    return [
        body("oldPassword")
        .notEmpty()
        .withMessage("old password is required"),

        body("newPassword")
        .notEmpty()
        .withMessage("new password is required")
    ]
}

const userForgotPasswordValidator = ()=>{
    return [
        body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid")
    ]
}

const userResetForgotPasswordValidator = ()=>{
    return [
        body("newPassword")
            .notEmpty()
            .withMessage("password is required")
        
    ]
}



export {userRegisterValidator,userLoginValidator,userChangedCurrentPasswordValidator,userForgotPasswordValidator,userResetForgotPasswordValidator}