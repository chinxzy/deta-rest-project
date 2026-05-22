/**
 * 
 * @param {*} sequelize 
 * @param { DataTypes } DataTypes 
 * @returns 
 */
const term = (sequelize, DataTypes) => {
    const Term = sequelize.define(
        'term',
        {
            termId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            termName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: false
            },
            sessionId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: true
            },
            isCurrent: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }

        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: 'term',
        }
    );

    Term.associate = models => {
        Term.belongsTo(models.session, {
            foreignKey: 'sessionId'
        })

    }
    return Term;
};

export default term;
