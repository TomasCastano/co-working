import { useState } from 'react'
import Modal from '../../../../../../components/modal/modal'

const UpdateUserModal = ({ open, setOpen, user, userID,handleUpdateUser }) => {

    const [userUpdate, setUserUpdate] = useState({
        nombre: user.nombre,
        email: user.email,
        role: user.role.id
    })

    const handleChange = (e) => {
        setUserUpdate({
            ...userUpdate,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
          nombre:  userUpdate.nombre,
          email:   userUpdate.email,
          rol_id:  Number(userUpdate.role)   // aquí va rol_id
        }
        handleUpdateUser(payload, userID)
        setOpen(false)
      }

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 w-[500px]">
                <div className="flex flex-col gap-1">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" value={userUpdate.nombre} placeholder="Nombre" onChange={handleChange} className="p-3 rounded-md border border-gray-300 bg-gray-50 outline-none focus:border-gray-500"/>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={userUpdate.email} placeholder="Email" onChange={handleChange} className="p-3 rounded-md border border-gray-300 bg-gray-50 outline-none focus:border-gray-500"/>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="rol">Rol</label>
                    <select
                        name="role"
                        id="rol"
                        value={userUpdate.role}
                        onChange={handleChange}
                    >
                        <option value="1">Administrador</option>
                        <option value="2">Usuario</option>
                    </select>
                </div>
                <button type="submit" className="bg-gray-900 text-white p-3 rounded-md mt-6 hover:bg-gray-800 transition-colors">Actualizar</button>
            </form>
        </Modal>
    )
}

export default UpdateUserModal