import React from 'react'

import './styles.css'

function DevItem({ dev, deleteDev, editDev }) {

    return (
        <li className="dev-item">
            <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
            <div className="btn-group">
                <button className="btn" onClick={deleteDev}>Excluir</button>
            </div>
        </li>
    )
}

export default DevItem