import React from 'react'

import './styles.css'

export default function DevList({ developerInformation }) {
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
        </li>
    )
}