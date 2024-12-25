import React from 'react'

const UserForm = ({ user, onChange, onSubmit, buttonText }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <input
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) => onChange({ ...user, username: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => onChange({ ...user, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => onChange({ ...user, password: e.target.value })}
            />
            <input
                type="text"
                placeholder="Full Name"
                value={user.full_name}
                onChange={(e) => onChange({ ...user, full_name: e.target.value })}
            />
            <label>
                <input
                    type="checkbox"
                    checked={user.is_active}
                    onChange={(e) => onChange({ ...user, is_active: e.target.checked })}
                />
                Active
            </label>
            <button type="submit">{buttonText}</button>
        </form>
    )
}

export default UserForm
