const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

const PORT = process.env.PORT || 8080;

// Serve static content for the app from the
// "public" directory in the application directory.
app.use(express.static('public'));

// Parse application body as JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set Handlebars.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Import routes and give the server access to them.
const routes = require('./controllers/destinations_controller.js');
app.use(routes);


app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log('Server listening on: http://localhost:' + PORT);
});
