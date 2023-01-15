const db = require('../models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const Subject = db.rest.models.subject


//get all subjects
exports.getAllSubjects = async (req, res) => {
    const classtype = req.query.classtype

    const allSubjects = await Subject.findAll({
        attributes: [],
        attributes: [
            'subjectId',
            'subject_name',
            'classtype',


        ]
    })

    if (classtype) {
        const classtypeUser = await Subject.findAll({
            where: {
                classtype: {
                    [Op.iLike]: classtype
                }
            }
        })
        return res.send({ "teachers": classtypeUser })
    }
    console.log(req.query)

    if (!allSubjects) {
        return res.status(404).send({
            message: "No subject found"
        })
    }
    return res.send({ "subjects": allSubjects })
}

//get single subject

exports.getSubject = async (req, res) => {
    const subjectId = req.params.id;

    const subject = await Subject.findOne({

        where: {
            subjectId,

        },
        attributes: [],
        attributes: [
            'subjectId',
            'subject_name',
            'classtype',


        ]
    });

    if (!subject) {
        return res.status(400).send({
            message: `No subject found with the id ${subjectId}`,
        });
    }

    return res.send(subject);
};

//create new subject entry
exports.createSubject = async (req, res) => {
    const { subject_name, classtype } = req.body;
    if (!subject_name || !classtype) {
        return res.status(400).send({
            message: 'Please provide all fields to create a subject entry!',
        });
    }

    let subjectExists = await Subject.findOne({
        where: {
            subject_name: {
                [Op.iLike]: subject_name
            },
        }
    });

    if (subjectExists) {
        return res.status(400).send({
            message: 'This subject already exists',
        });
    }

    try {
        let newSubject = await Subject.create({
            subject_name,
            classtype,
        });
        return res.send(newSubject);
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
