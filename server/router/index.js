const Router = require('express').Router
const userController = require('../controllers/userController')
const router = new Router()
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')

router.post(
    '/registration',
    [body('email').isEmail(), body('password').isLength({ min: 3, max: 32 })],
    userController.registration
)
router.post('/login', [body('email').isEmail(), body('password').isLength({ min: 3, max: 32 })], userController.login)
router.post('/logout', userController.logout)
router.get('/reset/:link', userController.toResetPassword)
router.get('/refresh', userController.refresh)
router.get('/allowResetPassword', body('email').isEmail(), userController.allowResetPassword)
router.post('/resetPassword', userController.resetPassword)

module.exports = router
