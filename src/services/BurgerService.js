import { fakeDb } from "../db/FakeDb.js"
import { Burger } from "../models/Burger.js"
import { BadRequest } from "../utils/Errors.js"

class BurgerService {

    async deleteBurger(burgerId) {
        const burgerIndex = fakeDb.burgers.findIndex(burger => burger.id == burgerId)
        if (burgerIndex == -1) {
            throw new BadRequest(`Invalid ID: ${burgerId}`)
        }
        await fakeDb.burgers.splice(burgerIndex, 1)
    }

    async createBurger(burgerData) {
        if (fakeDb.burgers.length == 0) {
            burgerData.id = 1
        }
        else {
            const burgerId = fakeDb.burgers.map(burger => burger.id)
            const largestBurgerId = Math.max(...burgerId)
            burgerData.id = largestBurgerId + 1
        }
        const newBurger = new Burger(burgerData)
        await fakeDb.burgers.push(newBurger)
        return newBurger
    }
    async getBurgerById(burgerId) {
        const foundBurger = await fakeDb.burgers.find(burger => burger.id == burgerId)
        if (!foundBurger) {
            throw new BadRequest(`this id is not valid ${burgerId}`)
        }

        return foundBurger
    }
    async getBurgers() {
        const burgers = await fakeDb.burgers
        return burgers
    }

}

export const burgerService = new BurgerService()