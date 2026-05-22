

/**
 * 
 * @param {*} sequelize 
 * @param { DataTypes } DataTypes 
 * @returns 
 */
const student_class_history = (sequelize, DataTypes) => {
    const Student_class_history = sequelize.define(
        'student_class_history',
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
            classnameId: {
                type: DataTypes.UUID,
                allowNull: false,

            },
            sessionId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            termId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
    Student_class_history.associate = models => {
        Student_class_history.belongsTo(models.student, {
            foreignKey: 'studentId'
        });
        Student_class_history.belongsTo(models.classname, {
            foreignKey: 'classnameId'
        });
        Student_class_history.belongsTo(models.session, {
            foreignKey: 'sessionId'
        });
        Student_class_history.belongsTo(models.term, {
            foreignKey: 'termId'
        });
    }

    return Student_class_history;
};

export default student_class_history;
