var DataTypes = require("sequelize").DataTypes;
var _payment = require("./payment");
var _tickets = require("./tickets");
var _transportation = require("./transportation");
var _users = require("./users");

function initModels(sequelize) {
  var payment = _payment(sequelize, DataTypes);
  var tickets = _tickets(sequelize, DataTypes);
  var transportation = _transportation(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  payment.belongsTo(tickets, { as: "ticket", foreignKey: "ticket_id"});
  tickets.hasMany(payment, { as: "payments", foreignKey: "ticket_id"});
  tickets.belongsTo(transportation, { as: "transportation_transportation", foreignKey: "transportation"});
  transportation.hasMany(tickets, { as: "tickets", foreignKey: "transportation"});
  payment.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(payment, { as: "payments", foreignKey: "user_id"});
  tickets.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(tickets, { as: "tickets", foreignKey: "user"});

  return {
    payment,
    tickets,
    transportation,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
