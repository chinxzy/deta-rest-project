

/**
 * 
 * @param {*} sequelize 
 * @param { DataTypes } DataTypes 
 * @returns 
 */
const student_guardian = (sequelize, DataTypes) => {
    const Student_guardian = sequelize.define(
        'student_guardian',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            studentId: {
                type: DataTypes.UUID,
                allowNull: false,

            },
            guardianId: {
                type: DataTypes.UUID,
                allowNull: false,

            },
            relationship: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            timestamps: false,
        }
    );
    Student_guardian.associate = models => {
        Student_guardian.belongsTo(models.student, {
            foreignKey: 'studentId'
        });
        Student_guardian.belongsTo(models.guardian, {
            foreignKey: 'guardianId'
        });
    }

    return Student_guardian;
};

module.exports = student_guardian;


