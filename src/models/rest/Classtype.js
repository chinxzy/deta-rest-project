
const classtype = (sequelize, DataTypes) => {
    const Classtype = sequelize.define(
        'classtype',
        {
            classtypeId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            classtype_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );

    Classtype.associate = models => {
        Classtype.belongsToMany(models.subject, {
            through: {
                model: 'classtypeJoin',
                unique: false,
                scope: {
                    classtypeJoinType: 'subject'
                }
            },
            foreignkey: 'classtypeId',
            as: 'subjectType',
            constraints: false
        })

        Classtype.belongsToMany(models.student, {
            through: {
                model: 'classtypeJoin',
                unique: false,
                scope: {
                    classtypeJoinType: 'student'
                }
            },
            foreignkey: 'classtypeId',
            as: 'studentType',
            constraints: false
        })

        Classtype.belongsToMany(models.teacher, {
            through: {
                model: 'classtypeJoin',
                unique: false,
                scope: {
                    classtypeJoinType: 'teacher'
                }
            },
            foreignkey: 'classtypeId',
            as: 'teacherType',
            constraints: false
        })

    }
    Classtype.sync();

    return Classtype;
};

export default classtype;
