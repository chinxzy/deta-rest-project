

import { Router } from 'express';
// const auth = require('../utils/isAuthenticated');


const subject = require('../controllers/subject.controller.js');
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     subject:
 *       type: object
 *       required:
 *         - subjectId
 *         - subject_name
 *         - classtype
 *         
 *       properties:
 *         subject_name:
 *           type: string
 *           description: The  name of the subject
 *         classtype:
 *           type: string
 *           description: The subject's associated classtype
 *         
 *       
 */
/**
 * @swagger
 * /subject:
 *   get:
 *     parameters:
 *       - in: query
 *         name: classtype
 *         schema:
 *           type: string
 *         description: gets specific classtype
 *     summary: gets all subjects
 *     tags:
 *       - subject
 *     responses:
 *        200:
 *          description: the list of subjects
 *          content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                   $ref: '#/components/schemas/subject'
 *
 * /subject/{subjectId}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: subjectId
 *     summary: gets single subject
 *     tags:
 *       - subject
 *     responses:
 *        200:
 *          description: single entry of subjects
 *          content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                   $ref: '#/components/schemas/subject'
 * 
 * /subject/createSubject:
 *   post:
 *     tags:
 *       - subject
 *     summary: Create a new subject entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/subject'
 *     responses:
 *       200:
 *         description: The created subject entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/subject'
 *       500:
 *         description: Some server error
 * 
 */

router.get('/', subject.getAllSubjects)

router.get('/:id', subject.getSubject);

router.post('/createSubject', subject.createSubject);

// router.post('/delete', user.deleteUser);

// router.post('/update/:id', user.updateUser);

export default router;
