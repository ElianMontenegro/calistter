import { Router } from "express";
import multer  from '../libs/multer';
import { postController } from "../controllers/postController";
import passport from 'passport';

const router = Router();


/**
 * @swagger
 * components:
 *  schemas:
 *    Post:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: the auto-generated id of post
 *        commet:
 *          type: string
 *          description: in this field will be the text of post
 *        imagePath:
 *          type: string
 *          format: binary 
 *        user: 
 *          type: object
 *          description: here will be user craeted post
 *      requered:
 *        - commet 
 *      example:
 *        id: 60dfaae57b28491b1cf0b38b
 *        commet: this is a post
 *        image: uploads\bae32cfa-d29f-4525-bac4-078b2d145ffb.png
 *        user: 60de057afd320b2b9c96da99
 *  
 *  securitySchemes:
 *   cookieAuth:
 *     type: apikey
 *     in: cookie
 *     name: JSESSIONID
 *  responses:
 *   UnauthorizedError:
 *     description: Access token is missing or invalid
 *   404:
 *     description: A post with the specified ID was not found.
 * 
 *  parameters:
 *      postId:
 *          in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: the post id
 *     
 *      
 *              
 */ 


/**
 * @swagger
 * tags:
 *  name: Posts
 *  description: Posts endpoint
 */


/**
 * @swagger
 * /api/post:
 *  post:
 *    summary: create a new post
 *    security:
 *      - bearerAuth: []
 *    tags: [Posts]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Post'  
 *    responses:
 *      201:
 *        description: the post succesfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      400:
 *        description: bad request
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */


router.route('/')
    .post(passport.authenticate('jwt', {session: false}),multer.single('imagePath'), postController.create)
    


/**
 * @swagger
 * /api/post/{id}:
 *  delete:
 *      summary: delete a post by id
 *      tags: [Posts]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - $ref: '#/components/parameters/postId'
 *      responses:
 *          '204':
 *              description: success delete , dont return any body
 *          '404':
 *              $ref: '#/components/responses/404'
 *         
 */


router.route('/:id')
    .delete(passport.authenticate('jwt', {session: false}), postController.delete)

export default module.exports = router;