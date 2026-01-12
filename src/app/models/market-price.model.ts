export interface MarketPrice {
    status: string
    name: string
    unit: number,
    period: string,
    description: string
    values: {x:number, y:number}[]
}
