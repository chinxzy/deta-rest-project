

/**
 * 
 * @param {*} sequelize 
 * @param { DataTypes } DataTypes 
 * @returns 
 */
const guardian = (sequelize, DataTypes) => {
    const Guardian = sequelize.define(
        'guardian',
        {
            guardianId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true
            }

        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );

    return Guardian;
};

export default guardian;
