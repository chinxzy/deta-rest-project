import { DataTypes } from 'sequelize'


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
            classtypeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                
            },
            subjectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                
            },
        },
        { timestamps: false }
    );
    Classtype_subject.associate = models => {
      Classtype_subject.belongsTo(models.classtype, {
        foreignKey: 'classtypeId'
      });
      Classtype_subject.belongsTo(models.subject, {
        foreignKey: 'subjectId'
      });  
    }
    
    Classtype_subject.sync({force: true});

    return Classtype_subject;
};

export default classtype_subject;
