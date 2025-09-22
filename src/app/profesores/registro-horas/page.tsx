
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, Clock, Save, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WeekdayClassReportCard, type WeekdayClassReportData } from '@/components/reports/WeekdayClassReportCard';
import { Textarea } from '@/components/ui/textarea';

const reportData1: WeekdayClassReportData = {
  tipo_documento: "Weekday Class Report",
  facilitador: "Pamela Altamirano Pozo",
  nivel: "EF 1A",
  modalidad: "Accelerated",
  horario: "20:45–22:00",
  fecha_inicio: "2024-08-25",
  fecha_fin: "2024-10-22",
  mes: "September",
  estructura_semanal: {
    lunes: [ { tema: "Verbs", pagina: 1 }, { tema: "Time", pagina: 6 }, { pagina: 11 }, { pagina: 16 }, { pagina: 21 }, { pagina: 26 } ],
    martes: [ { tema: "School Stuff", pagina: 2 }, { tema: "Days & Months", pagina: 7 }, { pagina: 12 }, { pagina: 17 }, { pagina: 22 }, { pagina: 27 } ],
    miércoles: [ { tema: "Subject Pronouns", pagina: 3 }, { tema: "The Weather", pagina: 8 }, { pagina: 13 }, { pagina: 18 }, { pagina: 23 }, { pagina: 28 } ],
    jueves: [ { tema: "Clothes and Accessories", pagina: 4 }, { tema: "Computers and More", pagina: 9 }, { pagina: 14 }, { pagina: 19 }, { pagina: 24 }, { pagina: 29 } ],
    viernes: [ { tema: "The Sentence", pagina: 5 }, { tema: "Definite & Indefinite Articles", pagina: 10 }, { pagina: 15 }, { pagina: 20 }, { pagina: 25 }, { pagina: 30 } ]
  },
  observaciones: "Los estudiantes del nivel 1A están progresando adecuadamente, aunque algunos necesitan más práctica con los artículos definidos e indefinidos.",
  clases_impartidas: { lunes: 2, martes: 2, miércoles: 2, jueves: 2, viernes: 2 }
};


export default function ProfesorRegistroHorasPage() {
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [reportData, setReportData] = useState(reportData1);

    const handleSave = () => {
        console.log("Enviando informe de horas con:", reportData);
        toast({
            title: "Informe de Horas Enviado",
            description: "Tu informe ha sido enviado a revisión. Gracias.",
        });
        setIsEditing(false);
    };

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
            Registro de Actividades (Semanal)
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Completa tu informe de clases de Lunes a Viernes. El informe debe enviarse al final de la jornada.
          </p>
        </div>

        <Card className="shadow-lg bg-card max-w-4xl mx-auto">
            <CardHeader className="flex-row justify-between items-center">
                <div>
                    <CardTitle>Informe de Clases de Lunes a Viernes</CardTitle>
                    <CardDescription>Revisa el informe planificado y añade tus observaciones antes de enviar.</CardDescription>
                </div>
                 <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="mr-2 h-4 w-4"/>
                    {isEditing ? "Cancelar Edición" : "Editar Observaciones"}
                </Button>
            </CardHeader>
            <CardContent>
                <WeekdayClassReportCard data={reportData} />
                 <div className="mt-6">
                    <label htmlFor="observaciones" className="block text-sm font-medium text-muted-foreground mb-1">Observaciones del Informe</label>
                    <Textarea
                        id="observaciones"
                        placeholder="Añade aquí cualquier comentario relevante sobre la semana..."
                        value={reportData.observaciones}
                        onChange={(e) => setReportData({...reportData, observaciones: e.target.value})}
                        disabled={!isEditing}
                        className="mt-1"
                        rows={3}
                    />
                </div>
            </CardContent>
             <CardFooter className="flex justify-end pt-6 border-t">
                 <Button size="lg" onClick={handleSave}>
                    <Save className="mr-2 h-5 w-5" />
                    Enviar Informe a Dirección
                </Button>
            </CardFooter>
        </Card>
        
        <p className="text-xs text-muted-foreground text-center mt-6 max-w-3xl mx-auto">
            Recuerda enviar tu informe de actividades dentro de las 24 horas posteriores a la finalización de tu jornada laboral para su correcta aprobación por la administración.
        </p>

      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Registro de Horas.
        </div>
      </footer>
    </div>
  );
}
