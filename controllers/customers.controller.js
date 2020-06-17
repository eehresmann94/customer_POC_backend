const customer = require("../Models/customer.model");

exports.create = (req, res) => {
    const newCustomer = new customer({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active
    });

    customer.create(newCustomer, (err, data) => {
        if (err) {
            res.status(500).send({ message: "Could not create customer" });
        }
        res.send(data);

    })
};

exports.findAll = (req, res) => {
    customer.getAll((err, data) => {
        if (err) {
            res.send({ err: "Operation Failed" });
        } else {
            res.send(data)
        }
    });
};

exports.findOne = (req, res) => {
    customer.findById(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(500).send({ message: "Could not find" });
            } else {
                res.status(500).send({ message: "Could not find customer" })
            }
        }
        res.send(data);
    });
};

exports.update = (req, res) => {
    const updateCust = new customer({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active
    })
    var date = new Date()
    customer.updateById(req.params.customerId, updateCust, (err, data) => {
        if (err) {
            res.send({ err: "Could not Update Customer" })
        } else {
            res.send( ...data)

        }
    })
};

exports.delete = (req, res) => {
    customer.remove(req.params.customerId, (err, data) => {
        if (err) {
            res.send({ err: err })
            return;
        } else { res.send(data); }
    });
};