import React from 'react';
import '../styles/screens/InitialScreen.css';

interface InitialScreenProps {
  onServiceSelect: (serviceType: 'assistencial' | 'trabalho') => void;
  loading: boolean;
}

const InitialScreen: React.FC<InitialScreenProps> = ({ onServiceSelect, loading }) => {
  return (
    <div className="screen initial-screen">
      <div className="initial-container">
        <div className="service-selection">
          <button 
            className="service-card assistencial-card"
            onClick={() => onServiceSelect('assistencial')}
            disabled={loading}
          >
            <ul>
              <li className="initial-li">• Consultas agendadas</li>
              <li className="initial-li">• Exames laboratoriais</li>
              <li className="initial-li">• Informações</li>
            <div className="service-action">
              {loading ? (
                <span className="loading"></span>
              ) : (
                <span className="action-text">SELECIONAR →</span>
              )}
            </div>
            </ul>
          </button>
          
          <button 
            className="service-card trabalho-card"
            onClick={() => onServiceSelect('trabalho')}
            disabled={loading}
          >
            <div className="service-action-medicina">
            <h3>Medicina do Trabalho</h3>
              {loading ? (
                <span className="loading"></span>
              ) : (
                <span className="action-text">SELECIONAR →</span>
              )}
            </div>
          </button>
        </div>
        
        <div className="initial-instructions">
          <p><strong>Instruções:</strong></p>
          <p>• Medicina Assistencial: Digite seu CPF para consultas agendadas</p>
          <p>• Medicina do Trabalho: Atendimento direto com especialista</p>
        </div>
      </div>
    </div>
  );
};

export default InitialScreen;