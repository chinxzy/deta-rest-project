

/**
 * 
 * @param {*} sequelize 
 * @param { DataTypes } DataTypes 
 * @returns 
 */
const assessment_scores = (sequelize, DataTypes) => {
    const AssessmentScores = sequelize.define(
        'assessment_scores',
        {
            assessmentId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            studentId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            subjectId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            score: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            remark: {
                type: DataTypes.STRING,
                allowNull: true
            }

        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );
    AssessmentScores.associate = (models) => {

        AssessmentScores.belongsTo(models.subject, {
            foreignKey: 'subjectId'
        });
        AssessmentScores.belongsTo(models.assessment, {
            foreignKey: 'assessmentId'
        });
    }
    return AssessmentScores;
};

module.exports = assessment_scores;


