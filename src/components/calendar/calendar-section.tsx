
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, Clock, PlusCircle, Trash2 } from "lucide-react";
import { format, parse, isValid, isSameDay } from 'date-fns';

interface CalendarSectionProps {
  isEditable?: boolean;
}

// Helper function to calculate the next occurrence of a specific weekday and time
const getNextRecurrentClassDateTime = (dayOfWeek: number, hour: number, minute: number): Date => {
  const now = new Date();
  let result = new Date(now);

  result.setDate(now.getDate() + (dayOfWeek + 7 - now.getDay()) % 7);
  result.setHours(hour, minute, 0, 0);

  if (result.getTime() < now.getTime()) {
    result.setDate(result.getDate() + 7);
  }
  if (result.getDay() === now.getDay() && result.getTime() < now.getTime()) {
     result.setDate(result.getDate() + 7);
  }
  return result;
};


export function CalendarSection({ isEditable = false }: CalendarSectionProps) {
  const [selectedDateForCalendar, setSelectedDateForCalendar] = useState<Date | undefined>(undefined);
  const [nextClassTime, setNextClassTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  
  const [customClasses, setCustomClasses] = useState<Date[]>([]);
  const [isAddClassDialogOpen, setIsAddClassDialogOpen] = useState(false);
  const [newClassDate, setNewClassDate] = useState<Date | undefined>(new Date());
  const [newClassTimeInput, setNewClassTimeInput] = useState<string>("10:00");

  // Example: Recurring classes are on Tuesdays and Thursdays
  const recurrentClassDaysOfWeek = [2, 4]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  useEffect(() => {
    setSelectedDateForCalendar(new Date()); // Initialize on client

    // Determine the very next RECURRENT class session from today
    const potentialNextRecurrentClasses = [
      getNextRecurrentClassDateTime(2, 10, 0), // Next Tuesday 10:00 AM
      getNextRecurrentClassDateTime(4, 14, 0)  // Next Thursday 2:00 PM
    ];
    potentialNextRecurrentClasses.sort((a, b) => a.getTime() - b.getTime());
    const actualNextRecurrentClass = potentialNextRecurrentClasses[0];
    setNextClassTime(actualNextRecurrentClass);

  }, []); // Only on mount for recurrent classes

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

  const isRecurrentClassDay = (date: Date): boolean => {
    return recurrentClassDaysOfWeek.includes(date.getDay());
  };

  const isCustomClassDay = (date: Date): boolean => {
    return customClasses.some(customClass => isSameDay(customClass, date));
  };

  const classDayStyle = (date: Date) => {
    let styles = {};
    if (isRecurrentClassDay(date)) {
      styles = { ...styles, border: '2px solid hsl(var(--primary))', borderRadius: 'var(--radius)' };
    }
    if (isCustomClassDay(date)) {
      styles = { ...styles, backgroundColor: 'hsl(var(--accent) / 0.3)', borderRadius: 'var(--radius)', fontWeight: 'bold' };
    }
    return styles;
  };
  
  const handleAddClass = () => {
    if (newClassDate) {
      const [hours, minutes] = newClassTimeInput.split(':').map(Number);
      if (!isNaN(hours) && !isNaN(minutes)) {
        const newClassDateTime = new Date(newClassDate);
        newClassDateTime.setHours(hours, minutes, 0, 0);
        
        if (!customClasses.find(d => d.getTime() === newClassDateTime.getTime())) {
          setCustomClasses([...customClasses, newClassDateTime]);
        }
      } else {
        alert("Formato de hora inválido. Use HH:MM");
        return;
      }
    }
    setNewClassDate(new Date());
    setNewClassTimeInput("10:00");
    setIsAddClassDialogOpen(false);
  };

  const handleRemoveCustomClass = (dateToRemove: Date) => {
    setCustomClasses(prev => prev.filter(customClass => !isSameDay(customClass, dateToRemove)));
  };

  return (
    <section id="calendar" className="py-12 bg-secondary/30 rounded-lg my-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold font-headline text-center sm:text-left mb-4 sm:mb-0">Calendario y Próxima Clase</h2>
            {isEditable && (
            <Dialog open={isAddClassDialogOpen} onOpenChange={setIsAddClassDialogOpen}>
                <DialogTrigger asChild>
                <Button variant="outline" className="bg-card hover:bg-primary/10">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Añadir Nueva Clase
                </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-card">
                <DialogHeader>
                    <DialogTitle>Añadir Nueva Clase</DialogTitle>
                    <DialogDescription>
                    Selecciona la fecha y hora para la nueva clase.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2 items-center">
                    <Label htmlFor="new-class-date">Fecha</Label>
                    <Calendar
                        mode="single"
                        selected={newClassDate}
                        onSelect={setNewClassDate}
                        className="rounded-md border"
                        disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() -1 )) }
                    />
                    </div>
                    <div className="grid gap-2 items-center">
                    <Label htmlFor="new-class-time">Hora (HH:MM)</Label>
                    <Input 
                        id="new-class-time" 
                        type="time" 
                        value={newClassTimeInput}
                        onChange={(e) => setNewClassTimeInput(e.target.value)}
                        className="bg-background"
                    />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddClassDialogOpen(false)}>Cancelar</Button>
                    <Button type="submit" onClick={handleAddClass}>Añadir Clase</Button>
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
                    recurrentClass: isRecurrentClassDay,
                    customClass: isCustomClassDay 
                  }}
                  modifiersStyles={{ 
                    recurrentClass: { border: '2px solid hsl(var(--primary))', borderRadius: 'var(--radius)' },
                    customClass: { backgroundColor: 'hsl(var(--accent) / 0.4)', color: 'hsl(var(--accent-foreground))', fontWeight: '600', borderRadius: 'var(--radius)' }
                  }}
                  footer={
                    <div className="text-xs text-muted-foreground pt-3 px-3 text-center">
                      <p className="mb-1"><span className="inline-block w-3 h-3 rounded-full border-2 border-primary mr-1 align-middle"></span> Días de clase recurrentes.</p>
                      <p><span className="inline-block w-3 h-3 rounded-full bg-accent/40 mr-1 align-middle"></span> Clases personalizadas añadidas.</p>
                    </div>
                  }
                  components={isEditable ? {
                    Day: ({ date, displayMonth }) => {
                      const isCustom = isCustomClassDay(date);
                      if (date.getMonth() !== displayMonth.getMonth()) {
                        return <div className="h-9 w-9 p-0 relative flex items-center justify-center text-muted-foreground opacity-50"> {format(date, "d")} </div>;
                      }
                      return (
                        <div className="relative h-9 w-9 p-0 flex items-center justify-center">
                          {format(date, "d")}
                          {isCustom && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-0 right-0 h-4 w-4 p-0 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent day selection
                                handleRemoveCustomClass(date);
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="sr-only">Eliminar clase</span>
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
              <CardTitle className="text-xl font-headline font-medium">Próxima Sesión Recurrente</CardTitle>
              <Clock className="h-6 w-6 text-accent" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[280px] text-center">
              {timeRemaining ? (
                <div>
                  <p className="text-lg text-muted-foreground mb-2">Tu próxima clase recurrente comienza en:</p>
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
              ) : nextClassTime && new Date().getTime() > nextClassTime.getTime() ? (
                 <p className="text-xl text-muted-foreground">La sesión recurrente programada ya ha pasado. Consultando el próximo horario...</p>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-3"></div>
                  <p className="text-lg text-muted-foreground">Calculando próxima clase recurrente...</p>
                </div>
              )}
               <CardDescription className="mt-6 text-xs">
                (El contador se basa en clases recurrentes predefinidas. Las clases personalizadas añadidas no afectan este contador por ahora. La gestión es visual y local a esta sesión.)
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

