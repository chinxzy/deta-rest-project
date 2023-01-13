

import { Router } from 'express';
const auth = require('../utils/isAuthenticated');

const admin = require('../controllers/admin.controller.js');
const router = Router();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT 
 *   schemas:
 *     admin:
 *       type: object
 *       required:
 *         - adminId
 *         - admin_firstname
 *         - admin_lastname
 *         - gender
 *         - role
 *         - admin_email
 *         
 *       properties:
 *         admin_firstname:
 *           type: string
 *           description: The first name of the admin of the admin
 *         admin_lastname:
 *           type: string
 *           description: The last name of the admin of the admin
 *         gender:
 *           type: string
 *           description: The gender of the admin
 *         role:
 *           type: string
 *           description: the name of the admin's role
 *         admin_email:
 *           type: string
 *           description: The admin's email
 *  
 *     admin-register:
 *       type: object
 *       required:
 *         - adminId
 *         - admin_firstname
 *         - admin_lastname
 *         - gender
 *         - role
 *         - admin_email
 *         - password
 *         
 *       properties:
 *         admin_firstname:
 *           type: string
 *           description: The first name of the admin of the admin
 *         admin_lastname:
 *           type: string
 *           description: The last name of the admin of the admin
 *         gender:
 *           type: string
 *           description: The gender of the admin
 *         role:
 *           type: string
 *           description: the name of the admin's role
 *         admin_email:
 *           type: string
 *           description: The admin's email
 *         password:
 *           type: string
 *           description: The admin's password
 * 
 *     admin-login:
 *       type: object
 *       required:
 *         - admin_email
 *         - password
 *         
 *       properties:
 *         admin_email:
 *           type: string
 *           description: The admin's email
 *         password:
 *           type: string
 *           description: The admin's password
 *         
 *       
 */
/**
 * @swagger
 * /admin:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: gets specific role
 *     tags:
 *       - admin
 *     summary: get all admins
 *     responses:
 *       200:
 *         description: list of admins
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/admin'
 *       500:
 *         description: Some server error
 * /admin/createAdmin:
 *   post:
 *     tags:
 *       - admin
 *     summary: Create a new admin entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/admin-register'
 *     responses:
 *       200:
 *         description: The created admin entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/admin-register'
 *       500:
 *         description: Some server error
 * /admin/login:
 *   post:
 *     tags:
 *       - admin
 *     summary: Create a new admin entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/admin-login'
 *     responses:
 *       200:
 *         description: The created admin entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/admin-login'
 *       500:
 *         description: Some server error
 */

router.get('/', auth, admin.getAllAdmins);

// router.get('/:id', admin.getadmin);

router.post('/createAdmin', admin.registerAdmin);

router.post('/login', admin.adminLogin);

// router.post('/delete', user.deleteUser);

// router.post('/update/:id', user.updateUser);

export default router;
