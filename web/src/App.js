import React, { useEffect, useState } from 'react';

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import api from './services/api'
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

// Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Propriedade: Informações que um componente PAI passa o componente FILHO
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)

function App() {

  const [devs, setDevs] = useState([])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data) {

    const response = await api.post('/devs', data)
    setDevs([...devs, response.data])
  }


  async function handleDeleteDev(id) {
    const res = await api.delete(`/devs/${id}`)
    if (res.statusText === 'OK') {
      let removeDev = devs.filter(dev => dev._id !== id)
      setDevs(removeDev)
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => <DevItem key={dev._id} dev={dev} deleteDev={() => handleDeleteDev(dev._id)} />)}
        </ul>
      </main>
    </div>
  );
}

export default App;
