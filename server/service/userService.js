const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userDto')
const ApiError = require('../exceptions/apiError')

class UserService {
    async registration(email, password, role) {
        const candidate = await UserModel.findOne({ email })
        if (candidate) {
            throw ApiError.BadRequest(`User with mailing address ${email} already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const resetPasswordLink = uuid.v4()

        const user = await UserModel.create({ email, password: hashPassword, role, resetPasswordLink })

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async allowResetPassword(resetPasswordLink) {
        const user = await UserModel.findOne({ resetPasswordLink })
        if (!user) {
            throw ApiError.BadRequest('Incorrect resetPasswordLink link')
        }

        return true
    }

    async resetPassword(email, password) {
        const hashPassword = await bcrypt.hash(password, 3)
        const resetPasswordLink = uuid.v4()

        const user = await UserModel.findOneAndUpdate(
            { email: email },
            { resetPasswordLink, password: hashPassword },
            { new: true }
        )

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw ApiError.BadRequest('User with this email was not found')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Incorrect password')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }
}

module.exports = new UserService()
