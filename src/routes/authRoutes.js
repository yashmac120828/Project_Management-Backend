import {Router} from "express"
import {changeCurrentPassword, forgotPasswordRequest, getCurrentUser, logoutUser, refreshAccessToken, registerUser, resendEmailVerification, resetForgotPassword, verifyEmail} from "../controllers/authControllers.js"
import { validate } from "../middlewares/validatorMiddleware.js"
import {userChangedCurrentPasswordValidator, userForgotPasswordValidator, userLoginValidator, userRegisterValidator, userResetForgotPasswordValidator} from "../validators/validator.js"
import { login } from "../controllers/authControllers.js"
import { verifyJWT } from "../middlewares/authMiddleware.js"


const router  = Router()

//unsecured route
router.route("/register").post(userRegisterValidator(),validate,registerUser)
router.route("/login").post(userLoginValidator(),validate,login)
router.route("/verify-email/:verificationToken").get(verifyEmail)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/forgot-password").post(userForgotPasswordValidator(),validate,forgotPasswordRequest)
router.route("/reset-password/:resetToken").post(userResetForgotPasswordValidator(),validate,resetForgotPassword)

//secure routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/current-user").post(verifyJWT,getCurrentUser)
router.route("/change-password").post(verifyJWT,userChangedCurrentPasswordValidator(),validate,changeCurrentPassword)
router.route("/resend-email-verification").post(verifyJWT,resendEmailVerification)


export default router;