const db = require('../models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const User = db.rest.models.student;
const Classname = db.rest.models.classname;
const Teacher = db.rest.models.teacher;
const Classtype = db.rest.models.classtype

//get all students
exports.getAllUsers = async (req, res) => {
  const gender = req.query.gender

  const allUsers = await User.findAll({
    include:[
      {model: Classname, attributes: [],
        include: [{
        model: Teacher,
        attributes: [],
        
      },
      {
        model: Classtype,
        attributes: [],
        
      }]},
      

    ],
    attributes: [],
    attributes: [
      'firstname',
      'lastname',
      'gender',
      [Sequelize.col("classname.classname"), "classname"], 
      [Sequelize.col("classname.teacher.teacher_firstname"), "teacher_firstname"],
      [Sequelize.col("classname.teacher.teacher_lastname"), "teacher_lastname"],
      [Sequelize.col("classname.classtype.classtype_name"), "classtype_name"]

    ]
  })

  // if (gender) {
  //   const genderUser = await User.findAll({
  //     where: {
  //       gender: {
  //         [Op.iLike]: gender
  //       }

  //     },
  //     include: {
  //       model: Teacher, attributes: [],

  //     },
  //     attributes: [],
  //     attributes: [
  //       'firstname',
  //       'lastname',
  //       'gender',
  //       'classname',
  //       'classtype',
  //       [Sequelize.col("teacher.teacher_firstname"), "teacher_firstname"],
  //       [Sequelize.col("teacher.teacher_lastname"), "teacher_lastname"],

  //     ]
  //   })
  //   return res.send({ "users": genderUser })
  // }
  // console.log(req.query)

  if (!allUsers) {
    return res.status(404).send({
      message: "No users found"
    })
  }
  return res.send({ "students": allUsers })
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
    include:[
      {model: Classname, attributes: [],
        include: [{
        model: Teacher,
        attributes: [],
        
      },
      {
        model: Classtype,
        attributes: [],
        
      }]},
      {model: Classtype, attributes: []},
      

    ],
    attributes: [],
    attributes: [
      'firstname',
      'lastname',
      'gender',
      [Sequelize.col("classname.classname"), "classname"], 
      [Sequelize.col("classname.teacher.teacher_firstname"), "teacher_firstname"],
      [Sequelize.col("classname.teacher.teacher_lastname"), "teacher_lastname"],
      [Sequelize.col("classname.classtype.classtype_name"), "classtype_name"]

    ]
  });

  if (!user) {
    return res.status(400).send({
      message: `No user found with the id ${studentId}`,
    });
  }

  return res.send({ "student": allUsers });
};

//create student

exports.createUser = async (req, res) => {
  const { firstname, lastname, gender, classnameId } = req.body;
  if (!firstname || !lastname || !gender || !classnameId ) {
    return res.status(400).send({
      message: 'Please provide all fields to create a student entry!',
    });
  }

  try {
    let newUser = await User.create({
      firstname,
      lastname,
      gender,
      classnameId,
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
