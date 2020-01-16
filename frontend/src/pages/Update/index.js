import React, { useState } from 'react'
import api from '../../services/api'

import './styles.css'

export default function Update({ location, history }) {
    const {
        _id,
        name,
        github: user_github, 
        avatar, 
        techs: user_techs,
        location: user_location 
    } = location.state.developerInformation

    const [ github, setGithub ] = useState(user_github)
    const [ techs, setTechs ] = useState(user_techs)
    const [ latitude, setLatitude ] = useState(() => {
        const { coordinates } = user_location 

        return coordinates[1]
    })
    const [ longitude, setLongitude ] = useState(() => {
        const { coordinates } = user_location 

        return coordinates[0]
    })

    async function UpdateDeveloper(e) {
        e.preventDefault()
        
        await api.put(`/devs/${_id}/update`, {
            github,
            techs,
            latitude,
            longitude
        })

        history.push({
            pathname: '/'
        })
    }

    return (
        <div className="update-container">
            <section id="update-content">
                <img src={avatar} alt={name}/>
                <strong>{name}</strong>
                <form id="update-form">
                    <div id="update-block">
                        <label htmlFor="github">Nova conta do github</label>
                        <input 
                            name="github"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            required
                        />
                    </div>
                    <div id="update-block">
                        <label htmlFor="techs">Novas tecnologias</label>
                        <input 
                            name="techs"
                            value={techs}
                            onChange={(e) => setTechs(e.target.value)}
                            required
                        />
                    </div>

                    <section id="update-group">
                        <div id="update-block">
                            <label htmlFor="latitude">Latitude</label>
                            <input
                                type="number"
                                name="latitude" 
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                required
                            />
                        </div>
                        <div id="update-block">
                            <label htmlFor="longitude">Longitude</label>
                            <input 
                                name="longitude"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                required
                            />
                        </div>
                    </section>

                    <button type="submit" onClick={UpdateDeveloper}>Atualizar</button>
                </form>
            </section>
        </div>
    )
}