
const classtype = (sequelize, DataTypes) => {
    const Classtype = sequelize.define(
        'classtype',
        {
            classtypeId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
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
        Classtype.belongsToMany(models.subject, { through: 'classtype_subject' });
    }
    return Classtype;
};

export default classtype;
