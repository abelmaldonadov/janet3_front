import { Screen } from "../../components/screen/Screen"
import { Grid } from "../../components/grid/Grid"
import { Block } from "../../components/grid/Block"
import css from "./PlannerScreen.module.css"
import { Input } from "../../components/form/Input"
import { useEffect, useState } from "react"
import { addDate, numberOfDay } from "../../utils/numberOfDay"
import { Row } from "../../components/grid/Row"

export const PlannerScreen = () => {
  const [dateStart, setDateStart] = useState(new Date().toISOString().substring(0, 10))
  const [dateEnd, setDateEnd] = useState(
    new Date(addDate(new Date(dateStart), 7, 1)).toISOString().substring(0, 10)
  )
  const [dates, setDates] = useState({ days: 0, months: 0 })
  const [typeDate, setTypeDate] = useState<number>(1)
  const [plannerDates, setPlannerDates] = useState<Array<any>>([])

  function renderDate() {
    setPlannerDates([])
    let arrayDate = []
    // tipos de TypeDate: 1: Dias; 2 Meses
    if (typeDate === 1) {
      for (let i = 0; i <= dates.days; i++) {
        let date = addDate(new Date(dateStart), i, 1).toISOString().substring(0, 10)
        arrayDate.push(
          <div key={i} className={css.colDay}>
            {date}
          </div>
        )
      }
    } else if (typeDate === 2) {
      for (let i = 0; i <= dates.months; i++) {
        let date = addDate(new Date(dateStart), i, 1).toISOString().substring(0, 10).substring(0, 7)
        arrayDate.push(
          <div key={i} className={css.colDay}>
            {date}
          </div>
        )
      }
    }
    setPlannerDates(arrayDate)
  }

  useEffect(() => {
    setDates(numberOfDay(dateStart, dateEnd))
  }, [dateStart, dateEnd])

  useEffect(() => {
    renderDate()
  }, [typeDate, dates])

  return (
    <Screen title="Planificador">
      <Grid>
        <Block title="Gantt" className={css.one}>
          <Row template={[1, 1, 1]}>
            <Input label="Date Start" type="date" onChange={setDateStart} value={dateStart} />
            <Input label="Date End" type="date" onChange={setDateEnd} value={dateEnd} />
            <Input
              label="Days, Weeks or Month"
              type="select"
              options={[
                { id: 1, name: "Days" },
                { id: 2, name: "Months" },
              ]}
              onChange={setTypeDate}
              value={typeDate}
            />
          </Row>
          <div className={css.contentPlanner}>{plannerDates}</div>
        </Block>
        <Block title="Proyectos" className={css.two}></Block>
      </Grid>
    </Screen>
  )
}
