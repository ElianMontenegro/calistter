import {Router} from "express";
import { userController } from "../controllers/userController";
const router: Router = Router();


router.get("/register", userController.register)
router.post("/register", userController.register)

router.get("/login", userController.login)
router.post("/login", userController.login)


module.exports = router;
