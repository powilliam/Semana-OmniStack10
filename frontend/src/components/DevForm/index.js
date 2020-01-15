import React, { useState, useEffect } from 'react'

import './styles.css'

export default function DevForm({ onSubmit }) {
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
          function(error) {
            console.log(error)
          },
          {
            timeout: 30000
          }
        )
    }, [])

    async function HandleSubmit(e) {
        e.preventDefault()

        await onSubmit({
            github,
            techs,
            latitude,
            longitude
        })

        clearGithubAndtechsInput()
    }

    function clearGithubAndtechsInput() {
        setGithub('')
        setTechs('')
    }

    return (
        <form onSubmit={HandleSubmit}>
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
    )
}