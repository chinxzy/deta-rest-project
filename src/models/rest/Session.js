/**
 * 
 * @param {*} sequelize 
 * @param { DataTypes } DataTypes 
 * @returns 
 */
const session = (sequelize, DataTypes) => {
    const Session = sequelize.define(
        'session',
        {
            sessionId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            sessionName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            isCurrent: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: 'session',
        }
    );

    Session.associate = models => {

    }
    return Session;
};

module.exports = session;


