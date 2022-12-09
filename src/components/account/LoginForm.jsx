import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { isEmpty } from "lodash"
import { ToastContainer, toast, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { toggleLoginUser } from "../../redux/actions"
import Background from "../../assets/images/bg.svg"
import Avatar from "../../assets/images/avatar.svg"
import Wave from "../../assets/images/wave.png"

export default function LoginForm() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({ user: "", password: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput({
      ...input,
      [name]: value,
    })
  }

  const loginUser = async () => {
    if (formValidate()) {
      if(input.user === "admin" & input.password === "Medellin1.") {
        dispatch(toggleLoginUser())
      }
      else {
        toastError("Las credenciales ingresadas son incorrectas.")
      }
    }
  }

  const formValidate = () => {
    toast.dismiss()
    let isValid = true

    if (isEmpty(input.user)) {
      toastError("Debes ingresar el usuario.")
      isValid = false
    }

    if (isEmpty(input.password)) {
      toastError("Debes ingresar la contraseña.")
      isValid = false
    }

    return isValid
  }

  const toastError = (error) => {
    toast.error(`${error}`, {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      type: "error",
      theme: "colored",
      transition: Zoom,
    })
  }


  return (
    <section className="login-form">
      <img className="login-form__wave" src={Wave} />
      <div className="login-form__container">
        <div className="login-form__img">
          <img src={Background} />
        </div>
        <div className="login-form__content">
          <form>
            <img src={Avatar} />
            <h2 className="login-form__title">Bienvenido</h2>
            <div className="login-form__input-div one">
              <div className="login-form__i">
                <i className="bx bxs-user"></i>
              </div>
              <div className="login-form__div">
                <input 
                  type="text" 
                  className="login-form__input" 
                  placeholder="Usuario" 
                  onChange={handleChange} 
                  name="user" 
                  autoComplete="off" 
                />
              </div>
            </div>
            <div className="login-form__input-div pass">
              <div className="login-form__i">
                <i className="bx bx-key"></i>
              </div>
              <div className="login-form__div">
                <input 
                  type="password" 
                  className="login-form__input" 
                  placeholder="Contraseña" 
                  onChange={handleChange} 
                  name="password" 
                  autoComplete="off" 
                />
              </div>
            </div>
            <button type="button" className="btn" onClick={loginUser}>
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
                <span>Siguiente</span>
              }
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  )
}
