
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, Clock, PlusCircle, Trash2 } from "lucide-react";
import { format, isSameDay } from 'date-fns';

interface CalendarSectionProps {
  isEditable?: boolean;
}

// Configuration for class schedules
const IN_PERSON_CLASS_DAYS = [2]; // Tuesday
const VIRTUAL_CLASS_DAYS = [4]; // Thursday

// Helper function to calculate the next occurrence of a specific weekday and time
const getNextRecurrentClassDateTime = (dayOfWeek: number, hour: number, minute: number): Date => {
  const now = new Date();
  let result = new Date(now);

  result.setDate(now.getDate() + (dayOfWeek + 7 - now.getDay()) % 7);
  result.setHours(hour, minute, 0, 0);

  // If the calculated time is in the past for today, move to next week
  if (result.getTime() < now.getTime()) {
    result.setDate(result.getDate() + 7);
  }
  return result;
};

export function CalendarSection({ isEditable = false }: CalendarSectionProps) {
  const [selectedDateForCalendar, setSelectedDateForCalendar] = useState<Date | undefined>(undefined);
  const [nextClassTime, setNextClassTime] = useState<Date | null>(null);
  const [nextClassType, setNextClassType] = useState<"Presencial" | "Virtual" | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  
  const [personalEvents, setPersonalEvents] = useState<Date[]>([]);
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [newEventDate, setNewEventDate] = useState<Date | undefined>(new Date());
  const [newEventTimeInput, setNewEventTimeInput] = useState<string>("10:00");

  useEffect(() => {
    setSelectedDateForCalendar(new Date()); // Initialize on client

    // Determine the next class session (in-person or virtual)
    const potentialNextClasses = [
      { date: getNextRecurrentClassDateTime(2, 10, 0), type: "Presencial" as const }, // Next Tuesday 10:00 AM
      { date: getNextRecurrentClassDateTime(4, 14, 0), type: "Virtual" as const }    // Next Thursday 2:00 PM
    ];
    
    potentialNextClasses.sort((a, b) => a.date.getTime() - b.date.getTime());
    
    const nextClass = potentialNextClasses[0];
    setNextClassTime(nextClass.date);
    setNextClassType(nextClass.type);

  }, []); // Only on mount

  useEffect(() => {
    if (!nextClassTime) return;

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const difference = nextClassTime.getTime() - now;

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeRemaining(null); 
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [nextClassTime]);

  const isInPersonDay = (date: Date): boolean => IN_PERSON_CLASS_DAYS.includes(date.getDay());
  const isVirtualDay = (date: Date): boolean => VIRTUAL_CLASS_DAYS.includes(date.getDay());
  const isPersonalEventDay = (date: Date): boolean => personalEvents.some(event => isSameDay(event, date));

  const handleAddEvent = () => {
    if (newEventDate) {
      const [hours, minutes] = newEventTimeInput.split(':').map(Number);
      if (!isNaN(hours) && !isNaN(minutes)) {
        const newEventDateTime = new Date(newEventDate);
        newEventDateTime.setHours(hours, minutes, 0, 0);
        
        if (!personalEvents.find(d => d.getTime() === newEventDateTime.getTime())) {
          setPersonalEvents([...personalEvents, newEventDateTime]);
        }
      } else {
        alert("Formato de hora inválido. Use HH:MM");
        return;
      }
    }
    setNewEventDate(new Date());
    setNewEventTimeInput("10:00");
    setIsAddEventDialogOpen(false);
  };

  const handleRemovePersonalEvent = (dateToRemove: Date) => {
    setPersonalEvents(prev => prev.filter(event => !isSameDay(event, dateToRemove)));
  };

  return (
    <section id="calendar" className="py-12 bg-secondary/30 rounded-lg my-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold font-headline text-center sm:text-left mb-4 sm:mb-0">Calendario y Próxima Clase</h2>
            {isEditable && (
            <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
                <DialogTrigger asChild>
                <Button variant="outline" className="bg-card hover:bg-primary/10">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Añadir Sesión de Estudio
                </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-card">
                <DialogHeader>
                    <DialogTitle>Añadir Sesión de Estudio</DialogTitle>
                    <DialogDescription>
                    Selecciona la fecha y hora para tu sesión de estudio personalizada.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2 items-center">
                    <Label htmlFor="new-event-date">Fecha</Label>
                    <Calendar
                        mode="single"
                        selected={newEventDate}
                        onSelect={setNewEventDate}
                        className="rounded-md border"
                        disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() -1 )) }
                    />
                    </div>
                    <div className="grid gap-2 items-center">
                    <Label htmlFor="new-event-time">Hora (HH:MM)</Label>
                    <Input 
                        id="new-event-time" 
                        type="time" 
                        value={newEventTimeInput}
                        onChange={(e) => setNewEventTimeInput(e.target.value)}
                        className="bg-background"
                    />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddEventDialogOpen(false)}>Cancelar</Button>
                    <Button type="submit" onClick={handleAddEvent}>Añadir Sesión</Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>
            )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="w-full shadow-lg bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-headline font-medium">Horarios de Clase</CardTitle>
              <CalendarDays className="h-6 w-6 text-accent" />
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {selectedDateForCalendar === undefined ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="ml-3 text-muted-foreground">Cargando calendario...</p>
                </div>
              ) : (
                <Calendar
                  mode="single"
                  selected={selectedDateForCalendar}
                  onSelect={setSelectedDateForCalendar}
                  className="rounded-md border p-0"
                  disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() -1 )) }
                  modifiers={{ 
                    inPerson: isInPersonDay,
                    virtual: isVirtualDay,
                    personal: isPersonalEventDay 
                  }}
                  modifiersStyles={{ 
                    inPerson: { border: '2px solid hsl(var(--primary))', borderRadius: 'var(--radius)' },
                    virtual: { border: '2px solid hsl(var(--accent))', borderRadius: 'var(--radius)' },
                    personal: { backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))', fontWeight: '600', borderRadius: 'var(--radius)' }
                  }}
                  footer={
                    <div className="text-xs text-muted-foreground pt-3 px-3 text-center space-y-1">
                      <p><span className="inline-block w-3 h-3 rounded-full border-2 border-primary mr-1 align-middle"></span> Clases Presenciales</p>
                      <p><span className="inline-block w-3 h-3 rounded-full border-2 border-accent mr-1 align-middle"></span> Clases Virtuales</p>
                      <p><span className="inline-block w-3 h-3 rounded-full bg-secondary mr-1 align-middle"></span> Sesiones de estudio</p>
                    </div>
                  }
                  components={isEditable ? {
                    Day: ({ date, displayMonth }) => {
                      const isPersonal = isPersonalEventDay(date);
                      if (date.getMonth() !== displayMonth.getMonth()) {
                        return <div className="h-9 w-9 p-0 relative flex items-center justify-center text-muted-foreground opacity-50"> {format(date, "d")} </div>;
                      }
                      return (
                        <div className="relative h-9 w-9 p-0 flex items-center justify-center">
                          {format(date, "d")}
                          {isPersonal && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-0 right-0 h-4 w-4 p-0 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent day selection
                                handleRemovePersonalEvent(date);
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="sr-only">Eliminar sesión</span>
                            </Button>
                          )}
                        </div>
                      );
                    }
                  } : {}}
                />
              )}
            </CardContent>
          </Card>

          <Card className="w-full shadow-lg bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-headline font-medium">Próxima Clase Programada</CardTitle>
              <Clock className="h-6 w-6 text-accent" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[280px] text-center">
              {timeRemaining && nextClassType ? (
                <div>
                  <div className={`text-sm font-semibold px-3 py-1 rounded-full mb-3 inline-block ${nextClassType === 'Presencial' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent-foreground'}`}>
                    Clase {nextClassType}
                  </div>
                  <p className="text-lg text-muted-foreground mb-2">Tu próxima clase comienza en:</p>
                  <div className="text-4xl font-bold text-primary mb-4">
                    {timeRemaining.days > 0 && `${timeRemaining.days}d `}
                    {`${String(timeRemaining.hours).padStart(2, '0')}h `}
                    {`${String(timeRemaining.minutes).padStart(2, '0')}m `}
                    {`${String(timeRemaining.seconds).padStart(2, '0')}s`}
                  </div>
                  {nextClassTime && (
                     <p className="text-md text-muted-foreground">
                       {nextClassTime.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                       <br/>
                       a las {nextClassTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                     </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-3"></div>
                  <p className="text-lg text-muted-foreground">Calculando próxima clase...</p>
                </div>
              )}
               <CardDescription className="mt-6 text-xs">
                (El contador se basa en las clases programadas del instituto. La gestión de sesiones personalizadas es visual y local a esta sesión.)
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
