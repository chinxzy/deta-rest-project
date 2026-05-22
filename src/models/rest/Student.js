

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
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
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
                type: DataTypes.UUID,
                allowNull: false
            },
            dateOfBirth: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            addmissionNo: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "active"
            }
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
    return Student;
};

export default student;
