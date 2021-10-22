module.exports = (app) => {
  const customers = require("../controllers/customer.controller");

  //Create new customer
  app.post("/customers", customers.create);

  //get all customers
  app.get("/customers", customers.findAll);

  //get a single customer
  app.get("/customers/:customerId", customers.findById);

  //update a customer with Id
  app.put("/customers/:customerId", customers.update);

  // delete a customer with id
  app.delete("/customers/:customerId", customers.delete);

  //delete all the customers
  app.delete("/customers", customers.deleteAll);
};
