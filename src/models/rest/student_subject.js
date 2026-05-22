

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
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            studentId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'student',
                    key: 'studentId'
                }
            },
            subjectId: {
                type: DataTypes.UUID,
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
    return Student_subject;
};

export default student_subject;
