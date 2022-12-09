import React, { useState } from 'react'
import useRefs from "react-use-refs"
import { ToastContainer, toast, Zoom } from "react-toastify"


import { createReserve } from '../../utils/actions'

export default () => {

    const [checkIn, checkOut, peopleQuantity, roomId, userId] = useRefs()
    const [loading, setLoading] = useState(false)


    const addReserve = async () =>  {
        setLoading(true)
        const params = `fecha_entrada=${checkIn.current.value}&fecha_salida=${checkOut.current.value}&cantidad_personas=${peopleQuantity.current.value}
        &id_habitacion=${roomId.current.value}&id_usuario=${userId.current.value}`

        const response = await createReserve(params)
        if(response.statusResponse) {
            resetRefs()
            toastSuccess("La reserva se almacenó con éxito!")
        }
        else {
            toastError("Upps! parece que tuvimos un error, vuelve a intentarlo más tarde.")
        }
        setLoading(false)
    }

    const resetRefs = () => {
        checkIn.current.value = ''
        checkOut.current.value = ''
        peopleQuantity.current.value = ''
        roomId.current.value = ''
        userId.current.value = ''
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
                <label>Fecha de entrada</label>
                <input ref={checkIn} roomId="text" autoComplete="none" required /> 
            </div>
            <div className="input__group">
                <label>Fecha de salida</label>
                <input ref={checkOut} roomId="text" autoComplete="none" required /> 
            </div>
            <div className="input__group">
                <label>Cantidad de personas</label>
                <input ref={peopleQuantity} roomId="text" autoComplete="none" required /> 
            </div>
            <div className="input__group">
                <label>Numero de habitación</label>
                <input ref={roomId} roomId="text" autoComplete="none" required /> 
            </div>
            <div className="input__group">
                <label>Id del usuario</label>
                <input ref={userId} roomId="text" autoComplete="none" required /> 
            </div>
            <button onClick={addReserve}>
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