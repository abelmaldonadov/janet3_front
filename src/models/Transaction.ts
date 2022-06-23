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
