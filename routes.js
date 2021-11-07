const routes = require('next-routes')();

routes
.add('/details', '/details')
.add('/details/:address', '/show')
.add('/tickets', '/tickets')
.add('/buytickets', '/buytickets')
.add('/buytickets/:index', '/buytickets')

module.exports = routes;