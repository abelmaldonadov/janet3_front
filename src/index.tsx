import React from "react"
import ReactDOM from "react-dom/client"
import "normalize.css"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { AppContextComponent } from "./contexts/AppContext"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextComponent>
        <App />
      </AppContextComponent>
    </BrowserRouter>
  </React.StrictMode>
)
