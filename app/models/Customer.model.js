const sql = require("./db");

const Customer = function (customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newCustomer });
  });
};
Customer.findCustomerById = (customerId, result) => {
  sql.query(`SELECT * FROM customers WHERE id= ${customerId}`, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ KIND: "not_found" }, null);
  });
};
Customer.getAll = (result) => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};
Customer.updateCustomerById = (customerId, customerUpdated, result) => {
  sql.query(
    "UPDATE customers SET email=?, name=?, active=? WHERE id=?",
    [
      customerUpdated.email,
      customerUpdated.name,
      customerUpdated.active,
      customerId,
    ],
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ KIND: "not_found" }, null);
        return;
      }
      result(null, { message: "data_updated" });
    }
  );
};

Customer.removeCustomer = (id, result) => {
  sql.query("DELETE FROM customers where id= ?", id, (err, res) => {
    if (err) {
      console.log("error", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ KIND: "not_found" }, null);
      return;
    }
    result(null, { message: "record_deleted_id_" + id });
  });
};
Customer.removeAllCustomer = (result) => {
  sql.query("DELETE FROM customers ", (err, res) => {
    if (err) {
      console.log("error", err);
      result(null, err);
      return;
    }
    result(null, { message: "records_deleted" });
  });
};

module.exports = Customer;
