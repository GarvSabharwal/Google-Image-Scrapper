function RouteConfigration(app) {
    this.app = app;
    this.routeTable = [];
    this.init();


}
///////////////////////////////////////////////////////////////////////////////////
RouteConfigration.prototype.init = function () {
    var self = this;
    this.addRoutes();
    this.processRoutes();

}
////////////////////////////////////////////////////////////////////////////////////
RouteConfigration.prototype.processRoutes = function () {


    var self = this;
    self.routeTable.forEach(function (route) {

        if (route.requestType == 'get') {

            self.app.get(route.requestUrl, route.callbackFunction);
        }
        else if (route.requestType == 'post') {

            self.app.post(route.requestUrl, route.callbackFunction);
        }

    });
}

/////////////////////////////////////VARIABLES DECLARATION START////////////////////////////////////////////////////

RouteConfigration.prototype.addRoutes = function () {
    var self = this;

    var dao = require("../server/dao/aptitudequesDao.js");

    self.routeTable.push({

        requestType: 'get',
        requestUrl: '/search',
        callbackFunction: function (request, response) {


            response.render('serach');
        }
    })



    self.routeTable.push({

        requestType: 'post',
        requestUrl: '/search',
        callbackFunction: function (request, response) {

            

                   }
       
    })
    






}

    
module.exports = RouteConfigration;
