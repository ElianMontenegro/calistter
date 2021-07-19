import { Router } from "express";
import { userController } from "../controllers/userController";
const router: Router = Router();

import passport from "passport";

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     token:
 *       type: object
 *       properties:
 *        token:
 *          type: string
 *          format: byte 
 *          description: JWT
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         role:
 *           type: string
 *           enum:
 *              - user
 *              - admin
 *         password:
 *           type: string
 *           format: password
 *         phone:
 *           type: number
 *         posts:
 *           type: string
 *           description: in this field will be the id post
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       requered:
 *         - password
 *         - email
 *         - username
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *  name: Aouth
 *  description: endpoint Aouth
 */

/**
 * @swagger
 * /api/register:
 *  post: 
 *    summary: here you can register
 *    Authorization: Bearer <token>
 *    securyty:
 *      $ref: '#components/securitySchemes/bearerAuth'
 *    tags: [Aouth]
 *    requestBody:
 *      description: if you want register, write unsername, email and password
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username: 
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *    responses:
 *      '201':
 *        description: return the jwt created
 *        content:  
 *             application/json:
 *                 schema:
 *                     $ref: '#/components/schemas/token'
 *                 example:
 *                     token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGUwNTdhZmQzMjBiMmI5Yzk2ZGE5OSIsImVtYWlsIjoiZWxpYW5tb250ZW5lZ3JvNDkxQGdtYWlsLmNvbSIsImlhdCI6MTYyNjEyMTQzOCwiZXhwIjoxNjI2MjA3ODM4fQ.AgmSJFEbQYZPUAhqJkz03ii1LvQ6dF2P07fcqOX5MWI
 *      '400': 
 *        description: return some problem with fields
 *      '500': 
 *        description: return Internal Server Error
 *      
 */

router.route("/api/register").post(userController.register);

/**
 * @swagger
 *  /api/login:
 *   post:
 *     summary: here you can login and authenticate with a JWT
 *     securyty:
 *       $ref: '#components/securitySchemes/bearerAuth'
 *     tags: [Aouth]
 *     requestBody:
 *      description: if you want login, write password an email
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *     responses:
 *      '200':
 *         description: return the jwt created
 *         content:  
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/token'
 *                  example:
 *                      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGUwNTdhZmQzMjBiMmI5Yzk2ZGE5OSIsImVtYWlsIjoiZWxpYW5tb250ZW5lZ3JvNDkxQGdtYWlsLmNvbSIsImlhdCI6MTYyNjEyMTQzOCwiZXhwIjoxNjI2MjA3ODM4fQ.AgmSJFEbQYZPUAhqJkz03ii1LvQ6dF2P07fcqOX5MWI
 *      '400':
 *         description: return bad request because the fields are empty
 *      '404':
 *         description: return user not found
 *      '500':
 *         description: server error
 *      
 *     
 */

router.route("/api/login").post(userController.login);


router.post('/api/refreshToken', userController.refreshToken);

router.get(
  "/home",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("success");
  }
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google/failure" }),
  function (req, res) {
    res.send("anda padre");
  }
);

export default module.exports = router;
