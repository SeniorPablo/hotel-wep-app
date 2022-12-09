import { useEffect, useState } from 'react'
import useRefs from "react-use-refs"
import { ToastContainer, toast, Zoom } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faPenToSquare,
    faTrash
} from "@fortawesome/free-solid-svg-icons"

import { getReserves, updateReserve, deleteReserve } from '../../utils/actions'

export default () => {

    const $ = window.$
    const [loader, setLoader] = useState(true)
    const [reserves, setReserves] = useState()
    const [reserve, setReserve] = useState({
        fecha_entrada: '',
        fecha_salida: '',
        cantidad_personas: '',
        id_habitacion: '',
        id_usuario: ''
    })


    useEffect(async () => {
        const response = await getReserves()
        if(response.statusResponse) {
            setReserves(response.data)
            setLoader(false)
        }
    }, [])

    const executeAction = (id, action) => {
        setReserve(reserves.find(reserve => reserve.id == id))
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
                            reserves.map(item => (
                                <div className="card__custom" key={item.id}>
                                    <div className="card__group">
                                        <p>Fecha de entrada</p>
                                        <p>{item.fecha_entrada}</p>
                                    </div>
                                    <div className="card__group">
                                        <p>Fecha de salida</p>
                                        <p>{item.fecha_salida}</p>
                                    </div>
                                    <div className="card__group">
                                        <p>Cantidad de personas</p>
                                        <p>{item.cantidad_personas}</p>
                                    </div>
                                    <div className="card__group">
                                        <p>Numero de habitación</p>
                                        <p>{item.id_habitacion}</p>
                                    </div>
                                    <div className="card__group">
                                        <p>Id del usuario</p>
                                        <p>{item.id_usuario}</p>
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
                        <UpdateModal reserve={reserve} reserves={reserves} setReserves={setReserves} />
                        <DeleteModal reserve={reserve} reserves={reserves} setReserves={setReserves} />
                    </div>
                )
            }
        </div>
    )
}

const UpdateModal = ({ reserve, reserves, setReserves }) => {
    const $ = window.$
    const [checkIn, checkOut, peopleQuantity, roomId, userId] = useRefs()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        checkIn.current.value = reserve.fecha_entrada
        checkOut.current.value = reserve.fecha_salida
        peopleQuantity.current.value = reserve.cantidad_personas
        roomId.current.value = reserve.id_habitacion
        userId.current.value = reserve.id_usuario
    }, [reserve])
    
    const update = async () => {
        setLoading(true)
        const params = `fecha_entrada=${checkIn.current.value}&fecha_salida=${checkOut.current.value}&cantidad_personas=${peopleQuantity.current.value}
        &id_habitacion=${roomId.current.value}&id_usuario=${userId.current.value}&id=${reserve.id}`

        const response = await updateReserve(params)
        if(response.statusResponse) {
            let temp = reserves.map((item) => {
                if (item.id === reserve.id) {
                    return {
                        ...item,
                        fecha_entrada: checkIn.current.value,
                        fecha_salida: checkOut.current.value,
                        cantidad_personas: peopleQuantity.current.value,
                        id_habitacion: roomId.current.value,
                        id_usuario: userId.current.value,
                    }
                }
                return item
            })

            setReserves(temp)
            toastSuccess("¡La reserva se actualizó con éxito!")
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
                                <label>Fecha de entrada</label>
                                <input ref={checkIn} roomId="text" autoComplete="none" required defaultValue={checkIn} /> 
                            </div>
                            <div className="input__group">
                                <label>Fecha de salida</label>
                                <input ref={checkOut} roomId="text" autoComplete="none" required defaultValue={checkOut} /> 
                            </div>
                        </div>
                        <div className="modal__group--inline">                      
                            <div className="input__group">
                                <label>Cantidad de personas</label>
                                <input ref={peopleQuantity} roomId="text" autoComplete="none" required defaultValue={peopleQuantity} /> 
                            </div>
                            <div className="input__group">
                                <label>Numero de habitación</label>
                                <input ref={roomId} roomId="text" autoComplete="none" required defaultValue={roomId} /> 
                            </div>
                        </div>
                        <div className="modal__group--inline">
                            <div className="input__group">
                                <label>Id del usuario</label>
                                <input ref={userId} roomId="text" autoComplete="none" required defaultValue={userId} /> 
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

const DeleteModal = ({ reserve, reserves, setReserves }) => {
    const $ = window.$
    const [loading, setLoading] = useState(false)

    const remove = async () => {
        setLoading(true)
        const response = await deleteReserve(reserve.id)
        if(response.statusResponse) {
            setReserves(reserves.filter(item => item.id !== reserve.id))
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