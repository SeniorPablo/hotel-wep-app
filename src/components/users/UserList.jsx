import { useEffect, useState } from 'react'
import useRefs from "react-use-refs"
import { ToastContainer, toast, Zoom } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faPenToSquare,
    faTrash
} from "@fortawesome/free-solid-svg-icons"

import { getUsers, updateUser, deleteUser } from '../../utils/actions'

export default () => {

    const $ = window.$
    const [loader, setLoader] = useState(true)
    const [users, setUsers] = useState()
    const [user, setUser] = useState({
        nombres: '',
        apellidos: '',
        edad: '',
        telefono: '',
        cedula: '',
        correo: ''
    })


    useEffect(async () => {
        const response = await getUsers()
        if(response.statusResponse) {
            setUsers(response.data)
            setLoader(false)
        }
    }, [])

    const executeAction = (id, action) => {
        setUser(users.find(user => user.id == id))
        toast.dismiss()
        if(action == "update") {
            $('#updateModal').modal('show')
        }
        else {
            $('#deleteModal').modal('show') 
        }
    }         
    
    return (
        <div className="admin__view">
            {
                loader ?
                (
                    <div className="loading__container">
                        <span 
                            className="spinner-border spinner-border-sm" 
                            role="status" 
                            aria-hidden="true"
                        >
                        </span> 
                    </div>
                ) :
                (
                    <div className="cards__container">
                        {
                            users.map(item => (
                                <div className="card__custom" key={item.id}>
                                    <div className="card__group">
                                        <p>Nombres</p>
                                        <p>{item.nombres}</p>
                                    </div>
                                    <div className="card__group">
                                        <p>Apellidos</p>
                                        <p>{item.apellidos}</p>
                                    </div>
                                    <div className="card__group">
                                        <p>Edad</p>
                                        <p>{item.edad}</p>
                                    </div>
                                    <div className="card__group">
                                        <p>Teléfono</p>
                                        <p>{item.telefono}</p>
                                    </div>
                                    <div className="card__group">
                                        <p>Identificación</p>
                                        <p>{item.cedula}</p>
                                    </div>
                                    <div className="card__group">
                                        <p>Correo electrónico</p>
                                        <p>{item.correo}</p>
                                    </div>
                                    <hr className="line"></hr>
                                    <div className="card__controls">
                                        <button onClick={() => executeAction(item.id, "update")}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button onClick={() => executeAction(item.id, "delete")}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                        <UpdateModal user={user} users={users} setUsers={setUsers} />
                        <DeleteModal user={user} users={users} setUsers={setUsers} />
                    </div>
                )
            }
        </div>
    )
}

const UpdateModal = ({ user, users, setUsers }) => {
    const $ = window.$
    const [firstName, lastName, age, phone, identification, email] = useRefs()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        firstName.current.value = user.nombres
        lastName.current.value = user.apellidos
        age.current.value = user.edad
        phone.current.value = user.telefono
        identification.current.value = user.cedula
        email.current.value = user.correo
    }, [user])
    
    const update = async () => {
        setLoading(true)
        const params = `nombres=${firstName.current.value}&apellidos=${lastName.current.value}&edad=${age.current.value}
        &telefono=${phone.current.value}&cedula=${identification.current.value}&correo=${email.current.value}&id=${user.id}`

        const response = await updateUser(params)
        if(response.statusResponse) {
            let temp = users.map((item) => {
                if (item.id === user.id) {
                    return {
                        ...item,
                        nombres: firstName.current.value,
                        apellidos: lastName.current.value,
                        edad: age.current.value,
                        telefono: phone.current.value,
                        cedula: identification.current.value,
                        correo: email.current.value
                    }
                }
                return item
            })

            setUsers(temp)
            toastSuccess("¡El usuario se actualizó con éxito!")
        }
        else {
            toastError("Upps! parece que tuvimos un error, vuelve a intentarlo más tarde.")
        }
        setLoading(false)
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
        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <p>Modifique los siguientes campos para actualizar el usuario</p>
                        <button onClick={() => $('#updateModal').modal('hide')} className="modal__close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="modal__group--inline">
                            <div className="input__group">
                                <label>Nombres</label>
                                <input ref={firstName} type="text" autoComplete="none" required defaultValue={firstName} /> 
                            </div>
                            <div className="input__group">
                                <label>Apellidos</label>
                                <input ref={lastName} type="text" autoComplete="none" required defaultValue={lastName} /> 
                            </div>
                        </div>
                        <div className="modal__group--inline">                      
                            <div className="input__group">
                                <label>Edad</label>
                                <input ref={age} type="text" autoComplete="none" required defaultValue={age} /> 
                            </div>
                            <div className="input__group">
                                <label>Teléfono</label>
                                <input ref={phone} type="text" autoComplete="none" required defaultValue={phone} /> 
                            </div>
                        </div>
                        <div className="modal__group--inline">
                            <div className="input__group">
                                <label>Identificacion</label>
                                <input ref={identification} type="text" autoComplete="none" required defaultValue={identification} /> 
                            </div>
                            <div className="input__group">
                                <label>Correo electrónico</label>
                                <input ref={email} type="text" autoComplete="none" required defaultValue={email} /> 
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button className="modal__update--button" onClick={update}>                            
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
                                    Actualizar
                                </span>
                            }
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

const DeleteModal = ({ user, users, setUsers }) => {
    const $ = window.$
    const [loading, setLoading] = useState(false)

    const remove = async () => {
        setLoading(true)
        const response = await deleteUser(user.id)
        if(response.statusResponse) {
            setUsers(users.filter(item => item.id !== user.id))
            $('#deleteModal').modal('hide')
        }
        else {
            
        }
        setLoading(false)
    }

    return (
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <p>¿Estás seguro?</p>
                        <button onClick={() => $('#deleteModal').modal('hide')} className="modal__close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p className="warning__information--text">
                            Estás a punto de eliminar permanentemente este elemento de la base de datos
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button className="modal__cancel--button">
                            Cancelar
                        </button>
                        <button className="modal__delete--button" onClick={remove}>
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
                                    ¡Sí, eliminar!
                                </span>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}