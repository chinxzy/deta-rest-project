

/**
 * 
 * @param {*} sequelize 
 * @param { DataTypes } DataTypes 
 * @returns 
 */
const assessment = (sequelize, DataTypes) => {
    const Assessment = sequelize.define(
        'assessment',
        {
            assessmentId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            classnameId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            subjectId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            termId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            sessionId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            totalScore: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );
    Assessment.associate = (models) => {
        Assessment.belongsTo(models.classname, {
            foreignKey: 'classnameId'
        });
        Assessment.belongsTo(models.subject, {
            foreignKey: 'subjectId'
        });
        Assessment.belongsTo(models.term, {
            foreignKey: 'termId'
        });
        Assessment.belongsTo(models.session, {
            foreignKey: 'sessionId'
        });
    }
    return Assessment;
};

export default assessment;
