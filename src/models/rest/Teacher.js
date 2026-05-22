
const teacher = (sequelize, DataTypes) => {
    const Teacher = sequelize.define(
        'teacher',
        {
            teacherId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            teacher_firstname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            teacher_lastname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            phone: {
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

    Teacher.associate = models => {
        Teacher.hasOne(models.classname)
        Teacher.belongsToMany(models.subject, { through: 'teacher_subject' });

    }
    return Teacher;
};

export default teacher;
