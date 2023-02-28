const db = require('../models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const SubType = db.rest.models.classtype_subject
const Subject = db.rest.models.subject
const Classtype = db.rest.models.classtype

//get all subjects linked to classtype
exports.getAllSubType = async (req, res) => {
    const subjectId = req.query.subjectId
    const classtypeId = req.query.classtypeId

    const allSubType = await SubType.findAll({
        attributes: [],
        include:[{
            model: Subject, attributes:[]
        },
        {
            model: Classtype, attributes:[]
        }
        ],
        attributes: [
            'id',
            [Sequelize.col("subject.subject_name"),"subject_name"],
            [Sequelize.col("classtype.classtype_name"), "classtype_name"],
        ]
    })

    if(subjectId) {
        const getClasstype = await SubType.findAll({
            where: {
                subjectId: {
                    [Op.eq]: subjectId
                }
            },
            attributes: [],
            include:[
            {
                model: Classtype, attributes:[]
            }
            ],
            attributes: [
                [Sequelize.col("classtype.classtype_name"), "classtype_name"],
            ]

        })
        return res.send({"classtype": getClasstype})
    }

    if(classtypeId) {
        const getSubjects = await SubType.findAll({
            where: {
                classtypeId: {
                    [Op.eq]: classtypeId
                }
            },
            attributes: [],
            include:[
            {
                model: Subject, attributes:[]
            }
            ],
            attributes: [
                [Sequelize.col("subject.subject_name"), "subject_name"],
            ]

        })
        return res.send({"subjects": getSubjects})
    }

    if (!allSubType) {
        return res.status(404).send({
            message: "No data found"
        })
    }
    return res.send({ "subtype": allSubType })
}


//create new subject-classtype entry
exports.createSubType= async (req, res) => {
    const {subjectId, classtypeId} = req.body;
    if (!subjectId || !classtypeId) {
        res.status(400).send({
            message: "please provide all fields to link subject to classtype"
        })
    }
    const linkExists = await SubType.findOne ({
        where: {
            subjectId: {
                [Op.eq]: subjectId
            },
            classtypeId: {
                [Op.eq]: classtypeId
            }
        }
    });

    if (linkExists) {
        return res.status(400).send({
            message: 'This subject is already linked to this classtype',
        });
    } 
    try {
       const link =await SubType.create({
        subjectId,
        classtypeId
       });
       res.status(200).send(link)
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
