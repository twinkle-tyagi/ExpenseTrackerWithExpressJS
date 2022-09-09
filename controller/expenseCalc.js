const sequelize = require('sequelize');

const path = require('path');
const Expenses = require('../model/expense');
const exp = require('constants');

exports.getExpenses = (req, res, next) => {
    Expenses.findAll()
    .then(exp => {
        //console.log(expense);
        return res.json(exp);
    })
    .catch(err => console.log(err));
};

exports.getAddExpenses = (req, res, next) => {
    //console.log(req);
    res.sendFile(path.join(__dirname, '..', 'view', 'expenses1.html'));
};

exports.postAddExpenses = async (req, res, next) => {
    let expense = req.body.expense;
    //console.log("==================================================="+expense);
    let description = req.body.description;
    let category = req.body.category;

    const expen = await Expenses.create( {
        expense: expense,
        description: description,
        category: category
    })

    //console.log(expen);
    res.json(expen);
};

exports.getEditExpense = (req, res, next) => {
    const id = req.params.id;
    
    Expenses.findByPk(id)
    .then(exp => {
        if(!exp) {
            return res.json(exp);
        }
        res.json(exp);
    })
    .catch(err => console.log(err));
}

exports.getDeleteUser = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    Expenses.findByPk(id)
    .then(exp => {
        console.log('destroyed');
        exp.destroy();
    })
    .then((ex) => res.json(ex))
    .catch(err => console.log(err));
}