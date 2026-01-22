import { Move } from "./move.model"

export interface User {
    name:string
    coins: number
    email: string
    moves?:Move[] 
}
