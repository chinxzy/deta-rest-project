const db = require('../models/index.js');
const { Op } = require('sequelize');
const Subject = db.rest.models.subject
const SubType = db.rest.models.classtype_subject
const Classtype = db.rest.models.classtype
//get all subjects
const getAllSubjects = async (req, res) => {
    const classtype = req.query.classtype
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const includeOptions = {
        model: Classtype,
        attributes: ['classtypeId', 'classtype_name'],
        through: { attributes: [] },
    };

    if (classtype) {
        includeOptions.where = { classtype_name: { [Op.iLike]: `%${classtype}%` } };
        includeOptions.required = true;
    }

    const allSubjects = await Subject.findAndCountAll({
        distinct: true,
        col: 'subjectId',
        include: [includeOptions],
        attributes: [
            'subjectId',
            'subject_name',
            'code',
        ],
        limit,
        offset,
        order: [['subject_name', 'ASC']]

    })
    const totalPages = Math.ceil(allSubjects.count / limit);
    if (!allSubjects) {
        return res.status(404).send({
            message: "No subject found"
        })
    }

    const subjects = allSubjects.rows.map(s => {
        const plain = s.toJSON();
        plain.classtypes = plain.classtypes?.map(c => ({ classtypeId: c.classtypeId, classtype_name: c.classtype_name })) || [];
        return plain;
    });

    return res.send({
        "subjects": subjects,
        "totalPages": totalPages,
        "currentPage": page,
        "itemsPerPage": limit,
        "totalItems": allSubjects.count

    })
}

//get single subject

const getSubject = async (req, res) => {
    const subjectId = req.params.id;

    const subject = await Subject.findOne({
        where: { subjectId },
        include: [{
            model: Classtype,
            attributes: ['classtypeId', 'classtype_name'],
            through: { attributes: [] },
        }],
        attributes: ['subjectId', 'subject_name', 'code']
    });

    if (!subject) {
        return res.status(400).send({
            message: `No subject found with the id ${subjectId}`,
        });
    }

    const plain = subject.toJSON();
    plain.classtypes = (plain.classtypes || []).map(c => ({
        classtypeId: c.classtypeId,
        classtype_name: c.classtype_name
    }));

    return res.send(plain);
};

//create new subject entry
const createSubject = async (req, res) => {
    const { subject_name, code, classtypeId } = req.body;
    if (!subject_name || !code || !classtypeId) {
        return res.status(400).send({
            message: 'Please provide all fields to create a subject entry!',
        });
    }

    let subjectExists = await Subject.findOne({
        where: {
            [Op.or]: [
                { subject_name: { [Op.iLike]: `%${subject_name}%` } },
                { code: { [Op.iLike]: `%${code}%` } }
            ]
        }
    });

    if (subjectExists) {
        return res.status(400).send({
            message: 'This subject or subject code already exists',
        });
    }

    try {
        let newSubject = await Subject.create({
            subject_name,
            code
        });

        if (classtypeId) {
            const ids = Array.isArray(classtypeId) ? classtypeId : [classtypeId];
            await Promise.all(ids.map(id => SubType.create({
                subjectId: newSubject.subjectId,
                classtypeId: id
            })));
        }

        return res.send({
            ...newSubject.toJSON(),
            classtypeIds: classtypeId ? (Array.isArray(classtypeId) ? classtypeId : [classtypeId]) : []
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

//update subject entry
const updateSubject = async (req, res) => {
    const subjectId = req.params.id;
    const { subject_name, code, classtypeId } = req.body;

    const subject = await Subject.findOne({ where: { subjectId } });

    if (!subject) {
        return res.status(404).send({ message: `No subject found with the id ${subjectId}` });
    }

    try {
        if (subject_name) subject.subject_name = subject_name;
        if (code) subject.code = code;
        await subject.save();

        if (classtypeId) {
            const ids = Array.isArray(classtypeId) ? classtypeId : [classtypeId];
            await SubType.destroy({ where: { subjectId } });
            await Promise.all(ids.map(id => SubType.create({ subjectId, classtypeId: id })));
        }

        return res.send({ message: 'Subject updated successfully', subjectId });
    } catch (err) {
        return res.status(500).send({ message: `Error: ${err.message}` });
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
module.exports = { getAllSubjects, getSubject, createSubject, updateSubject };

