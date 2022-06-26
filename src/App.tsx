import React, { useContext, useEffect, useState } from "react"
import css from "./App.module.css"
import { AppContext, AppContextComponent, HEADERS_MODEL } from "./contexts/AppContext"
import { Route, Routes } from "react-router-dom"
import { PointOfSaleScreen } from "./screens/point_of_sale/PointOfSaleScreen"
import { TransactionsScreen } from "./screens/transactions/TransactionsScreen"
import { ProductsScreen } from "./screens/products/ProductsScreen"
import { EntitiesScreen } from "./screens/entities/EntitiesScreen"
import { _Error404 } from "./screens/errors/_Error404"
import { Header } from "./components/header/Header"
import { Navbar } from "./components/navbar/Navbar"
import { SettingsScreen } from "./screens/settings/SettingsScreen"
import { SignInScreen } from "./screens/sign_in/SignInScreen"
import { ExitScreen } from "./screens/exit/ExitScreen"
const { REACT_APP_API_ROUTE: API_ROUTE } = process.env

function App() {
  const { session, setSession, setHeaders, setUser, signOut } = useContext(AppContext)

  useEffect(() => {
    return () => {
      // Validar sesión guardada en localStorage al refrescar
      validateSession()
    }
  }, [])

  const validateSession = async () => {
    const localSession = localStorage.getItem("janet3Session")
    const localUser = localStorage.getItem("janet3User")
    if (localSession && localUser) {
      try {
        const session = JSON.parse(localSession)
        const user = JSON.parse(localUser)
        const token = session.token
        const userId = session.user
        setSession(session)
        setUser(user)
        setHeaders({ ...HEADERS_MODEL, token, user: userId })
      } catch (error) {
        signOut()
      }
    } else {
      // Nothing
    }
  }

  return (
    <>
      {session.token ? (
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
                <Route path="/exit" element={<ExitScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
                <Route path="/entities" element={<EntitiesScreen />} />
                <Route path="/products" element={<ProductsScreen />} />
                <Route path="/transactions" element={<TransactionsScreen />} />
                <Route path="/" element={<PointOfSaleScreen />} />
                <Route path="*" element={<_Error404 />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <div className={css.app}>
          <Routes>
            <Route path="*" element={<SignInScreen />} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App
