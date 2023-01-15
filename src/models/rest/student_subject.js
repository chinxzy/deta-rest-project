import { DataTypes } from 'sequelize'


/**
 * 
 * @param {*} sequelize 
 * @param { DataTypes } DataTypes 
 * @returns 
 */
const student_subject = (sequelize, DataTypes) => {
    const Student_subject = sequelize.define(
        'student_subject',
        {
            studentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'student',
                    key: 'studentId'
                }
            },
            subjectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'subject',
                    key: 'subjectId'
                }
            },
        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );
    Student_subject.sync();

    return Student_subject;
};

export default student_subject;
