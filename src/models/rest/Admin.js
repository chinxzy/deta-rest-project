
const admin = (sequelize, DataTypes) => {
    const Admin = sequelize.define(
        'admin',
        {
            adminId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            admin_firstname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            admin_lastname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            admin_email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false
            },

        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );
    Admin.sync();

    return Admin;
};

export default admin;
