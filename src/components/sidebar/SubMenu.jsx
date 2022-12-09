import React, { useState } from "react"
import { Accordion, Nav } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import { useHistory } from "react-router-dom"

export default ({ icon, title, items }) => {
  const history = useHistory()
  const BASE_URL = window.BASE_URL

    return (
      <Nav.Item>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey={0} >
            <Accordion.Header>
              <FontAwesomeIcon icon={icon} className="mr-2" />
              <p>{title}</p>
            </Accordion.Header>
            <Accordion.Body>
              {items.map(item => (
                <button
                  className="sidebar-item"
                  onClick={() => history.push(`${BASE_URL}/${item.route}`)}
                  key={item.name}
                >
                  {item.name}
                </button>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Nav.Item>
    )
}

