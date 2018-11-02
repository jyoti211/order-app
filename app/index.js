/** Global Configuration **/
const {
	APP_NAME,
	PORT
} = require('./config');
const app = require('./app');

/** Server Start **/
app.listen(PORT, () => {
    console.log(`${APP_NAME} is listening on port ${PORT}...`);
});
