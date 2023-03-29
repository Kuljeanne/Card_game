import { Card } from "../src/ts/card"

export function makeArrayOfPairs(array: Card[], length: number): Card[] {
    array.length = length
    const cloneArray: Card[] = []
    array.forEach((item) => {
        const clone: Card = new Card(item._suit, item._value)
        clone.build()
        cloneArray.push(clone)
    })

    return [array, cloneArray].flat()
}

export function shuffle(array: Card[]): Card[] {
    for (let i: number = array.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}