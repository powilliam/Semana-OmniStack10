import React, { useState, useEffect } from 'react'
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'


export default function App() {
  const [ github, setGithub ] = useState('')
  const [ techs, setTechs ] = useState('')
  const [ latitude, setLatitude ] = useState(0)
  const [ longitude, setLongitude ] = useState(0)

  const [ devs, setDevs ] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function HandleCoordinateState({ coords }) {
        const { latitude, longitude } = coords

        setLatitude(latitude)
        setLongitude(longitude)
      },
      function(error) {
        DisplayError(error)
      },
      {
        timeout: 30000
      }
    )
  }, [])

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
    .catch(error => DisplayError(error))
  }, [])

  async function HandleRegisterDeveloper(e) {
    e.preventDefault()

    const { data } = await api.post('/devs/register', {
      github,
      techs,
      latitude,
      longitude
    })

    clearGithubAndtechsInput()
    
    setDevs(devs => [...devs, data])
  }

  function DisplayError(error) {
    console.error(error)
  }

  function clearGithubAndtechsInput() {
    setGithub('')
    setTechs('')
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={HandleRegisterDeveloper}>
          <div className="input-block">
            <label htmlFor="github">Usuário do Github</label>
            <input 
              name="github" 
              id="github" 
              value={github}
              onChange={e => setGithub(e.target.value)}
              required
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
              name="techs" 
              id="techs"
              value={techs}
              onChange={e => setTechs(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                value={latitude} 
                onChange={e => setLatitude(e.target.value)}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                value={longitude} 
                onChange={e => setLongitude(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>

      <main>
        <ul>
          { devs.map(dev => (
            <li key={dev._id} className="dev-item">
              <header>
                <img src={ dev.avatar } alt={ dev.name }/>
                <div className="user-info">
                  <strong>{ dev.name }</strong>
                  <span>{ dev.techs.join(', ')}</span>
                </div>
              </header>
              <p>{ dev.bio }</p>
              <a href={`https://github.com/${dev.github}`}>Acessar perfil do Github</a>
          </li>
          )) }
        </ul>
      </main>
    </div>
  )
}
