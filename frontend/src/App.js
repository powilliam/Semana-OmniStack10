import React from 'react';

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'


export default function App() {
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
          <div className="input-block">
            <label htmlFor="github">Usuário do Github</label>
            <input name="github" id="github" required/>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required/>
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input name="latitude" id="latitude" required/>
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude" id="longitude" required/>
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
