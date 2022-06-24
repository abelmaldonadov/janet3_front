import { Link, useLocation, useParams, useRoutes } from "react-router-dom"
import css from "./Navbar.module.css"
import {
  BiBarChartAlt2,
  BiCoffeeTogo,
  BiDollarCircle,
  BiDoorOpen,
  BiFace,
  BiPackage,
  BiWrench,
} from "react-icons/bi"
import { NavOption } from "./NavOption"

export const Navbar = () => {
  const business = {
    icon: <BiDollarCircle size="1.8rem" color="rgba(255, 255, 255, 0.75)" />,
    name: "Janet 3",
    route: "/",
  }
  const settings = {
    icon: <BiWrench size="1.5rem" color="rgba(255, 255, 255, 0.75)" />,
    name: "Ajustes",
    route: "/settings",
  }
  const exit = {
    icon: <BiDoorOpen size="1.5rem" color="rgba(255, 255, 255, 0.75)" />,
    name: "Salir",
    route: "/exit",
  }
  const routes = [
    {
      icon: <BiCoffeeTogo size="1.5rem" color="rgba(255, 255, 255, 0.75)" />,
      name: "Point of Sale",
      route: "/",
    },
    {
      icon: <BiPackage size="1.5rem" color="rgba(255, 255, 255, 0.75)" />,
      name: "Productos",
      route: "/products",
    },
    {
      icon: <BiFace size="1.5rem" color="rgba(255, 255, 255, 0.75)" />,
      name: "Entidades",
      route: "/entities",
    },
    {
      icon: <BiBarChartAlt2 size="1.5rem" color="rgba(255, 255, 255, 0.75)" />,
      name: "Transacciones",
      route: "/transactions",
    },
  ]
  const location = useLocation()

  return (
    <div className={css.container}>
      <div className={css.header}>
        <Link to={business.route} className={css.avatar}>
          {business.icon}
          <span className={css.avatarText}>{business.name}</span>
        </Link>
      </div>
      <div className={css.body}>
        {routes.map((item, index) => (
          <NavOption
            key={index}
            icon={item.icon}
            name={item.name}
            route={item.route}
            isSelected={location.pathname === item.route}
          />
        ))}
      </div>
      <div className={css.footer}>
        <NavOption
          icon={settings.icon}
          name={settings.name}
          route={settings.route}
          isSelected={location.pathname === settings.route}
        />
        <NavOption
          icon={exit.icon}
          name={exit.name}
          route={exit.route}
          isSelected={location.pathname === exit.route}
        />
      </div>
    </div>
  )
}
