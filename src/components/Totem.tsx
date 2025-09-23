import React, { useState } from 'react';
import CpfScreen from './screens/CpfScreen.tsx';
import HasAppointmentScreen from './screens/HasAppointmentScreen.tsx';
import NoAppointmentScreen from './screens/NoAppointmentScreen.tsx';
import TicketScreen from './screens/TicketScreen.tsx';
import type { TotemState,  TicketInfo } from '../types/index.ts';
import './styles/Totem.css';

const Totem: React.FC = () => {
  const [state, setState] = useState<TotemState>({
    currentScreen: 'cpf',
    cpf: '',
    hasAppointment: false,
    ticketNumber: null,
    loading: false,
    error: ''
  });

  const validateCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;
    
    let sum = 0;
    let remainder: number;
    
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
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

  const checkAppointment = (cpf: string) => {
    setState(prev => ({ ...prev, loading: true, error: '' }));
    
    setTimeout(() => {
      
    const cpfLimpo = cpf.replace(/\D/g, '');
    const hasAppointment = cpfLimpo === '04364979058';

      setState(prev => ({
        ...prev,
        loading: false,
        hasAppointment,
        currentScreen: hasAppointment ? 'hasAppointment' : 'noAppointment'
      }));
    }, 1500);
  };

  const generateTicket = () => {
    setState(prev => ({ ...prev, loading: true }));
    
    setTimeout(() => {
      const newTicketNumber = Math.floor(1000 + Math.random() * 9000);
      
      setState(prev => ({
        ...prev,
        loading: false,
        ticketNumber: newTicketNumber,
        currentScreen: 'ticket'
      }));
    }, 1000);
  };

  const restartProcess = () => {
    setState({
      currentScreen: 'cpf',
      cpf: '',
      hasAppointment: false,
      ticketNumber: null,
      loading: false,
      error: ''
    });
  };

  const handleCpfSubmit = (cpf: string) => {
    const cleanCpf = cpf.replace(/\D/g, '');
    
    if (cleanCpf.length !== 11) {
      setState(prev => ({ ...prev, error: 'CPF deve ter 11 dígitos' }));
      return;
    }
    
    if (!validateCPF(cleanCpf)) {
      setState(prev => ({ ...prev, error: 'CPF inválido' }));
      return;
    }
    
    setState(prev => ({ ...prev, cpf }));
    checkAppointment(cleanCpf);
  };

  const handleCpfChange = (cpf: string) => {
    const formattedCpf = formatCPF(cpf);
    setState(prev => ({ 
      ...prev, 
      cpf: formattedCpf,
      error: prev.error ? '' : prev.error
    }));
  };

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'cpf':
        return (
          <CpfScreen
            cpf={state.cpf}
            loading={state.loading}
            error={state.error}
            onCpfChange={handleCpfChange}
            onCpfSubmit={handleCpfSubmit}
          />
        );
      
      case 'hasAppointment':
        return (
          <HasAppointmentScreen
            cpf={state.cpf}
            loading={state.loading}
            onConfirm={() => generateTicket('confirmation')}
            onAssistance={() => generateTicket('assistance')}
          />
        );
      
      case 'noAppointment':
        return (
          <NoAppointmentScreen
            cpf={state.cpf}
            loading={state.loading}
            onAssistance={() => generateTicket('assistance')}
            onRestart={restartProcess}
          />
        );
      
      case 'ticket':
        const ticketInfo: TicketInfo = {
          number: state.ticketNumber!,
          type: state.hasAppointment ? 'confirmation' : 'assistance',
          cpf: state.cpf,
          timestamp: new Date()
        };
        
        return (
          <TicketScreen
            ticketInfo={ticketInfo}
            hasAppointment={state.hasAppointment}
            onRestart={restartProcess}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="totem-container">
      <div className="totem-header">
        <h1>Sistema de Atendimento</h1>
        <p>Totem de Autoatendimento</p>
      </div>
      <div className="totem-content">
        {renderScreen()}
      </div>
    </div>
  );
};

export default Totem;