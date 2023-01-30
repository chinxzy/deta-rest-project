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
                references: {
                    model: 'classtype',
                    key: 'classtypeId'
                }
            },
            subjectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'subject',
                    key: 'subjectId'
                }
            },
        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );
    Classtype_subject.sync();

    return Classtype_subject;
};

export default classtype_subject;
