
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { CalendarSection } from '@/components/calendar/calendar-section';
import Link from 'next/link';
import { ChevronLeft, CalendarPlus } from 'lucide-react';

export default function AlumnoCalendarioEstudioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button asChild variant="outline" size="sm" className="hover:bg-primary/10 transition-colors">
            <Link href="/alumnos">
              <ChevronLeft className="mr-2 h-4 w-4"/>
              Volver al Portal de Alumno
            </Link>
          </Button>
        </div>

        <div className="relative text-center mb-12 p-6 md:p-8 bg-card rounded-xl shadow-xl overflow-hidden border border-border">
           <div className="absolute inset-0 opacity-[0.03] pattern-[0.8rem_0.8rem_#000000_radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:opacity-[0.05] dark:pattern-[0.8rem_0.8rem_#ffffff_radial-gradient(circle_at_center,_var(--tw-gradient-stops))]"></div>
          <CalendarPlus className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
            Mi Calendario de Estudio
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Organiza tus sesiones de estudio, añade tareas importantes y planifica tu aprendizaje.
            Las clases oficiales de la academia (Martes y Jueves) se muestran como referencia.
          </p>
        </div>
        
        <CalendarSection isEditable={true} />

      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Calendario de Estudio del Alumno.
        </div>
      </footer>
    </div>
  );
}
