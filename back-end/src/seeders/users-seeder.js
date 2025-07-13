const userModel = require("../models/user.model");

function seeder() {
  userModel.createOne({});
}
