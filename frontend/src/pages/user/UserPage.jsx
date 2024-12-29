import React, { useState, useEffect } from 'react'
import api from '../../api/axios'
import UserForm from '../../components/user/UserForm'
import UserList from '../../components/user/UserList'
import '../../styles/user/UserPage.css'


const UserPage = () => {
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({
        username: '',
        email: '',
        password: '',
        full_name: '',
        is_active: true,
    })
    const [isEditing, setIsEditing] = useState(false)

    // Fetch users from API
    const fetchUsers = async () => {
        try {
            const response = await api.get('/users')
            setUsers(response.data)
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    // Create or update user
    const handleFormSubmit = async () => {
        try {
            if (isEditing) {
                await api.put(`/users/${currentUser.id}`, currentUser)
            } else {
                await api.post('/users', currentUser)
            }
            setCurrentUser({
                username: '',
                email: '',
                password: '',
                full_name: '',
                is_active: true,
            })
            setIsEditing(false)
            fetchUsers()
        } catch (error) {
            console.error('Error saving user:', error)
        }
    }

    // Delete user
    const handleDelete = async (id) => {
        try {
            await api.delete(`/users/${id}`)
            fetchUsers()
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    }

    // Edit user
    const handleEdit = (user) => {
        setCurrentUser(user)
        setIsEditing(true)
    }

    return (
        <div className="user-page">
            <h1>User Management</h1>
            <UserForm
                user={currentUser}
                onChange={setCurrentUser}
                onSubmit={handleFormSubmit}
                buttonText={isEditing ? 'Update User' : 'Create User'}
            />
            <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default UserPage
