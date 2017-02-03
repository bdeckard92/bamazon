var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "Bthootu16",
    database: "bamazonDB",

});

connection.connect(function(err) {
    if (err) throw err;
    userAdmin();
});

var userAdmin = function() {
    inquirer.prompt({
        type: "list",
        message: "Are you a user or an Administrator?",
        choices: ["User", "Administrator"],
        name: "access"
    }).then(function(answer) {
        switch (answer.access) {
            case "User":
                productSearch();
                break;

            case "Administrator":
                adminInfo();
                break;
        }
    });
};
var productSearch = function() {

    inquirer.prompt({
        name: "product",
        type: "list",
        choices: ["Camping", "Hardware", "Home Goods"],
        message: "Click the department you would like to shop"
    }).then(function(answer) {
        var query = "SELECT item_id, product_name, price FROM products WHERE ?";
        connection.query(query, { department_name: answer.product }, function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log("Item ID: " + res[i].item_id + " || " + res[i].product_name + " || " + res[i].price);

            }
            var buyProduct = function() {
                inquirer.prompt({
                    name: "purchase",
                    type: "input",
                    message: "Enter the id number of the product you would like to purchase."

                }).then(function(answer) {

                    var query = "SELECT item_id, product_name FROM products WHERE ?";
                    var updateQuant = "'UPDATE products SET ? WHERE ?'";
                    connection.query(query, { item_id: answer.purchase }, function(err, res) {
                        for (var i = 0; i < res.length; i++) {
                            console.log("Congratulations! You will now have to figure out what the heck to do with your new " + res[i].product_name);
                            connection.query(updateQuant, [{ stock_quantity: stock_quantity - 1 }, { item_id: answer.purchace }], function(err, res) {
                                    console.log(res.stock_quantity);
                                }) //canot get mysql to update... err "stock_quantity not defined" am I trying too much in one function?

                        }
                    })

                });
            }
            buyProduct();
            //userAdmin();
        })
    })
}

var adminInfo = function() {
        inquirer.prompt({
            name: "moMoney",
            type: "list",
            message: "What would you like to see?",
            choices: ["Top selling departments", "Top selling products", "Products in low quantity", "Add Inventory", "Add new Item"]
        }).then(function(answer) {
            switch (answer.moMoney) {
                case "Top selling departments":
                    topSellDept();
                    break;
                case "Top selling products":
                    topSellitem();
                    break;
                case "Products in low quantity":
                    reOrder();
                    break;
                case "Add Inventory":
                    getMore();
                    break;
                case "Add new Item":
                    addNew();


            }

        })
    }
    //the following three functions are basically the same. could I set up variables for input and then write one fucnction?
var topSellDept = function() {
        var query = "SELECT department_name FROM products WHERE stock_quantity > 1"; //right now looking for >1 to make it work
        connection.query(query, function(err, res) {
            for (var i = 0; i < 10; i++) { // switched for loop to go down from three so it won't loop forever I hope... 
                console.log(res[i].department_name);
            }
        })
    }
    //to really meat the purpose on this one I need to list in order of quantity from smallest to largest
var topSellitem = function() {
        var query = "SELECT product_name FROM products WHERE stock_quantity > 1";
        connection.query(query, function(err, res) {
            for (var i = 0; i < 10; i++) { // switched for loop to go down from three so it won't loop forever I hope... 
                console.log(res[i].product_name);
            }
        })
    }
    //this seems the same as teh topSellitem above, but once I get the quanities to update I would change the top sell
    // 
var reOrder = function() {
    var query = "SELECT product_name FROM products WHERE stock_quantity > 1";
    connection.query(query, function(err, res) {
        for (var i = 0; i < 10; i++) { // switched for loop to go down from three so it won't loop forever I hope... 
            console.log(res[i].product_name);
        }
    })
}

var getMore = function() {
    inquirer.prompt({
        name: "add",
        type: "input", // err right here for some reason "unexpected identifyer"
        message: "Enter the item number for the product to add inventory."
    }).then(function(answer) {
        var query = "UPDATE products SET stock_quantity= stock_quantity + 5 WHERE ?"
        connection.query(query, [{ item_id: answer.add }], function(err, res) {
            if (err) throw err;
            else {
                console.log("Stock Quantity Updated for item number " + answer.add);
            }

        })
    })
}
//add function to add item to product
 var addNew = function(){
 	inquirer.prompt({
 		name: "addItem",
 		type: "input",
 		message: "Enter the name of the product to add, "
 	})
 }

 //https://drive.google.com/open?id=0BxxX7PKeYgkzVmgwWW5TeUdDMHM link to screen caps