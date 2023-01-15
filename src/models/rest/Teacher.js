
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
            classtypeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
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

        Teacher.belongsToMany(models.classtype, {
            through: {
                model: 'classtypeJoin',
                unique: false,
                scope: {
                    classtypeJoinType: 'teacher'
                }
            },
            as: 'classtypeTeacher',
            foreignkey: 'classtypeJoinId',
            constraints: false
        })
    }
    Teacher.sync();

    return Teacher;
};

export default teacher;
