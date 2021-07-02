import {Router} from "express";
import { userController } from "../controllers/userController";
const router: Router = Router();

import passport from 'passport'

// router.get("/register", userController.register)
router.post("/register", userController.register)

// router.get("/login", userController.login)
router.post("/login", userController.login)

router.get("/home", passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('success')
})

router.get('/google', passport.authenticate('google',{ scope:[ 'email', 'profile' ]}));
router.get('/google/callback', passport.authenticate( 'google', {failureRedirect: '/auth/google/failure'}),
    function(req ,res){
        res.send("anda padre")
    }
);

export default module.exports = router;
