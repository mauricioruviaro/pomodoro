import { useState } from 'react';
import settings from './images/settings-white.png';

function App() {
  const [modalOpen, setModalOpen] = useState(false)

  const openCloseModal = () => {
    setModalOpen(!modalOpen);
  }

  return (
    <div className="app container-limit">
      <header className="container-limit">
        <button type="button" id="settings" onClick={openCloseModal}>
          <img src={settings} alt="Imagem de um ícone que simboliza as configurações" />
        </button>
      </header>

    </div>
  );
}

export default App;
