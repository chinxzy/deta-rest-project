

import { Router } from 'express';
// import { isAuthenticated } from './utils/isAuthenticated';

const user = require('../controllers/user.controller.js');
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     student:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - gender
 *         - classname
 *         - teacher_firstname
 *         - teacher_lastname
 *         - classtype
 *       properties:
 *         firstname:
 *           type: string
 *           description: The first name of the student
 *         lastname:
 *           type: string
 *           description: The last name of the student
 *         gender:
 *           type: string
 *           description: The gender of the student
 *         classname:
 *           type: string
 *           description: the name of the student's class
 *         teacher_firstname:
 *           type: string
 *           description: The student's class teacher's firstname
 *         teacher_lastname:
 *           type: string
 *           description: The student's class teacher's lastname
 *         classtype:
 *           type: string
 *           description: The classtype of the student
 * 
 *     studentPost:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - gender
 *         - classnameId
 *       properties:
 *         firstname:
 *           type: string
 *           description: The first name of the student
 *         lastname:
 *           type: string
 *           description: The last name of the student
 *         gender:
 *           type: string
 *           description: The gender of the student
 *         classnameId:
 *           type: integer
 *           description: the id of the student's class
 *         
 */
/**
 * @swagger
 * /user:
 *   get:
 *     summary: gets all students
 *     tags:
 *       - student
 *     responses:
 *        200:
 *          description: the list of students
 *          content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                   $ref: '#/components/schemas/student'
 * 
 * /user/{studentId}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: studentId
 *     summary: gets single student
 *     tags:
 *       - student
 *     responses:
 *        200:
 *          description: single entry of students
 *          content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                   $ref: '#/components/schemas/student'
 * 
 * /user/createUser:
 *   post:
 *     summary: Create a new student entry
 *     tags:
 *       - student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/studentPost'
 *     responses:
 *       200:
 *         description: The created student entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/studentPost'
 *       500:
 *         description: Some server error
 */

router.get('/', user.getAllUsers)

router.get('/:id', user.getUser);

router.post('/createUser', user.createUser);

// router.post('/delete', user.deleteUser);

// router.post('/update/:id', user.updateUser);

export default router;
