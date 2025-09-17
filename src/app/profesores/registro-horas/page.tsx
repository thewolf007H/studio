
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, Clock, Save } from 'lucide-react';
import { WeekdayClassReportCard, type WeekdayClassReportData } from '@/components/reports/WeekdayClassReportCard';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const reportData: WeekdayClassReportData = {
  tipo_documento: "Weekday Class Report",
  facilitador: "Pamela Altamirano Pozo",
  nivel: "EF 1A",
  modalidad: "Accelerated",
  horario: "20:45–22:00",
  fecha_inicio: "2024-08-25",
  fecha_fin: "2024-10-22",
  mes: "September",
  estructura_semanal: {
    lunes: [
      { tema: "Verbs", pagina: 1 }, { tema: "Time", pagina: 6 }, { pagina: 11 }, { pagina: 16 }, { pagina: 21 }, { pagina: 26 }
    ],
    martes: [
      { tema: "School Stuff", pagina: 2 }, { tema: "Days & Months", pagina: 7 }, { pagina: 12 }, { pagina: 17 }, { pagina: 22 }, { pagina: 27 }
    ],
    miércoles: [
      { tema: "Subject Pronouns", pagina: 3 }, { tema: "The Weather", pagina: 8 }, { pagina: 13 }, { pagina: 18 }, { pagina: 23 }, { pagina: 28 }
    ],
    jueves: [
      { tema: "Clothes and Accessories", pagina: 4 }, { tema: "Computers and More", pagina: 9 }, { pagina: 14 }, { pagina: 19 }, { pagina: 24 }, { pagina: 29 }
    ],
    viernes: [
      { tema: "The Sentence", pagina: 5 }, { tema: "Definite & Indefinite Articles", pagina: 10 }, { pagina: 15 }, { pagina: 20 }, { pagina: 25 }, { pagina: 30 }
    ]
  },
  observaciones: "",
  registro_horas: {
    lunes: "1.25", martes: "1.25", miércoles: "1.25", jueves: "1.25", viernes: "1.25"
  }
};


export default function ProfesorRegistroHorasPage() {
    const { toast } = useToast();
    const [observaciones, setObservaciones] = useState('');

    const handleSave = () => {
        console.log("Guardando registro de horas con observaciones:", observaciones);
        toast({
            title: "Registro de Horas Guardado",
            description: "Tu informe de horas para el mes ha sido enviado para revisión.",
        });
    }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button asChild variant="outline" size="sm" className="hover:bg-primary/10 transition-colors">
            <Link href="/profesores">
              <ChevronLeft className="mr-2 h-4 w-4"/>
              Volver al Portal de Profesor
            </Link>
          </Button>
        </div>

        <div className="relative text-center mb-12 p-6 md:p-8 bg-card rounded-xl shadow-xl overflow-hidden border border-border">
          <div className="absolute inset-0 opacity-[0.03] pattern-[0.8rem_0.8rem_#000000_radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:opacity-[0.05] dark:pattern-[0.8rem_0.8rem_#ffffff_radial-gradient(circle_at_center,_var(--tw-gradient-stops))]"></div>
          <Clock className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
            Registro de Horas Semanales
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Revisa tu planificación semanal, añade observaciones y envía tu registro de horas a la administración.
          </p>
        </div>
        
        <Card className="shadow-lg bg-card max-w-6xl mx-auto">
            <CardHeader>
                <CardTitle>Informe de Clases - {reportData.mes}</CardTitle>
                <CardDescription>Este es un resumen de tu planificación y horas para el mes actual.</CardDescription>
            </CardHeader>
            <CardContent>
                <WeekdayClassReportCard data={reportData} />

                <div className="mt-6">
                    <Label htmlFor="observaciones" className="font-semibold">Observaciones Adicionales</Label>
                    <Textarea 
                        id="observaciones"
                        placeholder="Añade aquí cualquier comentario relevante sobre las clases, temas o alumnos..."
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                        className="mt-2"
                        rows={4}
                    />
                </div>
            </CardContent>
            <CardFooter>
                 <Button size="lg" onClick={handleSave}>
                    <Save className="mr-2 h-5 w-5" />
                    Guardar y Enviar Registro de Horas
                </Button>
            </CardFooter>
        </Card>


      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Registro de Horas.
        </div>
      </footer>
    </div>
  );
}
