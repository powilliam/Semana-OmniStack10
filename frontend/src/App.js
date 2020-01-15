import React, { useState, useEffect } from 'react'
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevForm from './components/DevForm'
import DevList from './components/DevList'

export default function App() {
  const [ devs, setDevs ] = useState([])

  useEffect(() => {
    async function RequestForDevs() {
      return await api.get('/devs')
    }

    RequestForDevs()
    .then(
      function HandleDevsState({ data }) {
        setDevs(data)
      }
    )
    .catch(
      function(error) {
        console.log(error)
      }
    )
  }, [])

  async function HandleRegisterDeveloper(dataToSubmit) {
    const { data } = await api.post('/devs/register', dataToSubmit)

    setDevs(devs => [...devs, data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={HandleRegisterDeveloper}/>
      </aside>

      <main>
        <ul>
          { devs.map(dev => (
             <DevList key={dev._id} developerInformation={dev}/>
          )) }
        </ul>
      </main>
    </div>
  )
}
