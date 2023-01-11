
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
            classname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            classtype: {
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
        Teacher.hasMany(models.student, {
            foreignKey: 'teacherId'
        })
    }
    Teacher.sync();

    return Teacher;
};

export default teacher;
