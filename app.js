const express = require('express');
const spectatorRoutes = require('./routes/spectatorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorController = require('./controllers/errorController');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}))

app.use('/', spectatorRoutes);
app.use('/admin', adminRoutes);
app.use(errorController.get404);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Listening on PORT ${PORT}`);})