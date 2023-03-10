import { DataTypes } from 'sequelize'


/**
 * 
 * @param {*} sequelize 
 * @param { DataTypes } DataTypes 
 * @returns 
 */
const student = (sequelize, DataTypes) => {
    const Student = sequelize.define(
        'student',
        {
            studentId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false
            },
            classnameId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );
    Student.associate = (models) => {
        Student.belongsTo(models.classname, {
            foreignKey: 'classnameId'
        });
        Student.belongsToMany(models.subject, { through: 'student_subject' });


    }
    Student.sync({force: true});

    return Student;
};

export default student;
