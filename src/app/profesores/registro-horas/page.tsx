
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, Clock, Save, Edit, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WeekdayClassReportCard, type WeekdayClassReportData, type ClasesPorDia, type ClaseTipo } from '@/components/reports/WeekdayClassReportCard';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';


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
  clases_impartidas: {
    lunes: { normal: 2 },
    martes: { normal: 2 },
    miércoles: { normal: 1, personalizada: 1 },
    jueves: { normal: 2 },
    viernes: { acelerada: 2 },
  },
};

type DiaSemana = 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes';

export default function ProfesorRegistroHorasPage() {
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [reportData, setReportData] = useState(reportData1);

    const [registroClase, setRegistroClase] = useState({
        dia: '',
        tipo: '',
        cantidad: 1,
        informe: '',
    });

    const handleSave = () => {
        console.log("Enviando informe de horas con:", reportData);
        toast({
            title: "Informe de Horas Enviado",
            description: "Tu informe ha sido enviado a revisión. Gracias.",
        });
        setIsEditing(false);
    };

    const handleRegistrarClase = () => {
        const { dia, tipo, cantidad, informe } = registroClase;
        if (!dia || !tipo) {
            toast({
                title: "Error",
                description: "Debes seleccionar el día y el tipo de clase.",
                variant: "destructive",
            });
            return;
        }

        const wordCount = informe.trim().split(/\s+/).length;
        if (wordCount < 8 || wordCount > 20) {
             toast({
                title: "Error en el Informe",
                description: "El informe debe contener entre 8 y 20 palabras.",
                variant: "destructive",
            });
            return;
        }

        const diaKey = dia as DiaSemana;
        const tipoKey = tipo as ClaseTipo;
        
        setReportData(prevData => {
            const nuevasClasesDia = { ...prevData.clases_impartidas[diaKey] };
            nuevasClasesDia[tipoKey] = (nuevasClasesDia[tipoKey] || 0) + cantidad;

            const nuevasClasesImpartidas = {
                ...prevData.clases_impartidas,
                [diaKey]: nuevasClasesDia,
            };
            
            return { ...prevData, clases_impartidas: nuevasClasesImpartidas };
        });

        toast({
            title: "Clase Registrada (Simulación)",
            description: `Se añadieron ${cantidad} clase(s) de tipo "${tipo}" para el día ${dia}.`,
        });

        document.querySelector('[aria-label="Close"]')?.click();
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
                    <CardDescription>Revisa el informe, registra tus clases impartidas y añade observaciones antes de enviar.</CardDescription>
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
             <CardFooter className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-6 border-t">
                <Dialog>
                    <DialogTrigger asChild>
                         <Button variant="default">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Registrar Clase Impartida
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-card">
                        <DialogHeader>
                            <DialogTitle>Registro de Clase Impartida</DialogTitle>
                            <DialogDescription>
                                Selecciona el día y el tipo de clase que impartiste.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="dia-clase">Día de la Clase</Label>
                                <Select onValueChange={(value) => setRegistroClase(p => ({ ...p, dia: value }))}>
                                    <SelectTrigger id="dia-clase"><SelectValue placeholder="Selecciona un día..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="lunes">Lunes</SelectItem>
                                        <SelectItem value="martes">Martes</SelectItem>
                                        <SelectItem value="miércoles">Miércoles</SelectItem>
                                        <SelectItem value="jueves">Jueves</SelectItem>
                                        <SelectItem value="viernes">Viernes</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="tipo-clase">Tipo de Clase</Label>
                                <Select onValueChange={(value) => setRegistroClase(p => ({ ...p, tipo: value }))}>
                                    <SelectTrigger id="tipo-clase"><SelectValue placeholder="Selecciona un tipo..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="normal">Clase Normal</SelectItem>
                                        <SelectItem value="personalizada">Clase Personalizada</SelectItem>
                                        <SelectItem value="acelerada">Clase Acelerada</SelectItem>
                                        <SelectItem value="virtual">Clase Virtual</SelectItem>
                                        <SelectItem value="hibrida">Clase Híbrida</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cantidad-clases">Cantidad a añadir</Label>
                                <Input 
                                    id="cantidad-clases" 
                                    type="number"
                                    min="1"
                                    value={registroClase.cantidad} 
                                    onChange={(e) => setRegistroClase(p => ({ ...p, cantidad: parseInt(e.target.value) || 1 }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="informe-clase">Informe</Label>
                                <Textarea
                                    id="informe-clase"
                                    placeholder="¿Qué enseñaste en esta clase?"
                                    value={registroClase.informe}
                                    onChange={(e) => setRegistroClase(p => ({ ...p, informe: e.target.value }))}
                                />
                                <p className="text-xs text-muted-foreground">Breve descripción de lo enseñado (8-20 palabras).</p>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => document.querySelector('[aria-label="Close"]')?.click()}>Cancelar</Button>
                            <Button type="submit" onClick={handleRegistrarClase}>Guardar Registro</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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
