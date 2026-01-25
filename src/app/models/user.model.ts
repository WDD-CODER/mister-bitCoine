import { Move } from "./move.model"

export interface User {
    _id?:string
    name:string
    coins: number
    email: string
    moves?:Move[] 
}
