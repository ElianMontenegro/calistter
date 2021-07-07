import { Router } from "express";
import multer  from '../libs/multer';
import { postController } from "../controllers/postController";
import passport from 'passport';

const router = Router();
router.route('/create')
    .post(passport.authenticate('jwt', {session: false}),multer.single('image'), postController.create)

export default module.exports = router;