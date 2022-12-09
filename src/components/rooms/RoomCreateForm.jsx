import React, { useState } from 'react'
import useRefs from "react-use-refs"
import { ToastContainer, toast, Zoom } from "react-toastify"


import { createRoom } from '../../utils/actions'

export default () => {

    const [roomNumber, capacity, price, type, features] = useRefs()
    const [loading, setLoading] = useState(false)


    const addRoom = async () =>  {
        setLoading(true)
        const params = `numero_habitacion=${roomNumber.current.value}&capacidad=${capacity.current.value}&precio=${price.current.value}
        &tipo=${type.current.value}&caracteristicas=${features.current.value}`

        const response = await createRoom(params)
        if(response.statusResponse) {
            resetRefs()
            toastSuccess("El habitación se almacenó con éxito!")
        }
        else {
            toastError("Upps! parece que tuvimos un error, vuelve a intentarlo más tarde.")
        }
        setLoading(false)
    }

    const resetRefs = () => {
        roomNumber.current.value = ''
        capacity.current.value = ''
        price.current.value = ''
        type.current.value = ''
        features.current.value = ''
    }

    const toastSuccess = (message) => {
        toast.success(`${message}`, {
          position: "bottom-right",
          autoClose: false,
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Zoom,
        })
    }

    const toastError = (error) => {
        toast.error(`${error}`, {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Zoom,
        })
    }

    return (
        <div className="create__form">
            <p>Ingrese los siguientes datos para crear un nuevo habitación</p>
            <div className="input__group">
                <label>Numero de habitación</label>
                <input ref={roomNumber} type="text" autoComplete="none" required /> 
            </div>
            <div className="input__group">
                <label>Capacidad</label>
                <input ref={capacity} type="text" autoComplete="none" required /> 
            </div>
            <div className="input__group">
                <label>Precio</label>
                <input ref={price} type="text" autoComplete="none" required /> 
            </div>
            <div className="input__group">
                <label>Tipo</label>
                <input ref={type} type="text" autoComplete="none" required /> 
            </div>
            <div className="input__group">
                <label>Características</label>
                <input ref={features} type="text" autoComplete="none" required /> 
            </div>
            <button onClick={addRoom}>
                {
                    loading 
                    ? 
                    <span 
                        className="spinner-border spinner-border-sm" 
                        role="status" 
                        aria-hidden="true"
                    >
                    </span> 
                    : 
                    <span>
                        Registrar
                    </span>
                }
            </button>
            <ToastContainer />
        </div>
    )
}