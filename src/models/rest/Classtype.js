
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
        Classtype.hasMany(models.classname, {
            foreignKey: 'classtypeId'
        })
        // Classtype.belongsToMany(models.subject, { through: 'classtype_subject' });
    }
    Classtype.sync({alter: true});

    return Classtype;
};

export default classtype;
