import { useState, useEffect } from 'react';
import { X, Scissors, Calendar, Clock, User, CheckCircle2, ChevronRight } from 'lucide-react';
import { ServiceItem, CustomerDetails, Appointment } from '../types';
import { SERVICES_DATA } from '../data/barberData';
import { bookingService, formatDateKey } from '../services/bookingService';

// Step Subcomponents
import StepServiceSelect from './booking/StepServiceSelect';
import StepDateSelect from './booking/StepDateSelect';
import StepTimeSelect from './booking/StepTimeSelect';
import StepCustomerDetails from './booking/StepCustomerDetails';
import StepReviewConfirm from './booking/StepReviewConfirm';
import BookingSuccessScreen from './booking/BookingSuccessScreen';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: ServiceItem | null;
}

type StepType = 'service' | 'date' | 'time' | 'details' | 'confirm' | 'success';

export default function BookingModal({
  isOpen,
  onClose,
  preSelectedService,
}: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState<StepType>('service');

  // Booking Flow State
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    notes: '',
    optInNotifications: true,
  });
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Initialize or reset when opened
  useEffect(() => {
    if (isOpen) {
      if (preSelectedService) {
        setSelectedServices([preSelectedService]);
        setCurrentStep('date'); // Jump directly to date if service pre-selected
      } else if (selectedServices.length === 0) {
        // Default to Modern Cut if none chosen
        setSelectedServices([SERVICES_DATA[0]]);
        setCurrentStep('service');
      }

      // Default date to tomorrow if not set or past
      const todayStr = formatDateKey(new Date());
      if (!selectedDate || selectedDate < todayStr) {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        if (d.getDay() === 1) d.setDate(d.getDate() + 1); // Skip Monday
        setSelectedDate(formatDateKey(d));
      }
    } else {
      // Reset confirmation when closed
      if (confirmedAppointment) {
        setConfirmedAppointment(null);
        setCurrentStep('service');
      }
    }
  }, [isOpen, preSelectedService]);

  if (!isOpen) return null;

  // Toggle service selection (allows multi-service selection)
  const handleToggleService = (service: ServiceItem) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        // Do not allow deselecting the last one if it leaves 0
        if (prev.length === 1) return prev;
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  // Submit confirmation handler
  const handleConfirmAppointment = async () => {
    const appt = await bookingService.createAppointment({
      serviceIds: selectedServices.map((s) => s.id),
      services: selectedServices,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      customer: customerDetails,
    });

    setConfirmedAppointment(appt);
    setCurrentStep('success');
  };

  // Step definitions for progress indicator
  const stepsList: Array<{ id: StepType; label: string; icon: any }> = [
    { id: 'service', label: 'SERVICE', icon: Scissors },
    { id: 'date', label: 'DATE', icon: Calendar },
    { id: 'time', label: 'TIME', icon: Clock },
    { id: 'details', label: 'DETAILS', icon: User },
    { id: 'confirm', label: 'CONFIRM', icon: CheckCircle2 },
  ];

  const currentStepIndex = stepsList.findIndex((s) => s.id === currentStep);

  const canNavigateToStep = (targetStep: StepType): boolean => {
    if (currentStep === 'success') return false;
    if (targetStep === 'service') return true;
    if (targetStep === 'date') return selectedServices.length > 0;
    if (targetStep === 'time') return selectedServices.length > 0 && Boolean(selectedDate);
    if (targetStep === 'details') return selectedServices.length > 0 && Boolean(selectedDate) && Boolean(selectedTimeSlot);
    if (targetStep === 'confirm') {
      return (
        selectedServices.length > 0 &&
        Boolean(selectedDate) &&
        Boolean(selectedTimeSlot) &&
        Boolean(customerDetails.fullName) &&
        Boolean(customerDetails.phone)
      );
    }
    return false;
  };

  return (
    <div
      id="booking-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="booking-modal-panel"
        className="relative w-full max-w-3xl bg-[#0e0e11] border border-white/10 shadow-2xl overflow-hidden max-h-[94vh] flex flex-col rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#121216] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c5a059]">
              FADED BY CASH • DIRECT ONLINE BOOKING
            </span>
            <h2 className="serif text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mt-0.5">
              Book Your Appointment
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5-Step Progress Indicator (Hidden on success screen) */}
        {currentStep !== 'success' && (
          <div className="bg-[#0a0a0c] px-4 sm:px-6 py-3 border-b border-white/5 overflow-x-auto scrollbar-none">
            <div className="flex items-center justify-between min-w-[500px]">
              {stepsList.map((step, idx) => {
                const isActive = step.id === currentStep;
                const isPassed = currentStepIndex > idx;
                const isNavigable = canNavigateToStep(step.id);

                return (
                  <div key={step.id} className="flex items-center flex-1 last:flex-none">
                    <button
                      type="button"
                      disabled={!isNavigable}
                      onClick={() => isNavigable && setCurrentStep(step.id)}
                      className={`flex items-center gap-1.5 text-[11px] font-bold tracking-widest transition-all ${
                        isActive
                          ? 'text-[#c5a059]'
                          : isPassed
                          ? 'text-white/80 hover:text-white cursor-pointer'
                          : 'text-white/20 cursor-not-allowed'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isActive
                            ? 'bg-[#c5a059] text-black ring-2 ring-[#c5a059]/40'
                            : isPassed
                            ? 'bg-white/20 text-white'
                            : 'bg-white/5 text-white/30'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span>{step.label}</span>
                    </button>

                    {idx < stepsList.length - 1 && (
                      <ChevronRight
                        className={`w-3.5 h-3.5 mx-2 shrink-0 ${
                          isPassed ? 'text-white/40' : 'text-white/10'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Step Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {currentStep === 'service' && (
            <StepServiceSelect
              selectedServices={selectedServices}
              onToggleService={handleToggleService}
              onProceed={() => setCurrentStep('date')}
            />
          )}

          {currentStep === 'date' && (
            <StepDateSelect
              selectedDate={selectedDate}
              onSelectDate={(date) => {
                setSelectedDate(date);
                // Reset time slot when date changes
                setSelectedTimeSlot('');
              }}
              onProceed={() => setCurrentStep('time')}
              onBack={() => setCurrentStep('service')}
            />
          )}

          {currentStep === 'time' && (
            <StepTimeSelect
              selectedDate={selectedDate}
              selectedTimeSlot={selectedTimeSlot}
              onSelectTimeSlot={(time) => setSelectedTimeSlot(time)}
              onProceed={() => setCurrentStep('details')}
              onBack={() => setCurrentStep('date')}
            />
          )}

          {currentStep === 'details' && (
            <StepCustomerDetails
              details={customerDetails}
              onChangeDetails={setCustomerDetails}
              onProceed={() => setCurrentStep('confirm')}
              onBack={() => setCurrentStep('time')}
            />
          )}

          {currentStep === 'confirm' && (
            <StepReviewConfirm
              services={selectedServices}
              date={selectedDate}
              timeSlot={selectedTimeSlot}
              customer={customerDetails}
              onConfirm={handleConfirmAppointment}
              onEditServices={() => setCurrentStep('service')}
              onEditDateTime={() => setCurrentStep('date')}
              onEditCustomer={() => setCurrentStep('details')}
              onBack={() => setCurrentStep('details')}
            />
          )}

          {currentStep === 'success' && confirmedAppointment && (
            <BookingSuccessScreen
              appointment={confirmedAppointment}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
