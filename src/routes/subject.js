

const { Router } = require('express');
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
 *         - code
 *       properties:
 *         subject_name:
 *           type: string
 *           description: The name of the subject
 *         code:
 *           type: string
 *           description: The code of the subject
 *         classtypeId:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *           description: Array of classtype IDs to link to the subject
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
 *         description: The class type to filter subjects
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items per page
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
 * /subject/update/{subjectId}:
 *   put:
 *     tags:
 *       - subject
 *     summary: Update a subject entry
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/subject'
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *       404:
 *         description: Subject not found
 *       500:
 *         description: Some server error
 * 
 */

router.get('/', subject.getAllSubjects)

router.get('/:id', subject.getSubject);

router.post('/createSubject', subject.createSubject);

router.put('/update/:id', subject.updateSubject);

// router.post('/delete', user.deleteUser);

// router.post('/update/:id', user.updateUser);

module.exports = router;


