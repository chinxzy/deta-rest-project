

/**
 * 
 * @param {*} sequelize 
 * @param { DataTypes } DataTypes 
 * @returns 
 */
const classtype_subject = (sequelize, DataTypes) => {
  const Classtype_subject = sequelize.define(
    'classtype_subject',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      classtypeId: {
        type: DataTypes.UUID,
        allowNull: false,

      },
      subjectId: {
        type: DataTypes.UUID,
        allowNull: false,

      },
    },
    {
      timestamps: false,
    }
  );
  Classtype_subject.associate = models => {
    Classtype_subject.belongsTo(models.classtype, {
      foreignKey: 'classtypeId'
    });
    Classtype_subject.belongsTo(models.subject, {
      foreignKey: 'subjectId'
    });
  }

  return Classtype_subject;
};

export default classtype_subject;
