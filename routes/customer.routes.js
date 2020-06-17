module.exports = app => {
    const customers = require("../controllers/customers.controller");

    app.post("/customers", customers.create);

    app.get("/customers", customers.findAll);

    app.get("/customers/:customerId", customers.findOne);

    app.put("/customers/:customerId", customers.update);

    app.delete("/customers/:customerId", customers.delete);
};