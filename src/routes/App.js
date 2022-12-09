import React, { useState, useEffect } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { useSelector } from 'react-redux'
import classNames from "classnames"
import { Container } from "react-bootstrap"

import '../styles/general.css'
import '../styles/framework-custom.css'
import '../styles/sidebar.css'
import Layout from "../components/Layout"
import Header from "../components/Header"
import Home from "../views/Home"
import Login from '../views/account/Login'
import UserMain from '../views/users/UserMain'
import UserCreate from '../views/users/UserCreate'
import RoomMain from '../views/rooms/RoomMain'
import RoomCreate from '../views/rooms/RoomCreate'
import ReserveMain from '../views/reserves/ReserveMain'
import ReserveCreate from '../views/reserves/ReserveCreate'
import SideBar from '../components/sidebar/SideBar'

export default function App() {
    const BASE_URL = window.BASE_URL
    const userLogged = useSelector(state => state.userLogged)

    let previousWidth = -1
    const [state, setState] = useState({
        isOpen: false,
        isMobile: true
    })

    useEffect(() => {
        updateWidth()
        window.addEventListener("resize", updateWidth.bind(this))

        return () => {
            window.removeEventListener("resize", updateWidth.bind(this))
        }
    }, [])
    
    const updateWidth = () => {
        const width = window.innerWidth
        const widthLimit = 576
        const isMobile = width <= widthLimit
        const wasMobile = previousWidth <= widthLimit

        if (isMobile !== wasMobile) {
            setState({
                isOpen: !isMobile
            })
        }

        previousWidth = width
    }

    const toggle = () => {
        setState({ isOpen: !state.isOpen })
    }

    return (
        <BrowserRouter>
            <Layout>
                {
                    userLogged 
                    ? (
                    <>
                        <SideBar toggle={toggle} isOpen={state.isOpen} />
                        <Container fluid className={classNames("content", { "is-open": state.isOpen })}>
                            <Header toggle={toggle} />
                            <div className="section">
                                <Switch>
                                    <Route exact path={`${BASE_URL}/`} component={Home} />
                                    <Route exact path={`${BASE_URL}/user-list`} component={UserMain} />
                                    <Route exact path={`${BASE_URL}/user-create`} component={UserCreate} />
                                    <Route exact path={`${BASE_URL}/room-list`} component={RoomMain} />
                                    <Route exact path={`${BASE_URL}/room-create`} component={RoomCreate} />
                                    <Route exact path={`${BASE_URL}/reserve-list`} component={ReserveMain} />
                                    <Route exact path={`${BASE_URL}/reserve-create`} component={ReserveCreate} />
                                </Switch>
                            </div>
                        </Container>
                    </>
                    ) :
                    (
                    <Switch>
                        <Route exact path={`${BASE_URL}/`} component={Login} />
                    </Switch>
                    )
                }
            </Layout>
        </BrowserRouter>
    )
}
