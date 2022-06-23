import React from "react"
import css from "./App.module.css"
import { AppContextComponent } from "./contexts/AppContext"
import { Route, Routes } from "react-router-dom"
import { PointOfSaleScreen } from "./screens/point_of_sale/PointOfSaleScreen"
import { TransactionsScreen } from "./screens/transactions/TransactionsScreen"
import { ProductsScreen } from "./screens/products/ProductsScreen"
import { EntitiesScreen } from "./screens/entities/EntitiesScreen"
import { _Error404 } from "./screens/_Error404"
import { Header } from "./components/header/Header"
import { Navbar } from "./components/navbar/Navbar"

function App() {
  return (
    <AppContextComponent>
      <div className={css.app}>
        <div className={css.navbar}>
          <Navbar />
        </div>
        <div className={css.content}>
          <div className={css.header}>
            <Header />
          </div>
          <div className={css.body}>
            <Routes>
              <Route path="/entities" element={<EntitiesScreen />} />
              <Route path="/products" element={<ProductsScreen />} />
              <Route path="/transactions" element={<TransactionsScreen />} />
              <Route path="/" element={<PointOfSaleScreen />} />
              <Route path="*" element={<_Error404 />} />
            </Routes>
          </div>
        </div>
      </div>
    </AppContextComponent>
  )
}

export default App
