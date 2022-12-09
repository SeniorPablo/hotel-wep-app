import { useEffect, useState } from 'react'
import useRefs from "react-use-refs"
import { ToastContainer, toast, Zoom } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faPenToSquare,
    faTrash
} from "@fortawesome/free-solid-svg-icons"

import { getRooms, updateRoom, deleteRoom } from '../../utils/actions'

export default () => {

    const $ = window.$
    const [loader, setLoader] = useState(true)
    const [rooms, setRooms] = useState()
    const [room, setRoom] = useState({
        numero_habitacion: '',
        capacidad: '',
        precio: '',
        tipo: '',
        caracteristicas: ''
    })


    useEffect(async () => {
        const response = await getRooms()
        if(response.statusResponse) {
            setRooms(response.data)
            setLoader(false)
        }
    }, [])

    const executeAction = (id, action) => {
        setRoom(rooms.find(room => room.id == id))
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
                            rooms.map(item => (
                                <div className="card__custom" key={item.id}>
                                    <div className="card__group">
                                        <p>Numero de habitación</p>
                                        <p>{item.numero_habitacion}</p>
                                    </div>
                                    <div className="card__group">
                                        <p>Capacidad</p>
                                        <p>{item.capacidad}</p>
                                    </div>
                                    <div className="card__group">
                                        <p>Precio</p>
                                        <p>{item.precio} COP</p>
                                    </div>
                                    <div className="card__group">
                                        <p>Tipo</p>
                                        <p>{item.tipo}</p>
                                    </div>
                                    <div className="card__group">
                                        <p>Características</p>
                                        <p>{item.caracteristicas}</p>
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
                        <UpdateModal room={room} rooms={rooms} setRooms={setRooms} />
                        <DeleteModal room={room} rooms={rooms} setRooms={setRooms} />
                    </div>
                )
            }
        </div>
    )
}

const UpdateModal = ({ room, rooms, setRooms }) => {
    const $ = window.$
    const [roomNumber, capacity, price, type, features] = useRefs()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        roomNumber.current.value = room.numero_habitacion
        capacity.current.value = room.capacidad
        price.current.value = room.precio
        type.current.value = room.tipo
        features.current.value = room.caracteristicas
    }, [room])
    
    const update = async () => {
        setLoading(true)
        const params = `numero_habitacion=${roomNumber.current.value}&capacidad=${capacity.current.value}&precio=${price.current.value}
        &tipo=${type.current.value}&caracteristicas=${features.current.value}&id=${room.id}`

        const response = await updateRoom(params)
        if(response.statusResponse) {
            let temp = rooms.map((item) => {
                if (item.id === room.id) {
                    return {
                        ...item,
                        numero_habitacion: roomNumber.current.value,
                        capacidad: capacity.current.value,
                        precio: price.current.value,
                        tipo: type.current.value,
                        caracteristicas: features.current.value,
                    }
                }
                return item
            })

            setRooms(temp)
            toastSuccess("¡La habitación se actualizó con éxito!")
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
                        <p>Modifique los siguientes campos para actualizar la habitación</p>
                        <button onClick={() => $('#updateModal').modal('hide')} className="modal__close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="modal__group--inline">
                            <div className="input__group">
                                <label>Numero de habitación</label>
                                <input ref={roomNumber} type="text" autoComplete="none" required defaultValue={roomNumber} /> 
                            </div>
                            <div className="input__group">
                                <label>Capacidad</label>
                                <input ref={capacity} type="text" autoComplete="none" required defaultValue={capacity} /> 
                            </div>
                        </div>
                        <div className="modal__group--inline">                      
                            <div className="input__group">
                                <label>Precio</label>
                                <input ref={price} type="text" autoComplete="none" required defaultValue={price} /> 
                            </div>
                            <div className="input__group">
                                <label>Tipo</label>
                                <input ref={type} type="text" autoComplete="none" required defaultValue={type} /> 
                            </div>
                        </div>
                        <div className="modal__group--inline">
                            <div className="input__group">
                                <label>Características</label>
                                <input ref={features} type="text" autoComplete="none" required defaultValue={features} /> 
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

const DeleteModal = ({ room, rooms, setRooms }) => {
    const $ = window.$
    const [loading, setLoading] = useState(false)

    const remove = async () => {
        setLoading(true)
        const response = await deleteRoom(room.id)
        if(response.statusResponse) {
            setRooms(rooms.filter(item => item.id !== room.id))
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