require('dotenv/config');
const { Sequelize, DataTypes } = require('sequelize');
const allConfig = require('../config/config.js');
const admin = require('./rest/Admin.js');
const assessments = require('./rest/Assessments.js');
const assessmentScores = require('./rest/assessmentScores.js');
const attendance = require('./rest/Attendance.js');
const classname = require('./rest/Classname.js');
const classtype = require('./rest/Classtype.js');
const classtypeSubject = require('./rest/classtype_subject.js');
const guardian = require('./rest/Guardian.js');
const session = require('./rest/Session.js');
const student = require('./rest/Student.js');
const studentClassHistory = require('./rest/student_class_history.js');
const studentGuardian = require('./rest/student_guardian.js');
const studentSubject = require('./rest/student_subject.js');
const subject = require('./rest/Subject.js');
const teacher = require('./rest/Teacher.js');
const teacherSubjects = require('./rest/teacher_subjects.js');
const term = require('./rest/Term.js');

const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const isProduction = env === 'production';

let db = {};

const databases = Object.keys(config.databases);

for (let i = 0; i < databases.length; i++) {
  let database = databases[i];
  let dbPath = config.databases[database];
  const sequelizeOptions = {
    ...dbPath,
    logging: isProduction ? false : console.log,
  };

  db[database] = new Sequelize(
    sequelizeOptions.database,
    sequelizeOptions.username,
    sequelizeOptions.password,
    sequelizeOptions
  );
}

const modelFactories = [
  admin,
  assessments,
  assessmentScores,
  attendance,
  classname,
  classtype,
  classtypeSubject,
  guardian,
  session,
  student,
  studentClassHistory,
  studentGuardian,
  studentSubject,
  subject,
  teacher,
  teacherSubjects,
  term,
];

for (const modelFn of modelFactories) {
  const model = modelFn(db.rest, DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const initializeDb = async () => {
  if (isProduction) {
    // Production: never run ALTER automatically.
    await db.rest.sync();
    return;
  }

  // Development: keep schema in sync while iterating quickly.
  await db.rest.sync({ alter: true });
};

module.exports = db;
module.exports.initializeDb = initializeDb;

