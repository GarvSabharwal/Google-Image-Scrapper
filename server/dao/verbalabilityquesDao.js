

var connectionProvider = require("../mysqlConnectionStringProvider.js");

//////////////////////////////////////Insert Question/////////////////////////////////
exports.createProductCategory = function (mcq, query_name, OnSuccessfulCallback) {


    var insertStatement = query_name + " set ? ";
    console.log(insertStatement)
    var category = {

        Question: mcq.question,
        option1: mcq.optiona,
        option2: mcq.optionb,
        option3: mcq.optionc,
        option4: mcq.optiond,
        answer: mcq.answer
    };

    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnectionForAptitude();

    if (connection) {
        console.log("if k andar aagya mai")
        var status = "Data Submitted Successfully"
        connection.query(insertStatement, category, function (err, result) {

            if (err) { status = "Data Submission Error"; console.log(err) }

            OnSuccessfulCallback(status);
            console.log(result);

        });
        connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }


}


///////////////////////////Insert Question End//////////////////////////////////////////////////////




/////////////////////////Delete question ///////////////////////////////////////////////////////////
exports.deleteQuestion = function (questionid, query, OnSuccessfulCallback) {

    querystatement = query + " where questionid =" + questionid;

    console.log(querystatement)

    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnectionForAptitude();

    if (connection) {
        console.log("if k andar aagya mai")

        connection.query(querystatement, function (err, result) {

            if (err) { console.log(err) }
            OnSuccessfulCallback();
            console.log(result);

        });
        connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }


}
////////////////////////////////////////////DElete Question End///////////////////////////////////////




///////////////////////////////////Correct Sequence///////////////////////////////////////////////////



exports.correctSequence = function (table_name, OnSuccessfulCallback) {

    querystatement = 'ALTER TABLE ' + table_name + '  DROP COLUMN questionid';


    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnectionForAptitude();

    if (connection) {
        console.log("if k andar aagya mai")
        var status = "Droped Successfully"
        connection.query(querystatement, function (err, result) {

            if (err) { status = "error in Drop"; console.log(err) }
            OnSuccessfulCallback();
            console.log(status);

        });
        connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }


}

exports.sequenceCorrected = function (table_name, OnSuccessfulCallback) {


    querystatement = 'ALTER TABLE ' + table_name + ' ADD questionid INT PRIMARY KEY AUTO_INCREMENT;';

    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnectionForAptitude();


    if (connection) {
        console.log("sequence if")
        var status = "Sequence Corrected Successfully"
        connection.query(querystatement, function (err, result) {

            if (err) { status = "error in ADD"; console.log(err) }
            OnSuccessfulCallback();
            console.log(status);

        });

        connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }


}

//////////////////////////////Correct Sequence End////////////////////////////////////////////////////////




///////////////////////////////////Get Questions////////////////////////////////////


exports.getAllMcqs = function (query_name, callback) {

    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnectionForAptitude();
    var querystatement = query_name;
    if (connection) {


        connection.query(querystatement, function (err, rows) {

            if (err) { throw err; }

            console.log(rows);
            callback(rows);
            rows = "";

        });
        connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
}
/////////////////////////////////Get Question end//////////////////////////////////////////

