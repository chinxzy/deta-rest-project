

import { Router } from 'express';
// const auth = require('../utils/isAuthenticated');


const subType = require('../controllers/subject_classtype.controller');
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     subject-classtype:
 *       type: object
 *       required:
 *         - id
 *         - subject_name
 *         - classtype_name
 *         
 *       properties:
 *         subject_name:
 *           type: string
 *           description: The name of the subject
 *         classtype_name:
 *           type: string
 *           description: The subject's classtype
 * 
 *     subject-classtypePost:  
 *       type: object
 *       required:
 *         - subjectId
 *         - classtypeId
 *       properties:
 *         subjectId:
 *           type: integer
 *           description: The id of the subject
 *         classtypeId:
 *           type: integer
 *           description: The Id of the classtype
 */
/**
 * @swagger
 * /subtype:
 *   get:
 *     parameters:
 *       - in: query
 *         name: subjectId
 *         schema:
 *           type: integer
 *         description: gets specific classtype which offer the subject
 * 
 *       - in: query
 *         name: classtypeId
 *         schema:
 *           type: integer
 *         description: gets specific subjects under the classtypes
 * 
 *     summary: gets all subject and their classtypes
 *     tags:
 *       - subject_classtype
 *     responses:
 *        200:
 *          description: the list of classes
 *          content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                   $ref: '#/components/schemas/subject-classtype'
 *
 * 
 * /subtype/createSubtype:
 *   post:
 *     summary: links a subject to classtype
 *     tags:
 *       - subject_classtype
 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/subject-classtypePost'
 *     responses:
 *       200:
 *         description: The created class entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/subject-classtypePost'
 *       500:
 *         description: Some server error
 * 
 */

router.get('/', subType.getAllSubType)

// router.get('/:id', classname.getClass);

router.post('/createSubtype', subType.createSubType);

// router.post('/delete', user.deleteUser);

// router.post('/update/:id', user.updateUser);

export default router;
