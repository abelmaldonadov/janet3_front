// Aux
export interface Coin {
  id: number
  name: string
  symbol: string
  abbr: string
}
export interface Level {
  id: number
  name: string
}
export interface Role {
  id: number
  name: string
}
export interface Seen {
  id: number
  name: string
}
export interface State {
  id: number
  name: string
}
export interface Tracking {
  id: number
  name: string
}
export interface TransactionType {
  id: number
  name: string
}
// Conf
interface Route {
  id?: number
  name?: string
  route?: string
  parentId?: number
  level?: number
  state?: number
}
interface User {
  id?: number
  username?: string
  password?: string
  entity?: number
  level?: number
  state?: number
}
export interface Meta {
  // Aux
  coins: Array<Coin>
  levels: Array<Level>
  roles: Array<Role>
  seen: Array<Seen>
  states: Array<State>
  tracking: Array<Tracking>
  transactionTypes: Array<TransactionType>
  // Conf
  routes: Array<Route>
  users: Array<User>
}
