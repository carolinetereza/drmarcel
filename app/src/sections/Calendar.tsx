import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, MessageCircle, Check, User, Stethoscope } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DaySchedule {
  date: Date;
  slots: TimeSlot[];
}

// Services offered by Dr. Marcel
const SERVICES = [
  { id: 'lentes', name: 'Lentes de Contato Dental', duration: '60min' },
  { id: 'implantes', name: 'Implantes Dentários', duration: '90min' },
  { id: 'reabilitacao', name: 'Reabilitação Oral', duration: '60min' },
  { id: 'clareamento', name: 'Clareamento Dental', duration: '45min' },
  { id: 'harmonizacao', name: 'Harmonização Orofacial', duration: '60min' },
  { id: 'consulta', name: 'Consulta de Avaliação', duration: '30min' },
  { id: 'manutencao', name: 'Manutenção de Lentes', duration: '45min' },
  { id: 'protese', name: 'Prótese Protocolo', duration: '90min' },
];

// Clinic hours
const CLINIC_HOURS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
];

const Calendar = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const slotsRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [errors, setErrors] = useState<{ service?: string; name?: string }>({});

  // Generate available days (next 60 days, excluding weekends)
  const generateSchedule = (): DaySchedule[] => {
    const schedule: DaySchedule[] = [];
    const today = new Date();

    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;

      const slots: TimeSlot[] = CLINIC_HOURS.map((time) => ({
        time,
        available: true, // All slots available
      }));

      schedule.push({ date, slots });
    }

    return schedule;
  };

  const [schedule] = useState(generateSchedule());

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        calendarRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: calendarRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (Date | null)[] = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateAvailable = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return false;
    return schedule.some(
      (day) =>
        day.date.getDate() === date.getDate() &&
        day.date.getMonth() === date.getMonth() &&
        day.date.getFullYear() === date.getFullYear()
    );
  };

  const getAvailableSlots = (date: Date): TimeSlot[] => {
    const daySchedule = schedule.find(
      (day) =>
        day.date.getDate() === date.getDate() &&
        day.date.getMonth() === date.getMonth() &&
        day.date.getFullYear() === date.getFullYear()
    );
    return daySchedule?.slots || [];
  };

  const handleDateSelect = (date: Date | null) => {
    if (date && isDateAvailable(date)) {
      setSelectedDate(date);
      setSelectedSlot(null);

      setTimeout(() => {
        if (slotsRef.current) {
          gsap.fromTo(
            slotsRef.current,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
          );
        }
      }, 50);
    }
  };

  const handleSlotSelect = (time: string) => {
    setSelectedSlot(time);
  };

  const validateForm = (): boolean => {
    const newErrors: { service?: string; name?: string } = {};
    if (!selectedService) {
      newErrors.service = 'Selecione um serviço';
    }
    if (!patientName.trim()) {
      newErrors.name = 'Informe seu nome';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWhatsAppBooking = () => {
    if (!validateForm() || !selectedDate || !selectedSlot) return;

    const service = SERVICES.find((s) => s.id === selectedService);
    const formattedDate = selectedDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const message = encodeURIComponent(
      `Olá! Meu nome é ${patientName.trim()} e gostaria de agendar uma consulta.\n\n` +
      `*Serviço:* ${service?.name}\n` +
      `*Data:* ${formattedDate}\n` +
      `*Horário:* ${selectedSlot}\n\n` +
      `Aguardo confirmação. Obrigada!`
    );

    window.open(`https://wa.me/5511999199200?text=${message}`, '_blank');
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <section
      id="calendar"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-gold text-sm tracking-[0.3em] uppercase">
            Agendamento
          </span>
          <h2 className="font-serif text-section text-off-white mt-4">
            Agende Sua
            <span className="text-gold block">Consulta</span>
          </h2>
          <p className="text-off-white/60 max-w-xl mx-auto mt-6">
            Escolha o serviço, data e horário desejados. Entraremos em contato para confirmar seu agendamento.
          </p>
        </div>

        {/* Form Container */}
        <div
          ref={calendarRef}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Left Column - Service & Calendar */}
          <div className="space-y-6">
            {/* Service Selection */}
            <div className="glass p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Stethoscope className="w-5 h-5 text-gold" />
                <h3 className="text-off-white font-medium">Escolha o Serviço</h3>
              </div>

              <div className="space-y-4">
                <select
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                    setErrors((prev) => ({ ...prev, service: undefined }));
                  }}
                  className={`w-full bg-transparent border ${
                    errors.service ? 'border-red-500' : 'border-off-white/20'
                  } px-4 py-3 text-off-white text-sm focus:border-gold focus:outline-none transition-colors duration-300 appearance-none cursor-pointer`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23C9A962' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '16px',
                  }}
                >
                  <option value="" className="bg-deep-black text-off-white">
                    Selecione um serviço...
                  </option>
                  {SERVICES.map((service) => (
                    <option
                      key={service.id}
                      value={service.id}
                      className="bg-deep-black text-off-white"
                    >
                      {service.name} ({service.duration})
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-red-500 text-xs">{errors.service}</p>
                )}
              </div>

              {/* Patient Name */}
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-5 h-5 text-gold" />
                  <h3 className="text-off-white font-medium">Seu Nome</h3>
                </div>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => {
                    setPatientName(e.target.value);
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="Digite seu nome completo"
                  className={`w-full bg-transparent border ${
                    errors.name ? 'border-red-500' : 'border-off-white/20'
                  } px-4 py-3 text-off-white text-sm placeholder:text-off-white/30 focus:border-gold focus:outline-none transition-colors duration-300`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-2">{errors.name}</p>
                )}
              </div>
            </div>

            {/* Calendar */}
            <div className="glass p-6 lg:p-8">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={prevMonth}
                  className="p-2 text-off-white/60 hover:text-gold transition-colors duration-300 hover:scale-110 transform"
                  data-cursor-hover
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-gold" />
                  <span className="text-off-white font-medium">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                </div>
                <button
                  onClick={nextMonth}
                  className="p-2 text-off-white/60 hover:text-gold transition-colors duration-300 hover:scale-110 transform"
                  data-cursor-hover
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Week Days */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-off-white/40 text-xs uppercase tracking-wider py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth().map((date, index) => {
                  const isAvailable = isDateAvailable(date);
                  const isSelected =
                    selectedDate &&
                    date &&
                    selectedDate.getDate() === date.getDate() &&
                    selectedDate.getMonth() === date.getMonth();

                  return (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(date)}
                      disabled={!isAvailable}
                      className={`
                        aspect-square flex items-center justify-center text-sm
                        transition-all duration-300 ease-out
                        ${
                          isSelected
                            ? 'bg-gold text-deep-black font-medium scale-105'
                            : isAvailable
                            ? 'text-off-white hover:bg-gold/20 hover:scale-105 cursor-pointer'
                            : 'text-off-white/20 cursor-not-allowed'
                        }
                      `}
                      data-cursor-hover={isAvailable}
                    >
                      {date?.getDate()}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-off-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gold" />
                  <span className="text-off-white/60 text-xs">Selecionado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-off-white/30" />
                  <span className="text-off-white/60 text-xs">Disponível</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-off-white/10" />
                  <span className="text-off-white/40 text-xs">Indisponível</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Time Slots & Confirmation */}
          <div className="flex flex-col">
            {selectedDate ? (
              <div ref={slotsRef} className="glass p-6 lg:p-8 h-full">
                {/* Selected Date Display */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-off-white/10">
                  <Clock className="w-5 h-5 text-gold" />
                  <div>
                    <p className="text-off-white font-medium">
                      {selectedDate.toLocaleDateString('pt-BR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </p>
                    <p className="text-off-white/50 text-sm">
                      Selecione um horário
                    </p>
                  </div>
                </div>

                {/* Time Slots Grid */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {getAvailableSlots(selectedDate).map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlotSelect(slot.time)}
                      className={`
                        py-3 px-2 text-sm tracking-wide
                        transition-all duration-300 ease-out
                        ${
                          selectedSlot === slot.time
                            ? 'bg-gold text-deep-black font-medium scale-105'
                            : 'border border-off-white/20 text-off-white hover:border-gold hover:text-gold hover:scale-105'
                        }
                      `}
                      data-cursor-hover
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>

                {/* Confirmation Section */}
                {selectedSlot && (
                  <div className="mt-auto">
                    <div className="flex items-start gap-3 mb-6 p-4 bg-gold/5 border border-gold/20">
                      <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-off-white font-medium">
                          Resumo do Agendamento
                        </p>
                        <div className="text-off-white/60 text-sm mt-2 space-y-1">
                          <p>
                            <span className="text-gold">Serviço:</span>{' '}
                            {SERVICES.find((s) => s.id === selectedService)?.name || 'Não selecionado'}
                          </p>
                          <p>
                            <span className="text-gold">Data:</span>{' '}
                            {selectedDate.toLocaleDateString('pt-BR', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                            })}
                          </p>
                          <p>
                            <span className="text-gold">Horário:</span> {selectedSlot}
                          </p>
                          <p>
                            <span className="text-gold">Paciente:</span>{' '}
                            {patientName || 'Não informado'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleWhatsAppBooking}
                      className="w-full py-4 bg-gold text-deep-black font-medium tracking-wide
                        hover:bg-gold-light transition-all duration-300
                        flex items-center justify-center gap-3 group"
                      data-cursor-hover
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Confirmar pelo WhatsApp</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="glass p-6 lg:p-8 h-full flex flex-col items-center justify-center text-center">
                <CalendarIcon className="w-12 h-12 text-off-white/20 mb-4" />
                <p className="text-off-white/60">
                  Selecione uma data no calendário
                </p>
                <p className="text-off-white/40 text-sm mt-2">
                  para ver os horários disponíveis
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Clinic Hours Info */}
        <div className="mt-12 glass p-6 lg:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-gold text-sm tracking-widest uppercase mb-4">
                Horário de Atendimento
              </h4>
              <div className="space-y-2 text-off-white/60 text-sm">
                <p>Segunda a Sexta: 09:00 - 18:00</p>
                <p>Sábado e Domingo: Fechado</p>
              </div>
            </div>
            <div>
              <h4 className="text-gold text-sm tracking-widest uppercase mb-4">
                Serviços Disponíveis
              </h4>
              <div className="grid grid-cols-2 gap-2 text-off-white/60 text-sm">
                <p>• Lentes de Contato</p>
                <p>• Implantes</p>
                <p>• Clareamento</p>
                <p>• Harmonização</p>
                <p>• Reabilitação</p>
                <p>• Próteses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
