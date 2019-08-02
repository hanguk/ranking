module.exports = (sequelize, DataTypes) => (
  sequelize.define('blog', {
    keyword: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true
    },
    isBlog: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isView: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: true,
    paranoid: true
  })
)