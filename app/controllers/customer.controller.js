const Customer = require("../models/Customer.model");

//Create and save customer
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active,
  });
  //Save customer in database
  Customer.create(customer, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

//find All Customers
exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

//Find customer with id
exports.findById = (req, res) => {
  Customer.findCustomerById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId,
        });
      }
    } else res.send(data);
  });
};

//  Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  Customer.updateCustomerById(req.params.customerId,new Customer(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete customer with specified id in request
exports.delete = (req, res) => {
  Customer.removeCustomer(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete all customers from database
exports.deleteAll = (req, res) => {
  Customer.removeAllCustomer((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else {
      res.send(data);
    }
  });
};
