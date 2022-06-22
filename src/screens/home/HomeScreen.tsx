import { Screen } from "../../components/screen/Screen"
import css from "./HomeScreen.module.css"
import { Block } from "../../components/grid/Block"
import { Grid } from "../../components/grid/Grid"

export const HomeScreen = () => {
  return (
    <Screen title="Inicio">
      <Grid>
        <Block title="Módulo de Ventas" isFixed className={css.one}></Block>
        <Block title="Productos" className={css.two}></Block>
        <Block title="Clientes" className={css.three}></Block>
        <Block title="Proveedores" className={css.four}></Block>
      </Grid>
    </Screen>
  )
}
