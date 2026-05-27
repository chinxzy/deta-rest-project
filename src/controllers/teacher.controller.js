const db = require('../models/index.js');
const { Op } = require('sequelize');
const Teacher = db.rest.models.teacher


//get all teachers
const getAllTeachers = async (req, res) => {
    const gender = req.query.gender
    const query = req.query.query

    const allTeachers = await Teacher.findAll({
        attributes: [
            'teacherId',
            'teacher_firstname',
            'teacher_lastname',
            'gender',
            'email',
            'phone'
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
    if (query) {
        const queriedData = await Teacher.findAll({
            where: {
                [Op.or]: [
                    { phone: { [Op.iLike]: `%${query}%` } },
                    { teacher_firstname: { [Op.iLike]: `%${query}%` } },
                    { teacher_lastname: { [Op.iLike]: `%${query}%` } },
                    { email: { [Op.iLike]: `%${query}%` } },
                ]
            }
        })
        return res.send({ "teachers": queriedData })
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

const getTeacher = async (req, res) => {
    const teacherId = req.params.id;
    console.log(teacherId)

    const user = await Teacher.findOne({

        where: {
            teacherId,

        },
        attributes: [
            'teacherId',
            'teacher_firstname',
            'teacher_lastname',
            'gender',
            'email',
            'phone'
        ]
    });

    if (!user) {
        return res.status(400).send({
            message: `No user found with the id ${teacherId}`,
        });
    }

    return res.send(user);
};
const createTeacher = async (req, res) => {
    const { teacher_firstname, teacher_lastname, gender, email, phone } = req.body;
    if (!teacher_firstname || !teacher_lastname || !gender || !email || !phone) {
        return res.status(400).send({
            message: 'Please provide all fields to create a teacher entry!',
        });
    }

    try {
        let newTeacher = await Teacher.create({
            teacher_firstname,
            teacher_lastname,
            gender,
            email,
            phone
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
module.exports = { getAllTeachers, getTeacher, createTeacher };

