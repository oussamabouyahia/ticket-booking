const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tickets', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    transportation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'transportation',
        key: 'id'
      }
    },
    departure: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    status: {
      type: "SET('PENDING','CONFIRMED','CANCELLED')",
      allowNull: false,
      defaultValue: "pending"
    }
  }, {
    sequelize,
    tableName: 'tickets',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "transportation_idx",
        using: "BTREE",
        fields: [
          { name: "transportation" },
        ]
      },
      {
        name: "user_idx",
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
    ]
  });
};
