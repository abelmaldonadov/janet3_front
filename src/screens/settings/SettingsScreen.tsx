import { Screen } from "../../components/screen/Screen"
import { Grid } from "../../components/grid/Grid"
import { Block } from "../../components/grid/Block"
import css from "./SettingsScreen.module.css"
import { Table } from "../../components/table/Table"
import { TableRow } from "../../components/table/TableRow"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { User, USER_MODEL } from "../../models/User"
import { Level, State } from "../../models/Meta"
import { Loader } from "../../components/loader/Loader"
import { Form } from "../../components/form/Form"
import { Row } from "../../components/grid/Row"
import { Input } from "../../components/form/Input"
import { Button } from "../../components/form/Button"
import { AppContext } from "../../contexts/AppContext"
import { Entity } from "../../models/Entity"
import { clone } from "../../utils/clone"
import { handleErrors } from "../../utils/handleErrors"

export const SettingsScreen = () => {
  const { REACT_APP_API_ROUTE: API_ROUTE } = process.env
  const { headers, signOut } = useContext(AppContext)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [users, setUsers] = useState<User[]>([])
  const [entities, setEntities] = useState<any[]>([] as Entity[])
  const [meta, setMeta] = useState<any>()
  const [userSel, setUserSel] = useState<User>({} as User)
  const [userId, setUserId] = useState<number>()

  useEffect(() => {
    return () => {
      getAllData()
    }
  }, [])

  useEffect(() => {
    setUserSel(clone(USER_MODEL))
    if (userId) {
      getData()
    }
  }, [userId])

  const getAllData = async () => {
    try {
      const users = await axios.get(`${API_ROUTE}/api/users`, { headers })
      setUsers(users.data.data)
      const entities = await axios.get(`${API_ROUTE}/api/entities`, { headers })
      setEntities(entities.data.data.reverse())
      setMeta(users.data.meta)
    } catch (error) {
      handleErrors(error, signOut)
    } finally {
      setLoading(false)
    }
  }

  const getData = async () => {
    try {
      const users = await axios.get(`${API_ROUTE}/api/users/${userId}`, { headers })
      setUserSel(users.data.data[0])
    } catch (error) {
      handleErrors(error, signOut)
    }
  }

  const updateData = async () => {
    try {
      await axios.put(`${API_ROUTE}/api/users/${userId}`, userSel, { headers })
      await getAllData()
      setUserId(undefined)
    } catch (error) {
      handleErrors(error, signOut)
    }
  }

  const createData = async () => {
    try {
      await axios.post(`${API_ROUTE}/api/users`, userSel, { headers })
      await getAllData()
      setUserSel(clone(USER_MODEL))
    } catch (error) {
      handleErrors(error, signOut)
    }
  }

  const deleteData = async (id: any) => {
    if (!window.confirm("¿Está seguro de eliminar el item?")) return
    try {
      await axios.delete(`${API_ROUTE}/api/users/${id}`, { headers })
      await getAllData()
    } catch (error) {
      handleErrors(error, signOut)
    }
  }

  if (isLoading) return <Loader />

  return (
    <Screen title="Ajustes">
      <Grid>
        <Block title="Agentes" className={css.one}>
          <Table headers={["Id", "Username", "Entidad", "Nivel de Acceso", "Estado", ""]}>
            {users.map((item) => (
              <TableRow
                key={item.id}
                isSelected={userId === item.id}
                selectRow={() => setUserId(item.id)}
                deleteRow={() => deleteData(item.id)}
              >
                {[
                  { style: "number", value: item.id },
                  { style: "", value: item.username },
                  {
                    style: "",
                    value: entities.find((en) => en.id === item.entity).name,
                    fkId: item.entity,
                  },
                  {
                    style: "level",
                    value: meta.levels.find((le: Level) => le.id === item.level).name,
                    fkId: item.level,
                  },
                  {
                    style: "state",
                    value: meta.states.find((st: State) => st.id === item.state).name,
                    fkId: item.state,
                  },
                ]}
              </TableRow>
            ))}
          </Table>
        </Block>
        <Block title="Vista de Agente" className={css.two}>
          <Form>
            <Input
              label="Username"
              value={userSel?.username}
              type="text"
              onChange={(val: string) => setUserSel({ ...userSel, username: val })}
            />
            <Input
              label="Contraseña"
              value={userSel?.password}
              type="password"
              onChange={(val: string) => setUserSel({ ...userSel, password: val })}
            />
            <Input
              label="Entidad"
              value={userSel?.entity}
              type="select"
              options={entities.filter((item) => item.role === 3)}
              onChange={(val: number) => setUserSel({ ...userSel, entity: val })}
            />
            <Row template={[1, 1]}>
              <Input
                label="Nivel de Acceso"
                value={userSel?.level}
                type="select"
                options={meta.levels}
                onChange={(val: number) => setUserSel({ ...userSel, level: val })}
              />
              <Input
                label="Estado"
                value={userSel?.state}
                type="select"
                options={meta.states}
                onChange={(val: number) => setUserSel({ ...userSel, state: val })}
              />
            </Row>
            <Row template={[1, 1]}>
              <Button text="Cancelar" isBlock onClick={() => setUserId(undefined)} />
              <Button text="Salvar" isBlock onClick={userId ? () => updateData() : () => createData()} />
            </Row>
          </Form>
        </Block>
      </Grid>
    </Screen>
  )
}
