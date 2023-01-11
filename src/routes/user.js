

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
 *         -  classtype
 *         -  teacher_firstname
 *         -  teacher_lastname
 *       properties:
 *         studentId:
 *           type: string
 *           description: The auto-generated id of the student
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
 *         classtype:
 *           type: string
 *           description: The student's class type
 *         teacher_firstname:
 *           type: string
 *           description: The first name of the teacher of the student
 *         teacher_lastname:
 *           type: string
 *           description: The last name of the teacher of the student
 *       
 */
/**
 * @swagger
 * /user:
 *   get:
 *     summary: gets all students
 *     responses:
 *        200:
 *          description: the list of students
 *          content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                   $ref: '#/components/schemas/student'
 */

router.get('/', user.getAllUsers)

router.get('/:id', user.getUser);

// router.post('/createUser', user.createUser);

// router.post('/delete', user.deleteUser);

// router.post('/update/:id', user.updateUser);

export default router;
