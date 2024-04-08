import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'


const Create = () => {
  const [ nombre, setNombre ] = useState('')
  const [ correo, setCorreo ] = useState('')
  const [ correocontraseña, setCorreocontraseña ] = useState('')
  const [ contraseñasipre, setContraseñasipre ] = useState('')
  const [ otro, setOtro] = useState('')
  const navigate = useNavigate()

  const clientesCollection = collection(db, "clientes")

  const store = async (e) => {
    e.preventDefault()
    await addDoc( clientesCollection, {
                nombre: nombre,
                correo: correo,
                correocontraseña: correocontraseña,
                contraseñasipre: contraseñasipre,
                otro: otro} )
    navigate('/')
    //console.log(e.target[0].value)
  }

  return (
    <div className='container'>
    <div className='row justify-content-center'>
        <div className='col-12 col-md-8 col-lg-6'>
            <h1>Agregar Cliente</h1>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        className='form-control'
                        placeholder="Ingresa el nombre del cliente"
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Correo</label>
                    <input
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        type="email"
                        className='form-control'
                        placeholder="Ejemplo: cliente@correo.com"
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Contraseña Correo</label>
                    <input
                        value={correocontraseña}
                        onChange={(e) => setCorreocontraseña(e.target.value)}
                        type="text"  
                        className='form-control'
                        placeholder="Ingresa la contraseña del correo"
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Contraseña SIPRE</label>
                    <input
                        value={contraseñasipre}
                        onChange={(e) => setContraseñasipre(e.target.value)}
                        type="text" 
                        className='form-control'
                        placeholder="Contraseña para SIPRE"
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Otro</label>
                    <input
                        value={otro}
                        onChange={(e) => setOtro(e.target.value)}
                        type="text"
                        className='form-control'
                        placeholder="Información adicional"
                    />
                </div>
                <button type='submit' className='btn btn-primary btn-block'>Guardar</button>
            </form>   
        </div>
    </div>
</div>
  )
}

export default Create