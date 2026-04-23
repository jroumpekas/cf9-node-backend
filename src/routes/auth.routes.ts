import { Router } from 'express';
import * as authCtrl from '../controller/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /auth/login:
 *  post:
 *    summary: User Login
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *    responses:
 *      200:
 *        description: User logged in 
 */
router.post('/login', authCtrl.login);

router.get('/me', authenticate, (req, res) => {
  return res.status(200).json({
    message: 'Protected route works',
  });
});

export default router;