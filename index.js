const express = require("express");
const app = express();
require("./dataBase/connection");
const registerRoute = require("./routes/authRoutes");
const loginRoute = require("./routes/loginRoute");
const forgot = require("./routes/forgotPassword");
const PORT = process.env.PORT || "3000";
app.set('view engine', 'pug');
app.set('views', './views')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// registration routes 
app.use('/', registerRoute );
// login routes
app.use('/login', loginRoute);
// forgot password routes
app.use('/forgot', forgot);
app.listen(PORT, () => {
  console.log(`server running at https://localhost${PORT}`);
});
