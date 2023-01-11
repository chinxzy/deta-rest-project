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
            classname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            classtype: {
                type: DataTypes.STRING,
                allowNull: false
            },
            teacherId: {
                type: DataTypes.INTEGER,
                allowNull: false,

            },
        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );
    Student.associate = (models) => {
        Student.belongsTo(models.teacher, {
            foreignKey: 'teacherId'
        })
    }
    Student.sync();

    return Student;
};

export default student;
