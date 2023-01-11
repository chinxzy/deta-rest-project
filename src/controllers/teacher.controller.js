const db = require('../models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const Teacher = db.rest.models.teacher


//get all teachers
exports.getAllTeachers = async (req, res) => {
    const gender = req.query.gender

    const allTeachers = await Teacher.findAll({
        attributes: [],
        attributes: [
            'teacher_firstname',
            'teacher_lastname',
            'gender',
            'classname',
            'classtype',


        ]
    })

    if (gender) {
        const genderUser = await Teacher.findAll({
            where: {
                gender: {
                    [Op.iLike]: gender
                }
            }
        })
        return res.send({ "teachers": genderUser })
    }
    console.log(req.query)

    if (!allTeachers) {
        return res.status(404).send({
            message: "No users found"
        })
    }
    return res.send({ "teachers": allTeachers })
}

//get single teacher

exports.getTeacher = async (req, res) => {
    const teacherId = req.params.id;
    console.log(teacherId)

    const user = await Teacher.findOne({

        where: {
            teacherId,

        },
        attributes: [],
        attributes: [
            'teacher_firstname',
            'teacher_lastname',
            'gender',
            'classname',
            'classtype',


        ]
    });

    if (!user) {
        return res.status(400).send({
            message: `No user found with the id ${teacherId}`,
        });
    }

    return res.send(user);
};
exports.createTeacher = async (req, res) => {
    const { teacher_firstname, teacher_lastname, gender, classtype, classname } = req.body;
    if (!teacher_firstname || !teacher_firstname || !gender || !classtype || !classname) {
        return res.status(400).send({
            message: 'Please provide all fields to create a teacher entry!',
        });
    }

    let classnameExists = await Teacher.findOne({
        where: {
            classname: {
                [Op.iLike]: classname
            },
        }
    });

    if (classnameExists) {
        return res.status(400).send({
            message: 'A teacher is already associated with specified class',
        });
    }

    try {
        let newTeacher = await Teacher.create({
            teacher_firstname,
            teacher_lastname,
            gender,
            classname,
            classtype
        });
        return res.send(newTeacher);
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

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
