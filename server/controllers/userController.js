const userService = require('../service/userService')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/apiError')
const UserModel = require('../models/userModel')

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }

            const { email, password } = req.body
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }

            const { email, password } = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.status(200)
        } catch (e) {
            next(e)
        }
    }

    async allowResetPassword(req, res, next) {
        try {
            const { email } = req.body
            const candidate = await UserModel.findOne({ email })
            if (!candidate) {
                return res.json({ status: false })
            }

            await mailService.sendResetPassword(email, `${process.env.API_URL}/reset/${candidate.resetPasswordLink}`)
            return res.json({ status: true })
        } catch (e) {
            next(e)
        }
    }

    async toResetPassword(req, res, next) {
        try {
            const resetPasswordLink = req.params.link
            const allow = await userService.allowResetPassword(resetPasswordLink)
            if (allow) {
                return res.redirect(`${process.env.CLIENT_URL}/resetPassword`)
            }
        } catch (e) {
            next(e)
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await userService.resetPassword(email, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()
