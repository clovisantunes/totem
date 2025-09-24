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
        <div className="initial-header">
          <h1>Bem-vindo à Clínica Médica</h1>
          <p>Selecione o tipo de atendimento desejado</p>
        </div>
        
        <div className="service-selection">
          <button 
            className="service-card assistencial-card"
            onClick={() => onServiceSelect('assistencial')}
            disabled={loading}
          >
            <div className="service-icon">🏥</div>
            <h3>Medicina Assistencial</h3>
            <p>Consulta médica geral, exames e acompanhamento</p>
            <ul>
              <li>• Consultas agendadas</li>
              <li>• Exames laboratoriais</li>
              <li>• Acompanhamento médico</li>
            </ul>
            <div className="service-action">
              {loading ? (
                <span className="loading"></span>
              ) : (
                <span className="action-text">SELECIONAR →</span>
              )}
            </div>
          </button>
          
          <button 
            className="service-card trabalho-card"
            onClick={() => onServiceSelect('trabalho')}
            disabled={loading}
          >
            <div className="service-icon">👷</div>
            <h3>Medicina do Trabalho</h3>
            <p>Atendimento especializado para empresas</p>
            <ul>
              <li>• Atestados médicos</li>
              <li>• Exames admissionais</li>
              <li>• Periódicos e demissionais</li>
            </ul>
            <div className="service-action">
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