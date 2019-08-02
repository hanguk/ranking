module.exports = (sequelize, DataTypes) => (
  sequelize.define('ranking', {
    type: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    ranking: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isRankingIn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    validate: {
      unKnownType () {
        if (this.type !== 'blog' && this.type !== 'view') {
          throw new Error('type컬럼은 blog나 view여야 합니다.')
        }
      }
    },
    timestamps: true,
    paranoid: true,
  })
)