import React, { useState, useEffect } from 'react';

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'


export default function App() {
  const [ github, setGithub ] = useState('')
  const [ techs, setTechs ] = useState('')
  const [ latitude, setLatitude ] = useState(0)
  const [ longitude, setLongitude ] = useState(0)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function HandleCoordinateState({ coords }) {
        const { latitude, longitude } = coords

        setLatitude(latitude)
        setLongitude(longitude)
      },
      function DisplayError(error) {
        console.error(error)
      },
      {
        timeout: 300000
      }
    )
  }, [])

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
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
          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/55867831?s=460&v=4" alt="William Porto" />
              <div className="user-info">
                <strong>William Porto</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>Chemistry student at UFAM. Ìn love with Node.js, ReactJS and React Native</p>
            <a href="https://github.com/powilliam">Acessar perfil do Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/55867831?s=460&v=4" alt="William Porto" />
              <div className="user-info">
                <strong>William Porto</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>Chemistry student at UFAM. Ìn love with Node.js, ReactJS and React Native</p>
            <a href="https://github.com/powilliam">Acessar perfil do Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/55867831?s=460&v=4" alt="William Porto" />
              <div className="user-info">
                <strong>William Porto</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>Chemistry student at UFAM. Ìn love with Node.js, ReactJS and React Native</p>
            <a href="https://github.com/powilliam">Acessar perfil do Github</a>
          </li>
        </ul>
      </main>
    </div>
  )
}
