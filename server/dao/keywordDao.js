

var connectionProvider = require("../mysqlConnectionStringProvider.js");

exports.addKeyword = function (keyword_value, OnSuccessfulCallback) {

    console.log(keyword_value.keyword);
    var insertStatement = "INSERT INTO keywords_table (keyword_value) value (?)";
    
    var key = {
        keyword_value: keyword_value.keyword
            
        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();

        if (connection) {
            console.log("if k andar aagya mai")
            var status = "Data Submitted Successfully"
            connection.query(insertStatement, key.keyword_value, function (err, result) {
                
                if (err) { status = "Data Submission Error"; console.log(err) }
                
                OnSuccessfulCallback(status);
                console.log(result);
                
            });
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }


    }

exports.selectkeyword = function (callback) {


    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
   
    if (connection) {


        connection.query("select * from keywords_table", function (err, rows) {

            if (err) { throw err; }

            console.log(rows);
            callback(rows);
            rows = "";

        });
        connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);



    }



}
