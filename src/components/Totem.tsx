import React, { useState } from 'react';
import InitialScreen from './screens/InitialScreen';
import ConsultaConfirmScreen from './screens/ConsultaConfirmScreen'; // Importe o novo componente
import CpfScreen from './screens/CpfScreen';
import HasAppointmentScreen from './screens/HasAppointmentScreen';
import NoAppointmentScreen from './screens/NoAppointmentScreen';
import TicketScreen from './screens/TicketScreen';
import type { TotemState, TicketInfo } from '../types/index';
import './styles/Totem.css';
import logo from '../assets/logo.png';

const Totem: React.FC = () => {
  const [state, setState] = useState<TotemState>({
    currentScreen: 'initial',
    cpf: '',
    hasAppointment: false,
    ticketNumber: null,
    loading: false,
    error: '',
    serviceType: undefined,
    ticketType: undefined
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
      const hasAppointment = ['04364979058', '89790014015'].includes(cpfLimpo);

      setState(prev => ({
        ...prev,
        loading: false,
        hasAppointment,
        currentScreen: hasAppointment ? 'hasAppointment' : 'noAppointment'
      }));
    }, 1500);
  };

  const generateTicket = (type: 'confirmation' | 'assistance', serviceType?: 'assistencial' | 'trabalho') => {
    setState(prev => ({ ...prev, loading: true }));
    
    setTimeout(() => {
      const newTicketNumber = Math.floor(1000 + Math.random() * 9000);
      const ticketServiceType = serviceType || state.serviceType || 'assistencial';
      
      setState(prev => ({
        ...prev,
        loading: false,
        ticketNumber: newTicketNumber,
        ticketType: type,
        currentScreen: 'ticket',
        serviceType: ticketServiceType
      }));
    }, 1000);
  };

  const handleServiceSelect = (serviceType: 'assistencial' | 'trabalho') => {
    setState(prev => ({ ...prev, loading: true, serviceType }));
    
    setTimeout(() => {
      if (serviceType === 'assistencial') {
        setState(prev => ({
          ...prev,
          loading: false,
          currentScreen: 'consultaConfirm'
        }));
      } else {
        generateTicket('assistance', serviceType);
      }
    }, 1000);
  };

  const handleConsultaConfirm = (temConsulta: boolean) => {
    setState(prev => ({ ...prev, loading: true }));
    
    setTimeout(() => {
      if (temConsulta) {
        setState(prev => ({
          ...prev,
          loading: false,
          currentScreen: 'cpf'
        }));
      } else {
        generateTicket('assistance');
      }
    }, 1000);
  };

  const restartProcess = () => {
    setState({
      currentScreen: 'initial',
      cpf: '',
      hasAppointment: false,
      ticketNumber: null,
      loading: false,
      error: '',
      serviceType: undefined,
      ticketType: undefined
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
    
    setState(prev => ({ ...prev, cpf: cpf }));
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
      case 'initial':
        return (
          <InitialScreen
            onServiceSelect={handleServiceSelect}
            loading={state.loading}
          />
        );
      
      case 'consultaConfirm':
        return (
          <ConsultaConfirmScreen
            loading={state.loading}
            onSim={() => handleConsultaConfirm(true)}
            onNao={() => handleConsultaConfirm(false)}
            onBack={() => setState(prev => ({ ...prev, currentScreen: 'initial' }))}
          />
        );
      
      case 'cpf':
        return (
          <CpfScreen
            cpf={state.cpf}
            loading={state.loading}
            error={state.error}
            onCpfChange={handleCpfChange}
            onCpfSubmit={handleCpfSubmit}
            onBack={() => setState(prev => ({ ...prev, currentScreen: 'consultaConfirm' }))}
          />
        );
      
      case 'hasAppointment':
        return (
          <HasAppointmentScreen
            cpf={state.cpf}
            loading={state.loading}
            onConfirm={() => generateTicket('confirmation')}
            onAssistance={() => generateTicket('assistance')}
            serviceType={state.serviceType}
          />
        );
      
      case 'noAppointment':
        return (
          <NoAppointmentScreen
            cpf={state.cpf}
            loading={state.loading}
            onAssistance={() => generateTicket('assistance')}
            onRestart={restartProcess}
            serviceType={state.serviceType}
          />
        );
      
      case 'ticket':
        const ticketInfo: TicketInfo = {
          number: state.ticketNumber!,
          type: state.ticketType || (state.hasAppointment ? 'confirmation' : 'assistance'),
          cpf: state.cpf,
          timestamp: new Date(),
          serviceType: state.serviceType || 'assistencial'
        };
        
        return (
          <TicketScreen
            ticketInfo={ticketInfo}
            hasAppointment={state.hasAppointment}
            onRestart={restartProcess}
            serviceType={state.serviceType}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="totem-container">
      <div className="totem-header">
        <img src={logo} alt="Logo da Clínica" className="totem-logo" />
        <h1>Sistema de Atendimento Médico</h1>
      </div>
      <div className="totem-content">
        {renderScreen()}
      </div>
    </div>
  );
};

export default Totem;