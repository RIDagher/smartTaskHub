import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

 const initialFormData = {
        username: '',
        email: '',
        password: '',
        role: 'user' // default role
    }


export default function  RegisterForm ()  {
    const navigate = useNavigate()
    // useState to manage form data, loading state, and error messages
    const [formData, setFormData] = useState(initialFormData)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

     const handleChange = (e) => {
            const {name, value} = e.target;
            setFormData((prevData) => ({...prevData, [name] : value}))
        }

    const handleSubmit = async (e) => {
        e.preventDefault()  
        setError('')

        const { username, email, password, role } = formData
        if (!username || !email || !password) {
            setError('Please fill in all fields.')
            return
        }
        
        try {
            setLoading(true)

            const res = await fetch('/api/users/register', {

                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username, email, password, role})
            })

            const data = await res.json()

            if(!res.ok) {
                throw new Error(data?.message || 'Registration failed')
            }

            // Success
            console.log('rehistration successful: ', data)
            setFormData(initialFormData)
            navigate('/login')
      
        } catch(err) {
            setError(err.message || 'Something wen wrong')

            //
        } finally {
            setLoading(false)
        }  
    }
 
  return (
    <form onSubmit={handleSubmit}>
        {error && <p className='text-sm text-red-600'>{error}</p>}
        <div className='flex flex-col pt-20'>
            <label
            htmlFor='username'>Username</label>
            <input 
            id='username'
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            className='border rounded px-3 py-2'
            required
            />
        </div>
            <div className='flex flex-col'>
            <label
            htmlFor='email'>Email</label>
            <input 
            id='username'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='border rounded px-3 py-2'
            required
            />
        </div>
            <div className='flex flex-col'>
            <label
            htmlFor='password'>Password</label>
            <input 
            id='password'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='border rounded px-3 py-2'
            required
            />
        </div>
          <div className='flex flex-col'>
            <label
            htmlFor='role'>Role</label>
            <select 
            id='role'
            name='role'
            value={formData.role}
            onChange={handleChange}
            className='border rounded px-3 py-2'
            required
            >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            </select>
        
        </div>

         <button
        type="submit"
        className="w-full rounded bg-indigo-600 text-white py-2 hover:bg-indigo-700 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Croeating account...' : 'Create account'}
        </button>        
            
    </form>
  )
}

