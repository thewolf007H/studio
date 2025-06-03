'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from "lucide-react";

export function CalendarSection() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <section id="calendar" className="py-12 bg-secondary/30 rounded-lg my-8">
      <h2 className="text-3xl font-bold font-headline text-center mb-8">Calendario de Clases</h2>
      <div className="flex justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-headline font-medium">Horarios de Clase</CardTitle>
            <CalendarDays className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {date === undefined ? (
              <p>Cargando calendario...</p>
            ) : (
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() -1 )) } // Disable past dates
              />
            )}
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Aquí se mostrarán los horarios de las clases.
              <br />
              <span className="font-semibold text-primary">(Integración con Google Calendar próximamente)</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
