import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

const dayNames = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
const availableServices = [
  "Lentes de Contato",
  "Facetas de Porcelana",
  "Implantodontia",
  "Ortodontia Invisível",
  "Clareamento Dental",
  "Check-up Completo",
  "Limpeza / Profilaxia",
];

// Generate hours from 09:00 to 17:00 for the time slots
const getAvailableTimeSlots = () => {
  const slots = [];
  for (let i = 9; i <= 17; i++) {
    slots.push(`${i.toString().padStart(2, "0")}:00`);
    if (i !== 17) slots.push(`${i.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

const CalendarDay: React.FC<{ 
  day: number | string; 
  isHeader?: boolean;
  isPast?: boolean;
  isWeekend?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}> = ({ day, isHeader, isPast, isWeekend, isSelected, onSelect }) => {
  if (isHeader) {
    return (
      <div className="col-span-1 row-span-1 flex h-8 w-8 items-center justify-center">
        <span className="font-medium text-off-white/50 text-xs">{day}</span>
      </div>
    );
  }

  const isDisabled = isPast || isWeekend;
  
  let dayClasses = "text-off-white/80 hover:bg-gold/20 hover:text-gold cursor-pointer";
  if (isDisabled) dayClasses = "text-off-white/20 cursor-not-allowed line-through";
  if (isSelected) dayClasses = "bg-gold text-deep-black shadow-lg shadow-gold/20";

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onSelect}
      className={`col-span-1 row-span-1 flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-300 ${dayClasses}`}
    >
      <span className="font-medium text-sm">{day}</span>
    </button>
  );
};

export function Calendar() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("pt-BR", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();

  const handleDateSelect = (day: number) => {
    const date = new Date(currentYear, currentDate.getMonth(), day);
    setSelectedDate(date);
    // Reset time when date changes
    setSelectedTime("");
  };

  const isFormValid = name.trim() !== "" && service !== "" && selectedDate !== null && selectedTime !== "";

  const handleWhatsAppBooking = () => {
    if (!isFormValid) return;

    const formattedDate = selectedDate.toLocaleDateString('pt-BR');
    const message = `Olá! Meu nome é *${name}*. Gostaria de agendar uma consulta presencial.\n\nServiço: *${service}*\nData: *${formattedDate}*\nHorário: *${selectedTime}*`;
    
    const whatsappUrl = `https://wa.me/5511999199200?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const renderCalendarDays = () => {
    let days: React.ReactNode[] = [
      ...dayNames.map((day) => (
        <CalendarDay key={`header-${day}`} day={day} isHeader />
      )),
      ...Array(firstDayOfWeek).map((_, i) => (
        <div key={`empty-start-${i}`} className="col-span-1 row-span-1 h-8 w-8" />
      )),
      ...Array(daysInMonth)
        .fill(null)
        .map((_, i) => {
          const dayNumber = i + 1;
          const date = new Date(currentYear, currentDate.getMonth(), dayNumber);
          const isPast = date < new Date(currentDate.setHours(0, 0, 0, 0));
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const isSelected = selectedDate?.getDate() === dayNumber && selectedDate?.getMonth() === date.getMonth();

          return (
            <CalendarDay 
              key={`date-${dayNumber}`} 
              day={dayNumber} 
              isPast={isPast}
              isWeekend={isWeekend}
              isSelected={isSelected}
              onSelect={() => handleDateSelect(dayNumber)}
            />
          );
        }),
    ];

    return days;
  };

  const timeSlots = useMemo(() => getAvailableTimeSlots(), []);

  return (
    <div className="grid lg:grid-cols-12 gap-12 items-start">
      {/* Form Content */}
      <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left space-y-6">
        <div>
          <h2 className="mb-4 text-2xl md:text-4xl font-serif text-gold">
            Pronto para transformar seu sorriso?
          </h2>
          <p className="text-sm md:text-base text-off-white/70 font-light leading-relaxed">
            Preencha seus dados para solicitar o agendamento no nosso contato do WhatsApp. A clínica funciona de <strong>segunda a sexta, das 09h às 18h</strong>.
          </p>
        </div>

        <div className="space-y-4 text-left">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-sm text-off-white/60 uppercase tracking-widest hidden">Nome</label>
            <input 
              type="text" 
              placeholder="Qual o seu nome?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-charcoal border border-off-white/10 rounded-sm p-4 text-off-white placeholder:text-off-white/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all duration-300"
            />
          </div>

          {/* Service Selector */}
          <div className="space-y-2">
            <label className="text-sm text-off-white/60 uppercase tracking-widest hidden">Serviço de Interesse</label>
            <select 
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-charcoal border border-off-white/10 rounded-sm p-4 text-off-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="" disabled hidden>Selecione o tratamento...</option>
              {availableServices.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Calendar Area */}
      <div className="lg:col-span-7 transition-all duration-500 ease-out relative flex flex-col items-center">
        <div className="w-full max-w-lg">
          <BentoCard height="h-auto" hideOverflow={false}>
            <div
              className="h-full rounded-sm border border-gold/10 p-4 bg-deep-black"
              style={{ boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)" }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <p className="text-sm capitalize">
                  <span className="font-medium text-off-white text-lg">
                    {currentMonth}, {currentYear}
                  </span>
                </p>
                <span className="h-1 w-1 rounded-full bg-gold/50">&nbsp;</span>
                <p className="text-xs text-off-white/50">Disponibilidade</p>
              </div>

              {/* Date Grid */}
              <div className="mt-4 grid grid-cols-7 gap-y-3 gap-x-2 px-2 pb-6 border-b border-off-white/10">
                {renderCalendarDays()}
              </div>

              {/* Time Slots (Conditionally Rendered) */}
              <div className="mt-6">
                <p className="text-sm text-off-white/50 mb-4 text-center">
                  {selectedDate ? "Selecione um horário" : "Selecione um dia útil primeiro"}
                </p>
                <div className={`grid grid-cols-3 sm:grid-cols-4 gap-3 ${!selectedDate && 'opacity-30 pointer-events-none filter blur-[1px]'}`}>
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 text-sm rounded-md transition-all duration-300 border
                        ${selectedTime === time 
                          ? 'bg-gold border-gold text-deep-black font-medium shadow-md shadow-gold/20' 
                          : 'bg-transparent border-off-white/20 text-off-white/80 hover:border-gold/50 hover:text-gold'
                        }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </BentoCard>

          <div className="mt-8 flex justify-end">
             <Button 
                onClick={handleWhatsAppBooking}
                disabled={!isFormValid}
                className={`w-full lg:w-auto transition-all duration-500 font-medium tracking-wide py-6 px-12 rounded-sm
                        ${isFormValid 
                          ? 'bg-gold text-deep-black hover:bg-gold-light shadow-lg shadow-gold/20 scale-100 opacity-100 cursor-pointer' 
                          : 'bg-off-white/10 text-off-white/30 cursor-not-allowed scale-95 opacity-70'
                        }`}
              >
                Solicitar no WhatsApp
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  height?: string;
  rowSpan?: number;
  colSpan?: number;
  className?: string;
  showHoverGradient?: boolean;
  hideOverflow?: boolean;
}

export function BentoCard({
  children,
  height = "h-auto",
  rowSpan = 8,
  colSpan = 7,
  className = "",
  showHoverGradient = true,
  hideOverflow = true,
}: BentoCardProps) {
  const cardContent = (
    <div
      className={`group relative flex flex-col rounded-sm border border-gold/20 bg-[#1A1A1A] p-2 hover:border-gold/30 ${
        hideOverflow && "overflow-hidden"
      } ${height} row-span-${rowSpan} col-span-${colSpan} ${className}`}
    >
      {showHoverGradient && (
        <div className="user-select-none pointer-events-none absolute inset-0 z-30 bg-gradient-to-tl from-gold/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"></div>
      )}
      {children}
    </div>
  );

  return cardContent;
}
