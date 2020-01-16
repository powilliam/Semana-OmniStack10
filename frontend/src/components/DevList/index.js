import React from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'

export default function DevList({ developerInformation }) {
  async function UnregisterDeveloper() {
    await api.delete(`/devs/${developerInformation._id}/unregister`)
  }

  return (
      <li className="dev-item">
          <header>
            <img src={developerInformation.avatar} alt={developerInformation.name}/>
            <div className="user-info">
              <strong>{developerInformation.name}</strong>
              <span>{developerInformation.techs.join(', ')}</span>
            </div>
          </header>
          <p>{developerInformation.bio}</p>
          <a href={`https://github.com/${developerInformation.github}`}>Acessar perfil do Github</a>
          <div className="dev-controll">
            
              <Link
                id="update-dev"
                to={{
                  pathname: '/update',
                  state: {
                    developerInformation
                  }
                }}
              >
                Atualizar
              </Link>
            <button id="remove-dev" onClick={UnregisterDeveloper}>Remover</button>
          </div>
      </li>
    )
}