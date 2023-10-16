import { fakeDb } from "../db/FakeDb.js";
import { burgerService } from "../services/BurgerService.js";
import BaseController from "../utils/BaseController.js";
import { BadRequest } from "../utils/Errors.js";

export class BurgerController extends BaseController {
    constructor() {
        super('api/burgers')
        this.router
            .get('/test', this.test)
            .get('', this.getBurgers)
            .get('/:burgerId', this.getBurgerById)
            .post('', this.createBurger)
            .delete('/:burgerId', this.deleteBurger)
    }

    test(request, response, next) {
        response.send('here is your response')
    }

    async getBurgers(request, response, next) {
        try {
            const burgers = await burgerService.getBurgers()
            return response.send(burgers)
        } catch (error) {
            next(error)
        }
    }

    async getBurgerById(request, response, next) {
        try {
            const burgerId = request.params.burgerId
            const burger = await burgerService.getBurgerById(burgerId)
            return response.send(burger)
        } catch (error) {
            next(error)
        }
    }

    async createBurger(request, response, next) {
        try {
            const burgerData = request.body

            const burger = await burgerService.createBurger(burgerData)

            response.send(burger)
        } catch (error) {
            next(error)
        }
    }

    async deleteBurger(request, response, next) {
        try {
            const burgerId = request.params.burgerId
            await burgerService.deleteBurger(burgerId)
            response.send('Burger trashed! 🤮')

        } catch (error) {
            next(error)
        }
    }
}