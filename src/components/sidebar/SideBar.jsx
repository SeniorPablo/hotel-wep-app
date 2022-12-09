import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTimes, 
  faUser,
  faPersonBooth,
  faAddressCard,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import SubMenu from "./SubMenu"
import { Nav, Button } from "react-bootstrap"
import classNames from "classnames"
import { useDispatch } from "react-redux"

import { toggleLoginUser } from "../../redux/actions"


export default ({ toggle, isOpen }) => {

    const dispatch = useDispatch()

    return (
      <div className={classNames("sidebar", { "is-open": isOpen })}>
        <div className="sidebar-header">
          <Button
            variant="link"
            onClick={toggle}
            style={{ color: "#fff" }}
            className="mt-4"
          >
            <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
          </Button>
          <h3>Hotel Admin</h3>
        </div>

        <Nav className="flex-column pt-2">
          <p className="sidebar__heading">Menú</p>

          <SubMenu
            title="Usuarios"
            icon={faUser}
            items={[{ name: "Crear", route: "user-create"}, { name: "Consultar", route: "user-list" }]}
          />

          <SubMenu
            title="Habitaciones"
            icon={faPersonBooth}
            items={[{ name: "Crear", route: "room-create"}, { name: "Consultar", route: "room-list" }]}
          />

          <SubMenu
            title="Reservas"
            icon={faAddressCard}
            items={[{ name: "Crear", route: "reserve-create"}, { name: "Consultar", route: "reserve-list" }]}
          />

          <Nav.Item className="sign-out__button">
            <Nav.Link href="/" onClick={() => dispatch(toggleLoginUser(false))}>
              <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
              <p>Salir</p>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    )
}
