import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"

const Edit = () => {
    // Actualización de estados para manejar los nuevos campos
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [correocontraseña, setCorreocontraseña] = useState('')
    const [contraseñasipre, setContraseñasipre] = useState('')
    const [otro, setOtro] = useState('')

    const navigate = useNavigate()    
    const { id } = useParams()

    const updateCliente = async (e) => {
        e.preventDefault()
        const cliente = doc(db, "clientes", id)
        const data = { 
            nombre, 
            correo, 
            correocontraseña, 
            contraseñasipre, 
            otro
        }
        await updateDoc(cliente, data)
        navigate('/')
    }

    const getClienteById = async (id) => {
        const cliente = await getDoc(doc(db, "clientes", id))
        if(cliente.exists()) {
            const data = cliente.data()
            setNombre(data.nombre)    
            setCorreo(data.correo)
            setCorreocontraseña(data.correocontraseña)
            setContraseñasipre(data.contraseñasipre)
            setOtro(data.otro)
        } else {
            console.log('El cliente no existe')
        }
    }

    useEffect(() => {
        getClienteById(id)
    }, [id])

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1>Editar Cliente</h1>
                    <form onSubmit={updateCliente}>
                        {/* Campos del formulario */}
                        {/* Nombre */}
                        <div className='mb-3'>
                            <label className='form-label'>Nombre</label>
                            <input
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>  
                        {/* Correo */}
                        <div className='mb-3'>
                            <label className='form-label'>Correo</label>
                            <input
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                type="email" // Cambiado a tipo email para validación automática
                                className='form-control'
                            />
                        </div>  
                        {/* Contraseña Correo */}
                        <div className='mb-3'>
                            <label className='form-label'>Contraseña Correo</label>
                            <input
                                value={correocontraseña}
                                onChange={(e) => setCorreocontraseña(e.target.value)}
                                type="text" // Mantenido como password para ocultar entrada
                                className='form-control'
                            />
                        </div>  
                        {/* Contraseña SIPRE */}
                        <div className='mb-3'>
                            <label className='form-label'>Contraseña SIPRE</label>
                            <input
                                value={contraseñasipre}
                                onChange={(e) => setContraseñasipre(e.target.value)}
                                type="text" // Mantenido como password para ocultar entrada
                                className='form-control'
                            />
                        </div>
                        {/* Otro */}
                        <div className='mb-3'>
                            <label className='form-label'>Otro</label>
                            <input
                                value={otro}
                                onChange={(e) => setOtro(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>  

                        <button type='submit' className='btn btn-primary'>Actualizar</button>
                    </form>   
                </div>
            </div>
        </div>
    )
}

export default Edit
