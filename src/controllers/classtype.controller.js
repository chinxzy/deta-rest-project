const db = require('../models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const Classtype = db.rest.models.classtype


//get all classtype
exports.getClasstype = async (req, res) => {

    const classtype = await Classtype.findAll({
        attributes: [],
        attributes: [
            'classtypeId',
            'classtype_name',
        
        ]
    })


    if (!classtype) {
        return res.status(404).send({
            message: "No classtype found"
        })
    }
    return res.send({ "classtype": classtype })
}

exports.createClasstype = async (req, res) => {
    const { classtype_name } = req.body;
    if (!classtype_name) {
        return res.status(400).send({
            message: 'Please provide all fields to create a classtype entry!',
        });
    }

    try {
        let newClasstype = await Classtype.create({
            classtype_name,
        });
        return res.send(newClasstype);
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
