
const classname = (sequelize, DataTypes) => {
    const Classname = sequelize.define(
        'classname',
        {
            classnameId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            classname: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            teacherId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true
            }
        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );

    Classname.associate = models => {
        Classname.hasMany(models.student, {
            foreignKey: 'classnameId'
        })
        Classname.belongsTo(models.teacher, {
            foreignKey: 'teacherId'
        })
    }
    Classname.sync();

    return Classname;
};

export default classname;
