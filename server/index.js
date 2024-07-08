const express = require('express');
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');

// Obtaining app and adding plugins
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Routes
const jefeFlotaRoute = require('./routes/jefeFlota');
const conductorRoute = require('./routes/conductor');
const pasajeroRoute = require('./routes/pasajero');

app.use('/api/jefe-flota', jefeFlotaRoute);
app.use('/api/conductor', conductorRoute);
app.use('/api/pasajero', pasajeroRoute);

// Starting server
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});