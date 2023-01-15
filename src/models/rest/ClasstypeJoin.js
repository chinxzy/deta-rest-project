
const classtypeJoin = (sequelize, DataTypes) => {
    const ClasstypeJoin = sequelize.define(
        'classtypeJoin',
        {
            classtypeJoinID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            classtypeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'classtype'
                },
                unique: 'like_unique_constraint'
            },
            classtypeJoinType: {
                type: DataTypes.ENUM('teacher', 'student', 'subject'),
                allowNull: false,
                unique: 'like_unique_constraint'
            },
            classtypeJoinId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: 'like_unique_constraint'
            }

        },
        {
            timestamps: true,
            freezeTableName: true,
        },
        {
            uniqueKeys: {
                like_unique_constraint: {
                    fields: ['classtypeId', 'classtypeJoinId', 'classtypeJoinType'],
                },
            },
        }
    );

    ClasstypeJoin.sync();

    return ClasstypeJoin;
};

export default classtypeJoin;
