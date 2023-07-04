const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    ticket_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tickets',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payment',
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
        name: "ticketId_idx",
        using: "BTREE",
        fields: [
          { name: "ticket_id" },
        ]
      },
      {
        name: "userId_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
