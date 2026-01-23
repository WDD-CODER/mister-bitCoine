import { ReceiveMove } from "./receive-move.model"

export interface Contact {
    name: string
    email: string
    phone: string
    _id: string
    birthday?:Date
    coins?:number
    receivedMove?:ReceiveMove[]
}
