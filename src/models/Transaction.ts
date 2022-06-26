import { Entity } from "./Entity"

export interface TransactionDetail {
  id?: number
  price: number
  quantity: number
  subtotal: number
  coin: number
  transaction?: number
  product: number
  state: number
}
export interface Transaction {
  id?: number
  date: string
  total: number
  coin: number
  transactionType: number
  tracking: number
  entity: number
  state: number
}
export const TRANSACTION_MODEL: Transaction = {
  date: "",
  total: 0,
  coin: 1,
  transactionType: 1,
  tracking: 2,
  entity: 1,
  state: 1,
}
