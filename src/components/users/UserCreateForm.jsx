import React, { useState } from 'react'
import useRefs from "react-use-refs"
import { ToastContainer, toast, Zoom } from "react-toastify"


import { createUser } from '../../utils/actions'

export default () => {

    const [firstName, lastName, age, phone, identification, email] = useRefs()
    const [loading, setLoading] = useState(false)


    const addUser = async () =>  {
        setLoading(true)
        const params = `nombres=${firstName.current.value}&apellidos=${lastName.current.value}&edad=${age.current.value}
        &telefono=${phone.current.value}&cedula=${identification.current.value}&correo=${email.current.value}`

        const response = await createUser(params)
        if(response.statusResponse) {
            resetRefs()
            toastSuccess("El usuario se almacenó con éxito!")
        }
        else {
            toastError("Upps! parece que tuvimos un error, vuelve a intentarlo más tarde.")
        }
        setLoading(false)
    }

    const resetRefs = () => {
        firstName.current.value = ''
        lastName.current.value = ''
        age.current.value = ''
        phone.current.value = ''
        identification.current.value = ''
        email.current.value = ''
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
            <p>Ingrese los siguientes datos para crear un nuevo usuario</p>
            <div className="input__group">
                <label>Nombres</label>
                <input ref={firstName} type="text" autoComplete="none" required /> 
            </div>
            <div className="input__group">
                <label>Apellidos</label>
                <input ref={lastName} type="text" autoComplete="none" required /> 
            </div>
            <div className="input__group">
                <label>Edad</label>
                <input ref={age} type="text" autoComplete="none" required /> 
            </div>
            <div className="input__group">
                <label>Teléfono</label>
                <input ref={phone} type="text" autoComplete="none" required /> 
            </div>
            <div className="input__group">
                <label>Identificacion</label>
                <input ref={identification} type="text" autoComplete="none" required /> 
            </div>
            <div className="input__group">
                <label>Correo electrónico</label>
                <input ref={email} type="text" autoComplete="none" required /> 
            </div>
            <button onClick={addUser}>
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