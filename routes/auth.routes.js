const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.mw')    

module.exports = (app) => {
    app.post('/api/v1/auth/signup', authMiddleware.verifySignupBody, authController.signup);
}

