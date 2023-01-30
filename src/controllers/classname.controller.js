const db = require('../models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const Classname = db.rest.models.classname
const Teacher = db.rest.models.teacher

//get all classes
exports.getAllClassname = async (req, res) => {

    const allClassname = await Classname.findAll({
        //include teacher model
        include: {
            model: Teacher, attributes: [],
        },
        attributes: [],
        attributes: [
            'classnameId',
            'classname',
            [Sequelize.col("teacher.teacher_firstname"), "teacher_firstname"],
            [Sequelize.col("teacher.teacher_lastname"), "teacher_lastname"],
        ]
    })


    if (!allClassname) {
        return res.status(404).send({
            message: "No classes found"
        })
    }
    return res.send({ "classes": allClassname })
}

//get single class

exports.getClass = async (req, res) => {
    const classnameId = req.params.id;

    const classname = await Classname.findOne({

        where: {
            classnameId,

        },
        include: {
            model: Teacher, attributes: [],
      
          },
        attributes: [],
        attributes: [
            'classnameId',
            'classname',
            [Sequelize.col("teacher.teacher_firstname"), "teacher_firstname"],
            [Sequelize.col("teacher.teacher_lastname"), "teacher_lastname"],
        ]
    });

    if (!classname) {
        return res.status(400).send({
            message: `No class found with the id ${classnameId}`,
        });
    }

    return res.send({ "class": classname });
};

// add new class entry
exports.createClass = async (req, res) => {
    const { classname, teacherId } = req.body;
    if (!classname || !teacherId) {
        return res.status(400).send({
            message: 'Please provide all fields to create a class entry!',
        });
    }

    try {
        let newClass = await Classname.create({
            classname,
            teacherId,
        });
        return res.send(newClass);
    } catch (err) {
        if (err.message == 'Validation error') {
            return res.status(500).send({
                message: "one or two of the records already exist"
            })
        } else{
            return res.status(500).send({
            message: `Error: ${err.message}`,
        });
        }
        
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
