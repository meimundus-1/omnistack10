import React, { useState, useEffect } from 'react'
import api from './services/api'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

function App() {
    const [devs, setDevs] = useState([])

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs')
            setDevs(response.data)
        }
        loadDevs()
    }, [])

    async function handlerAddDev(data) {
        const response = await api.post('/devs', data)
        const listDevs = [...devs, response.data]
        setDevs(
            listDevs.filter(
                (e, i) => listDevs.findIndex(a => a._id === e._id) === i
            )
        )
    }

    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handlerAddDev} />
            </aside>
            <main>
                <ul>
                    {devs.map(dev => (
                        <DevItem key={dev._id} dev={dev} />
                    ))}
                </ul>
            </main>
        </div>
    )
}

export default App
