import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Show = () => {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const clientesCollection = collection(db, "clientes");

  const getClientes = async () => {
    const data = await getDocs(clientesCollection);
    setClientes(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  const deleteCliente = async (id) => {
    const clienteDoc = doc(db, "clientes", id);
    await deleteDoc(clienteDoc);
    getClientes();
  };

  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCliente(id);
        Swal.fire(
          'Eliminado!',
          'El cliente ha sido eliminado.',
          'success'
        );
      }
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        Swal.fire(
          'Copiado!',
          'El texto se ha copiado al portapapeles.',
          'success'
        );
      })
      .catch((error) => {
        console.error('Error al copiar al portapapeles:', error);
        Swal.fire(
          'Error!',
          'No se pudo copiar al portapapeles.',
          'error'
        );
      });
  };

  useEffect(() => {
    getClientes();
  }, []);

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className="d-grid gap-2">
              <Link to="/create" className='btn btn-success mt-2 mb-2'>Agregar Cliente</Link>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="table-responsive">
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Contraseña Correo</th>
                    <th>Contraseña SIPRE</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td>{cliente.nombre} <button className="btn btn-link" onClick={() => copyToClipboard(cliente.nombre)}><i className="fa-solid fa-copy"></i></button></td>
                      <td>{cliente.correo} <button className="btn btn-link" onClick={() => copyToClipboard(cliente.correo)}><i className="fa-solid fa-copy"></i></button></td>
                      <td>{cliente.correocontraseña} <button className="btn btn-link" onClick={() => copyToClipboard(cliente.correocontraseña)}><i className="fa-solid fa-copy"></i></button></td>
                      <td>{cliente.contraseñasipre} <button className="btn btn-link" onClick={() => copyToClipboard(cliente.contraseñasipre)}><i className="fa-solid fa-copy"></i></button></td>
                      <td>
                        <Link to={`/edit/${cliente.id}`} className="btn btn-success"><i className="fa-solid fa-pencil"></i></Link>
                        <button onClick={() => { confirmDelete(cliente.id); }} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
