
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from "lucide-react";

// Helper function to calculate the next occurrence of a specific weekday and time
const getNextClassDateTime = (dayOfWeek: number, hour: number, minute: number): Date => {
  const now = new Date();
  let result = new Date(now);

  result.setDate(now.getDate() + (dayOfWeek + 7 - now.getDay()) % 7);
  result.setHours(hour, minute, 0, 0);

  // If the calculated date is in the past (e.g., today but time has passed, or day was last week)
  // add 7 days to get the next week's occurrence
  if (result.getTime() < now.getTime()) {
    result.setDate(result.getDate() + 7);
  }
  // If it's the same day but time already passed for that day
  if (result.getDay() === now.getDay() && result.getTime() < now.getTime()) {
     result.setDate(result.getDate() + 7);
  }


  return result;
};


export function CalendarSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [nextClassTime, setNextClassTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  // Example: Classes are on Tuesdays and Thursdays
  const classDaysOfWeek = [2, 4]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  useEffect(() => {
    // Initialize selectedDate to today, client-side only
    setSelectedDate(new Date());

    // Determine the very next class session from today
    // Example: Classes are Tuesdays at 10:00 AM and Thursdays at 2:00 PM
    const potentialNextClasses = [
      getNextClassDateTime(2, 10, 0), // Next Tuesday 10:00 AM
      getNextClassDateTime(4, 14, 0)  // Next Thursday 2:00 PM
    ];

    // Sort to find the earliest next class
    potentialNextClasses.sort((a, b) => a.getTime() - b.getTime());
    const actualNextClass = potentialNextClasses[0];
    setNextClassTime(actualNextClass);

  }, []);

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
        setTimeRemaining(null); // Class time has passed or is ongoing
        // Optionally, logic to find the *next* next class could be triggered here
      }
    };

    calculateTimeRemaining(); // Initial calculation
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [nextClassTime]);

  const isClassDay = (date: Date): boolean => {
    return classDaysOfWeek.includes(date.getDay());
  };

  const classDayStyle = {
    border: '2px solid hsl(var(--primary))',
    borderRadius: 'var(--radius)',
  };

  return (
    <section id="calendar" className="py-12 bg-secondary/30 rounded-lg my-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-headline text-center mb-10">Calendario y Próxima Clase</h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="w-full shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-headline font-medium">Horarios de Clase</CardTitle>
              <CalendarDays className="h-6 w-6 text-accent" />
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {selectedDate === undefined ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="ml-3 text-muted-foreground">Cargando calendario...</p>
                </div>
              ) : (
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border p-0"
                  disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() -1 )) }
                  modifiers={{ classDay: isClassDay }}
                  modifiersStyles={{ classDay: classDayStyle }}
                  footer={
                    <p className="text-xs text-muted-foreground pt-3 px-3 text-center">
                      Los días con borde azul son días de clase regulares.
                    </p>
                  }
                />
              )}
            </CardContent>
          </Card>

          <Card className="w-full shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-headline font-medium">Próxima Sesión</CardTitle>
              <Clock className="h-6 w-6 text-accent" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[280px] text-center">
              {timeRemaining ? (
                <div>
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
              ) : nextClassTime && new Date().getTime() > nextClassTime.getTime() ? (
                 <p className="text-xl text-muted-foreground">La sesión programada ya ha pasado. Consultando el próximo horario...</p>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-3"></div>
                  <p className="text-lg text-muted-foreground">Calculando próxima clase...</p>
                </div>
              )}
               <CardDescription className="mt-6 text-xs">
                (Horarios y contador son ilustrativos. La integración real con el sistema de clases está en desarrollo.)
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
