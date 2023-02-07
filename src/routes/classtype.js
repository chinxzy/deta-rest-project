

import { Router } from 'express';
// const auth = require('../utils/isAuthenticated');


const classtype = require('../controllers/classtype.controller.js');
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     classtype:
 *       type: object
 *       required:
 *         - classtypeId
 *         - classtype_name
 *         
 *       properties:
 *         classtype_name:
 *           type: string
 *           description: The name of the classtype
 * 
 */
/**
 * @swagger
 * /classtype:
 *   get:
 *     summary: gets all classtype
 *     tags:
 *       - classtype
 *     responses:
 *        200:
 *          description: the list of classtypes
 *          content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                   $ref: '#/components/schemas/classtype'
 *
 * 
 * /classtype/createClasstype:
 *   post:
 *     summary: Create a new classtype entry
 *     tags:
 *       - classtype
 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/classtype'
 *     responses:
 *       200:
 *         description: The created classtype entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/classtype'
 *       500:
 *         description: Some server error
 * 
 */

router.get('/', classtype.getClasstype)

router.post('/createClasstype', classtype.createClasstype);

// router.post('/delete', user.deleteUser);

// router.post('/update/:id', user.updateUser);

export default router;
