

import { Router } from 'express';
// const auth = require('../utils/isAuthenticated');


const classname = require('../controllers/classname.controller.js');
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     classname:
 *       type: object
 *       required:
 *         - classnameId
 *         - classname
 *         - teacher_firstname
 *         - teacher_lastname
 *         
 *       properties:
 *         classname:
 *           type: string
 *           description: The name of the class
 *         teacher_firstname:
 *           type: string
 *           description: The first name of the class teacher
 *         teacher_lastname:
 *           type: string
 *           description: The last name of the class teacher
 * 
 *     classnamePost:  
 *       type: object
 *       required:
 *         - classname
 *         - teacherId
 *       properties:
 *         classname:
 *           type: string
 *           description: The name of the class
 *         teacherId:
 *           type: integer
 *           description: The Id of the class teacher
 */
/**
 * @swagger
 * /class:
 *   get:
 *     summary: gets all classes
 *     tags:
 *       - classname
 *     responses:
 *        200:
 *          description: the list of classes
 *          content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                   $ref: '#/components/schemas/classname'
 *
 * /class/{classnameId}:
 *   get:
 *     summary: gets single class
 *     tags:
 *       - classname
 *     responses:
 *        200:
 *          description: single entry of classes
 *          content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                   $ref: '#/components/schemas/classname'
 * 
 * /class/createClass:
 *   post:
 *     summary: Create a new class entry
 *     tags:
 *       - classname
 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/classnamePost'
 *     responses:
 *       200:
 *         description: The created class entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/classnamePost'
 *       500:
 *         description: Some server error
 * 
 */

router.get('/', classname.getAllClassname)

router.get('/:id', classname.getClass);

router.post('/createClass', classname.createClass);

// router.post('/delete', user.deleteUser);

// router.post('/update/:id', user.updateUser);

export default router;
