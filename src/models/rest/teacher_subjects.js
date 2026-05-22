

/**
 * 
 * @param {*} sequelize 
 * @param { DataTypes } DataTypes 
 * @returns 
 */
const teacher_subject = (sequelize, DataTypes) => {
    const Teacher_subject = sequelize.define(
        'teacher_subject',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            teacherId: {
                type: DataTypes.UUID,
                allowNull: false,

            },
            subjectId: {
                type: DataTypes.UUID,
                allowNull: false,

            },
        },
        {
            timestamps: false,
        }
    );
    Teacher_subject.associate = models => {
        Teacher_subject.belongsTo(models.teacher, {
            foreignKey: 'teacherId'
        });
        Teacher_subject.belongsTo(models.subject, {
            foreignKey: 'subjectId'
        });
    }

    return Teacher_subject;
};

export default teacher_subject;
