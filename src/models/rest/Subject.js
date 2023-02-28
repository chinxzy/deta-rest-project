
const subject = (sequelize, DataTypes) => {
    const Subject = sequelize.define(
        'subject',
        {
            subjectId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            subject_name: {
                type: DataTypes.STRING,
                allowNull: false
            }

        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );

    Subject.associate = (models) => {
        Subject.belongsToMany(models.student, { through: 'student_subject' });

        // Subject.belongsToMany(models.classtype, { through: 'classtype_subject' });

    }
    Subject.sync({force: true});

    return Subject;
};

export default subject;
