
const subject = (sequelize, DataTypes) => {
    const Subject = sequelize.define(
        'subject',
        {
            subjectId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            subject_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }

        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );

    Subject.associate = (models) => {
        Subject.belongsToMany(models.student, { through: 'student_subject' });

        Subject.belongsToMany(models.classtype, { through: 'classtype_subject' });

        Subject.belongsToMany(models.teacher, { through: 'teacher_subject' });

    }
    return Subject;
};

module.exports = subject;


