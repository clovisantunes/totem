import React from 'react';
import '../styles/screens/CpfScreen.css';

export interface CpfScreenProps {
  cpf: string;
  loading: boolean;
  error: string;
  onCpfChange: (cpf: string) => void;
  onCpfSubmit: (cpf: string) => void;
  onBack: () => void;
  onAssistance: () => void; 
}

const CpfScreen: React.FC<CpfScreenProps> = ({
  cpf,
  loading,
  error,
  onCpfChange,
  onCpfSubmit,
  onBack,
  onAssistance 
}) => {
  const handleNumberClick = (number: string) => {
    const cleanCpf = cpf.replace(/\D/g, '');
    if (cleanCpf.length < 11) {
      const newCpf = cleanCpf + number;
      const formattedCpf = formatCPF(newCpf);
      onCpfChange(formattedCpf);
    }
  };

  const handleDelete = () => {
    const cleanCpf = cpf.replace(/\D/g, '');
    const newCpf = cleanCpf.slice(0, -1);
    const formattedCpf = formatCPF(newCpf);
    onCpfChange(formattedCpf);
  };

  const handleClear = () => {
    onCpfChange('');
  };

  const handleSubmit = () => {
    if (cpf.replace(/\D/g, '').length === 11) {
      onCpfSubmit(cpf);
    }
  };

  const handleNaoSeiCPF = () => {
    onAssistance();
  };

  const formatCPF = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return numbers.replace(/(\d{3})(\d+)/, '$1.$2');
    } else if (numbers.length <= 9) {
      return numbers.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
    }
  };

  return (
    <div className="screen cpf-screen">
      <div className="cpf-container">
        <button className="back-button" onClick={onBack}>
          ← Voltar para Seleção
        </button>
        
        <div className="cpf-display-area">
          <h2>Digite seu CPF</h2>
          <p>Use o teclado ao lado para digitar seu CPF</p>
          
          <div className="cpf-display">
            <input
              type="text"
              className="cpf-input-display"
              value={cpf}
              readOnly
              placeholder="000.000.000-00"
            />
            <div className="cpf-length">
              {cpf.replace(/\D/g, '').length}/11
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          
          <div className='no-cpf-message'>
            <button 
              className="no-cpf-button"
              onClick={handleNaoSeiCPF}
              disabled={loading}
            >
              Não sei meu CPF
            </button>
          </div>
          
          <div className="cpf-instructions">
            <p>Instruções:</p>
            <ul>
              <li>Digite apenas os números do CPF</li>
              <li>O formato será aplicado automaticamente</li>
              <li>Clique em ENTER quando terminar</li>
              <li>Ou clique em "Não sei meu CPF" para atendimento</li>
            </ul>
          </div>
        </div>

        <div className="numeric-keyboard">
          <div className="keyboard-grid">
            <button type="button" className="keyboard-key" onClick={() => handleNumberClick('1')}>1</button>
            <button type="button" className="keyboard-key" onClick={() => handleNumberClick('2')}>2</button>
            <button type="button" className="keyboard-key" onClick={() => handleNumberClick('3')}>3</button>
            
            <button type="button" className="keyboard-key" onClick={() => handleNumberClick('4')}>4</button>
            <button type="button" className="keyboard-key" onClick={() => handleNumberClick('5')}>5</button>
            <button type="button" className="keyboard-key" onClick={() => handleNumberClick('6')}>6</button>
            
            <button type="button" className="keyboard-key" onClick={() => handleNumberClick('7')}>7</button>
            <button type="button" className="keyboard-key" onClick={() => handleNumberClick('8')}>8</button>
            <button type="button" className="keyboard-key" onClick={() => handleNumberClick('9')}>9</button>
            
            <button type="button" className="keyboard-key" onClick={() => handleNumberClick('0')}>0</button>
            <button type="button" className="keyboard-key delete-key" onClick={handleDelete}>
              ⌫
            </button>
            <button type="button" className="keyboard-key clear-key" onClick={handleClear}>
              C
            </button>
          </div>
          
          <button 
            type="button"
            className="enter-key"
            onClick={handleSubmit}
            disabled={loading || cpf.replace(/\D/g, '').length !== 11}
          >
            {loading ? 'VERIFICANDO...' : 'ENTER'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CpfScreen;