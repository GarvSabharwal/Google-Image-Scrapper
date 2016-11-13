var mysql = require("mysql");

var mysqlConnectionString = require("./mysqlConnectionString");

exports.mysqlConnectionStringProvider = {

    getMySqlConnection: function () {

        var connection = mysql.createConnection(mysqlConnectionString.mysqlConnectionString.connection.dev);

        connection.connect(function (err) {

            if (err) { throw err; }

            console.log("Connected");

 
        });
        return connection;

    },
    closeMySqlConnection: function (currentConnection) {

        if (currentConnection) {

            currentConnection.end(function (err) {

                if (err) { throw err; }

                console.log("Closed");

            })

        }

            

        }
       

    }



