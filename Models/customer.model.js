const sql = require("../config/db");

const customer = function (customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      result(err, null);
      return;
    } else {
      result(null, { id: res.insertId, ...newCustomer });
    }
  });
};

customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    } else if (res.length) {
      result(null, res[0]);
      return;
    } else {
      result({ kind: "not_found" }, null);
    }
  });
};


// res= response
customer.getAll = (result) => {
  sql.query('SELECT * FROM customers',(err,res)=>{
    if(err){
      result({Error:"Something Went Wrong!"}, null);
      return;
    } else {
      result(null,res)
    }
  });
};

customer.updateById = (id, customer, result) => {
  try {
  sql.query(
    "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email,customer.name,customer.active,id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      } else if (res.affectedRows == 0) {
        result({ kind: " not_found" }, null);
        return;
      } else {
        result({ kind: "Customer Updated!" }, { id, ...customer });
      }
    }
  );
  }
  catch (error) {
    console.log(error)
  }
};

customer.remove = (id, result) => {
    sql.query(`DELETE  FROM customers WHERE id = ${id}`, (err, res) => {
        if(err){
            result(null,err);
            return; 
        } else if(res.affectedRows == 0){
            result({kind:"not_found"},null);
            return;
        } else {
            result(null,res);
        }
    })
}

module.exports = customer; 