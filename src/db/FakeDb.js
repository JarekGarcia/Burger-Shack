import { Burger } from "../models/Burger.js";

class FakeDb {
    constructor() {
        this.burgers = [
            new Burger({ id: 1, name: 'Wapper', vegan: false, rating: 10 }),
            new Burger({ id: 2, name: 'Slapper', vegan: false, rating: 8 }),
            new Burger({ id: 3, name: 'Crapper', vegan: true, rating: 1 })

        ]
    }
}

export const fakeDb = new FakeDb()