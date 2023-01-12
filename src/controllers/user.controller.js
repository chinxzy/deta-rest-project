const db = require('../models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const User = db.rest.models.student;
const Teacher = db.rest.models.teacher

//get all students
exports.getAllUsers = async (req, res) => {
  const gender = req.query.gender

  const allUsers = await User.findAll({
    include: {
      model: Teacher, attributes: [],

    },
    attributes: [],
    attributes: [
      'firstname',
      'lastname',
      'gender',
      'classname',
      'classtype',
      [Sequelize.col("teacher.teacher_firstname"), "teacher_firstname"],
      [Sequelize.col("teacher.teacher_lastname"), "teacher_lastname"],

    ]
  })

  if (gender) {
    const genderUser = await User.findAll({
      where: {
        gender: {
          [Op.iLike]: gender
        }

      },
      include: {
        model: Teacher, attributes: [],

      },
      attributes: [],
      attributes: [
        'firstname',
        'lastname',
        'gender',
        'classname',
        'classtype',
        [Sequelize.col("teacher.teacher_firstname"), "teacher_firstname"],
        [Sequelize.col("teacher.teacher_lastname"), "teacher_lastname"],

      ]
    })
    return res.send({ "users": genderUser })
  }
  console.log(req.query)

  if (!allUsers) {
    return res.status(404).send({
      message: "No users found"
    })
  }
  return res.send({ "users": allUsers })
}


//get single student

exports.getUser = async (req, res) => {
  const studentId = req.params.id;
  console.log(studentId)

  const user = await User.findOne({

    where: {
      studentId: {
        [Op.eq]: studentId
      }

    },
    include: {
      model: Teacher, attributes: [],

    },
    attributes: [],
    attributes: [
      'firstname',
      'lastname',
      'gender',
      'classname',
      'classtype',
      [Sequelize.col("teacher.teacher_firstname"), "teacher_firstname"],
      [Sequelize.col("teacher.teacher_lastname"), "teacher_lastname"],

    ]
  });

  if (!user) {
    return res.status(400).send({
      message: `No user found with the id ${studentId}`,
    });
  }

  return res.send(user);
};

//create student

exports.createUser = async (req, res) => {
  const { firstname, lastname, gender, classtype, classname, teacherId } = req.body;
  if (!firstname || !lastname || !gender || !classtype || !classname || !teacherId) {
    return res.status(400).send({
      message: 'Please provide all fields to create a student entry!',
    });
  }

  try {
    let newUser = await User.create({
      firstname,
      lastname,
      gender,
      classtype,
      classname,
      teacherId
    });
    return res.send(newUser);
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
