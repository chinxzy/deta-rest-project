const db = require('../models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const Admin = db.rest.models.admin
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//register admin
exports.registerAdmin = async (req, res) => {
    try {
        //get admin input

        const { admin_firstname, admin_lastname, admin_email, password, gender, role } = req.body

        //validate admin input

        if (!admin_firstname && !admin_lastname && !admin_email && !password &&
            !gender && !role) {
            res.status(400).send("All input is required");
        }

        //check if admin already exist

        const adminExist = await Admin.findOne({
            where: {
                admin_email: {
                    [Op.iLike]: admin_email
                }
            }
        });

        if (adminExist) {
            return res.status(419).send("Admin already exist with this credential. please login");

        }

        //Encrypt admin password

        const encryptedPassword = await bcrypt.hash(password, 10);

        //create admin

        const admin = await Admin.create({
            admin_firstname,
            admin_lastname,
            admin_email,
            password: encryptedPassword,
            gender,
            role
        });
        res.status(201).json({
            status: 'success',
            message: 'Admin Registered',
            data: {
                user: {
                    email: admin.admin_email,
                    role: admin.role
                }
            }
        })


        return res.send(admin)
    } catch (error) {
        console.log(error)
    }
}

//admin login

exports.adminLogin = async (req, res) => {
    try {
        const { admin_email, password } = req.body;

        //validate input

        if (!admin_email || !password) {
            res.status(400).send("All input is required")
        }

        //check is user exist
        const AdminUser = await Admin.findOne({
            where: {
                admin_email: {
                    [Op.iLike]: admin_email
                }
            }
        });

        if (!AdminUser) {
            res.status(419).send("User with these credential doesn't exist")
        } else if (await bcrypt.compare(password, AdminUser.password)) {
            const tokenPayLoad = {
                email: AdminUser.admin_email,
                role: AdminUser.role
            };

            const accessToken = jwt.sign(tokenPayLoad, process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                });
            res.status(201).json({
                accessToken
            });
        } else {
            res.status(419).send("Wrong password")
        }
    }
    catch (error) {
        console.log(error)
    }
}

//get all admins
exports.getAllAdmins = async (req, res) => {
    const role = req.query.role

    const allAdmins = await Admin.findAll({
        attributes: [],
        attributes: [
            'adminId',
            'admin_firstname',
            'admin_lastname',
            'role',
            'admin_email',
        ]
    })

    if (role) {
        const roleUser = await Admin.findAll({
            where: {
                role: {
                    [Op.iLike]: role
                }
            }
        })
        return res.send({ "admins": roleUser })
    }
    console.log(req.query)

    if (!allAdmins) {
        return res.status(404).send({
            message: "No Admins found"
        })
    }
    return res.send({ "admins": allAdmins })
}
//get single teacher

// exports.getTeacher = async (req, res) => {
//     const teacherId = req.params.id;
//     console.log(teacherId)

//     const user = await Teacher.findOne({

//         where: {
//             teacherId,

//         },
//         attributes: [],
//         attributes: [
//             'teacherId',
//             'teacher_firstname',
//             'teacher_lastname',
//             'gender',
//             'classname',
//             'classtype',


//         ]
//     });

//     if (!user) {
//         return res.status(400).send({
//             message: `No user found with the id ${teacherId}`,
//         });
//     }

//     return res.send(user);
// };
// exports.createTeacher = async (req, res) => {
//     const { teacher_firstname, teacher_lastname, gender, classtype, classname } = req.body;
//     if (!teacher_firstname || !teacher_firstname || !gender || !classtype || !classname) {
//         return res.status(400).send({
//             message: 'Please provide all fields to create a teacher entry!',
//         });
//     }

//     let classnameExists = await Teacher.findOne({
//         where: {
//             classname: {
//                 [Op.iLike]: classname
//             },
//         }
//     });

//     if (classnameExists) {
//         return res.status(400).send({
//             message: 'A teacher is already associated with specified class',
//         });
//     }

//     try {
//         let newTeacher = await Teacher.create({
//             teacher_firstname,
//             teacher_lastname,
//             gender,
//             classname,
//             classtype
//         });
//         return res.send(newTeacher);
//     } catch (err) {
//         return res.status(500).send({
//             message: `Error: ${err.message}`,
//         });
//     }
// };

// exports.deleteUser = async (req, res) => {
//   const { id } = req.body;
//   if (!id) {
//     return res.status(400).send({
//       message: 'Please provide a id for the user you are trying to delete!',
//     });
//   }

//   const user = await User.findOne({
//     where: {
//       id,
//     },
//   });

//   if (!user) {
//     return res.status(400).send({
//       message: `No user found with the id ${id}`,
//     });
//   }

//   try {
//     await user.destroy();
//     return res.send({
//       message: `User ${id} has been deleted!`,
//     });
//   } catch (err) {
//     return res.status(500).send({
//       message: `Error: ${err.message}`,
//     });
//   }
// };

// exports.updateUser = async (req, res) => {
//   const { username, password } = req.body;
//   const { id } = req.params;

//   const user = await User.findOne({
//     where: {
//       id,
//     },
//   });

//   if (!user) {
//     return res.status(400).send({
//       message: `No user found with the id ${id}`,
//     });
//   }

//   try {
//     if (username) {
//       user.username = username;
//     }
//     if (password) {
//       user.password = password;
//     }

//     user.save();
//     return res.send({
//       message: `User ${id} has been updated!`,
//     });
//   } catch (err) {
//     return res.status(500).send({
//       message: `Error: ${err.message}`,
//     });
//   }
// };
