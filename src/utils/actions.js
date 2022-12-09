import axios from 'axios'

const API_URL = window.API_URL

export const createUser = async (params) => {
    const result = { statusResponse: true, error: null, id: 0 }
    await axios.post(`${API_URL}/usuario-crear?${params}`)
    .then(response => {
        result.id = response.data
    })
    .catch(error => {
        result.statusResponse = false
        result.error = error.response
    })

    return result
}

export const getUsers = async () => {
    const result = { statusResponse: true, error: null, data: null }
    await axios.get(`${API_URL}/usuario`)
    .then(response => {
        result.data = response.data
    })
    .catch(error => {
        result.statusResponse = false
        result.error = error.response
    })

    return result
}

export const updateUser = async (params) => {
    const result = { statusResponse: true, error: null, data: null }
    await axios.post(`${API_URL}/usuario-actualizar?${params}`)
    .then(response => {
        result.data = response.data
    })
    .catch(error => {
        result.statusResponse = false
        result.error = error.response
    })

    return result
}

export const deleteUser = async (id) => {
    const result = { statusResponse: true, error: null, data: null }
    await axios.get(`${API_URL}/usuario-eliminar/${id}`)
    .then(response => {
        result.data = response.data
    })
    .catch(error => {
        result.statusResponse = false
        result.error = error.response
    })

    return result
}

export const createRoom = async (params) => {
    const result = { statusResponse: true, error: null, id: 0 }
    await axios.post(`${API_URL}/habitacion-crear?${params}`)
    .then(response => {
        result.id = response.data
    })
    .catch(error => {
        result.statusResponse = false
        result.error = error.response
    })

    return result
}

export const getRooms = async () => {
    const result = { statusResponse: true, error: null, data: null }
    await axios.get(`${API_URL}/habitacion`)
    .then(response => {
        result.data = response.data
    })
    .catch(error => {
        result.statusResponse = false
        result.error = error.response
    })

    return result
}

export const updateRoom = async (params) => {
    const result = { statusResponse: true, error: null, data: null }
    await axios.post(`${API_URL}/habitacion-actualizar?${params}`)
    .then(response => {
        result.data = response.data
    })
    .catch(error => {
        result.statusResponse = false
        result.error = error.response
    })

    return result
}

export const deleteRoom = async (id) => {
    const result = { statusResponse: true, error: null, data: null }
    await axios.get(`${API_URL}/habitacion-eliminar/${id}`)
    .then(response => {
        result.data = response.data
    })
    .catch(error => {
        result.statusResponse = false
        result.error = error.response
    })

    return result
}

export const createReserve = async (params) => {
    const result = { statusResponse: true, error: null, id: 0 }
    await axios.post(`${API_URL}/reserva-crear?${params}`)
    .then(response => {
        result.id = response.data
    })
    .catch(error => {
        result.statusResponse = false
        result.error = error.response
    })

    return result
}

export const getReserves = async () => {
    const result = { statusResponse: true, error: null, data: null }
    await axios.get(`${API_URL}/reserva`)
    .then(response => {
        result.data = response.data
    })
    .catch(error => {
        result.statusResponse = false
        result.error = error.response
    })

    return result
}

export const updateReserve = async (params) => {
    const result = { statusResponse: true, error: null, data: null }
    await axios.post(`${API_URL}/reserva-actualizar?${params}`)
    .then(response => {
        result.data = response.data
    })
    .catch(error => {
        result.statusResponse = false
        result.error = error.response
    })

    return result
}

export const deleteReserve = async (id) => {
    const result = { statusResponse: true, error: null, data: null }
    await axios.get(`${API_URL}/reserva-eliminar/${id}`)
    .then(response => {
        result.data = response.data
    })
    .catch(error => {
        result.statusResponse = false
        result.error = error.response
    })

    return result
}
