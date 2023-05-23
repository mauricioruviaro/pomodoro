import { useState } from 'react';
import Button from './components/Button.jsx';
import settings from './images/settings-white.png';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [option, setOption] = useState('focus');
  const [defaultColor, setDefaultColor] = useState('red');

  const openCloseModal = () => {
    setModalOpen(!modalOpen);
  }

  const changeOption = (opt) => {
    if (opt === option) {
      return false;
    }
    setOption(opt);
  }

  return (
    <div className={`app ${defaultColor}`}>
      <header className="container-limit">
        <button type="button" id="settings" onClick={openCloseModal}>
          <img src={settings} alt="Imagem de um ícone que simboliza as configurações" />
        </button>
      </header>

      <div className="buttons-container">
        <Button
          text="Foco"
          classes={`${option === 'focus' && 'selected'}`}
          onClick={() => changeOption('focus')}
        />
        <Button
          text="Intervalo curto"
          classes={`${option === 'short' && 'selected'}`}
          onClick={() => changeOption('short')}
        />
        <Button
          text="Intervalo longo"
          classes={`${option === 'long' && 'selected'}`}
          onClick={() => changeOption('long')}
        />
      </div>

    </div>
  );
}

export default App;
