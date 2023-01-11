

import { Router } from 'express';
// import { isAuthenticated } from './utils/isAuthenticated';

const teacher = require('../controllers/teacher.controller.js');
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     teacher:
 *       type: object
 *       required:
 *         - teacher_firstname
 *         - teacher_lastname
 *         - gender
 *         - classname
 *         - classtype
 *         
 *       properties:
 *         teacher_firstname:
 *           type: string
 *           description: The first name of the teacher of the teacher
 *         teacher_lastname:
 *           type: string
 *           description: The last name of the teacher of the teacher
 *         gender:
 *           type: string
 *           description: The gender of the teacher
 *         classname:
 *           type: string
 *           description: the name of the teacher's class
 *         classtype:
 *           type: string
 *           description: The teacher's class type
 *         
 *       
 */
/**
 * @swagger
 * /teacher:
 *   get:
 *     parameters:
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *         description: gets specific gender
 *     summary: gets all teachers
 *     responses:
 *        200:
 *          description: the list of teachers
 *          content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                   $ref: '#/components/schemas/teacher'
 * 
 * /teacher/createTeacher:
 *   post:
 *     summary: Create a new teacher entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/teacher'
 *     responses:
 *       200:
 *         description: The created teacher entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/teacher'
 *       500:
 *         description: Some server error
 */

router.get('/', teacher.getAllTeachers)

router.get('/:id', teacher.getTeacher);

router.post('/createTeacher', teacher.createTeacher);

// router.post('/delete', user.deleteUser);

// router.post('/update/:id', user.updateUser);

export default router;
