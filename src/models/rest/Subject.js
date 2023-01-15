
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

    Subject.associate = (models) => {
        Subject.belongsToMany(models.student, { through: 'student_subject' });

        Subject.belongsToMany(models.classtype, {
            through: {
                model: 'classtypeJoin',
                unique: false,
                scope: {
                    classtypeJoinType: 'subject'
                }
            },
            as: 'classtypeSubject',
            foreignkey: 'classtypeJoinId',
            constraints: false
        })

    }
    Subject.sync();

    return Subject;
};

export default subject;
