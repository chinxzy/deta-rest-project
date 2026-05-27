/**
 * 
 * @param {*} sequelize 
 * @param { DataTypes } DataTypes 
 * @returns 
 */


const attendance = (sequelize, DataTypes) => {
    const Attendance = sequelize.define(
        'attendance',
        {
            attendanceId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            studentId: {
                type: DataTypes.UUID,
                allowNull: false,

            },
            classId: {
                type: DataTypes.UUID,
                allowNull: false,

            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            recordedBy: {
                type: DataTypes.UUID,
                allowNull: false,
            }

        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: 'attendance',
        }
    );

    Attendance.associate = models => {
        Attendance.belongsTo(models.classname, {
            foreignKey: 'classId'
        })
        Attendance.belongsTo(models.student, {
            foreignKey: 'studentId'
        })
    }
    return Attendance;
};

module.exports = attendance;


