
const teacher = (sequelize, DataTypes) => {
    const Teacher = sequelize.define(
        'teacher',
        {
            teacherId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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

        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );

    Teacher.associate = models => {
        Teacher.hasOne(models.classname)

       
    }
    Teacher.sync({force: true});

    return Teacher;
};

export default teacher;
