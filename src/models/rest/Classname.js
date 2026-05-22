
const classname = (sequelize, DataTypes) => {
    const Classname = sequelize.define(
        'classname',
        {
            classnameId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            classname: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            teacherId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: true
            },
            classtypeId: {
                type: DataTypes.UUID,
                allowNull: false,
            }

        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: 'classname',
        }
    );

    Classname.associate = models => {
        Classname.belongsTo(models.classtype, {
            foreignKey: 'classtypeId'
        })
        Classname.belongsTo(models.teacher, {
            foreignKey: 'teacherId'
        })
        Classname.hasMany(models.student, {
            foreignKey: 'classnameId'
        })
    }
    return Classname;
};

export default classname;
