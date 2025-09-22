
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, Clock, Save, Edit, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SaturdayClassReportCard, type SaturdayClassReportData } from '@/components/reports/SaturdayClassReportCard';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const reportDataSaturday: SaturdayClassReportData = {
  tipo_documento: "Saturday Class Report",
  facilitador: "Carlos Gómez",
  nivel: "Taller de Conversación",
  horario: "09:00 - 12:00",
  mes: "Septiembre",
  gestion: "2024",
  estructura_semanal: [
    { semana: 1, fecha: "2024-09-07", tema: "Debate: Technology in our lives", paginas: "N/A" },
    { semana: 2, fecha: "2024-09-14", tema: "Roleplay: Job Interviews", paginas: "N/A" },
    { semana: 3, fecha: "2024-09-21", tema: "Presentation Skills Practice", paginas: "N/A" },
    { semana: 4, fecha: "2024-09-28", tema: "Group Discussion: Current Events", paginas: "N/A" },
  ],
  observaciones: "El grupo muestra un excelente nivel de participación y fluidez. Se recomienda seguir fomentando el debate.",
  total_clases_mes: 4,
};

export default function ProfesorRegistroHorasSabadoPage() {
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [reportData, setReportData] = useState(reportDataSaturday);
    const [registroClase, setRegistroClase] = useState({
        dia: 'Sábado', // Pre-filled for this page
        tipo: '',
        cantidad: 1,
    });


    const handleSave = () => {
        console.log("Enviando informe de horas (sábados) con:", reportData);
        toast({
            title: "Informe de Horas (Sábados) Enviado",
            description: "Tu informe ha sido enviado a revisión. Gracias.",
        });
        setIsEditing(false);
    };

    const handleRegistrarClase = () => {
        const { tipo, cantidad } = registroClase;
        if (!tipo) {
            toast({
                title: "Error",
                description: "Debes seleccionar el tipo de clase.",
                variant: "destructive",
            });
            return;
        }

        setReportData(prevData => ({
            ...prevData,
            total_clases_mes: prevData.total_clases_mes + cantidad,
        }));

        toast({
            title: "Clase Sabatina Registrada (Simulación)",
            description: `Se añadieron ${cantidad} clase(s) de tipo "${tipo}" al total del mes.`,
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
            Registro de Actividades (Sábados)
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Registra tus clases y actividades sabatinas. El informe debe enviarse al final del día.
          </p>
        </div>

        <Card className="shadow-lg bg-card max-w-4xl mx-auto">
            <CardHeader className="flex-row justify-between items-center">
                 <div>
                    <CardTitle>Informe de Clases Sabatinas</CardTitle>
                    <CardDescription>Revisa el informe y añade tus observaciones antes de enviar.</CardDescription>
                </div>
                 <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="mr-2 h-4 w-4"/>
                    {isEditing ? "Cancelar Edición" : "Editar Observaciones"}
                </Button>
            </CardHeader>
            <CardContent>
                <SaturdayClassReportCard data={reportData} />
                 <div className="mt-6">
                    <label htmlFor="observaciones" className="block text-sm font-medium text-muted-foreground mb-1">Observaciones del Informe</label>
                    <Textarea
                        id="observaciones"
                        placeholder="Añade aquí cualquier comentario relevante sobre las clases del sábado..."
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
                            <DialogTitle>Registro de Clase Sabatina</DialogTitle>
                            <DialogDescription>
                                Registra el tipo de clase que impartiste este sábado.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="dia-clase">Día de la Clase</Label>
                                <Input id="dia-clase" value="Sábado" readOnly disabled />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="tipo-clase-sabado">Tipo de Clase</Label>
                                <Select onValueChange={(value) => setRegistroClase(p => ({ ...p, tipo: value }))}>
                                    <SelectTrigger id="tipo-clase-sabado"><SelectValue placeholder="Selecciona un tipo..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Clase Normal">Clase Normal</SelectItem>
                                        <SelectItem value="Clase Personalizada">Clase Personalizada</SelectItem>
                                        <SelectItem value="Clase Acelerada">Clase Acelerada</SelectItem>
                                        <SelectItem value="Clase Virtual">Clase Virtual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cantidad-clases-sabado">Cantidad a añadir</Label>
                                <Input 
                                    id="cantidad-clases-sabado" 
                                    type="number"
                                    min="1"
                                    value={registroClase.cantidad} 
                                    onChange={(e) => setRegistroClase(p => ({ ...p, cantidad: parseInt(e.target.value) || 1 }))}
                                />
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
            Recuerda enviar tu informe de actividades el mismo sábado después de tu jornada laboral para su correcta aprobación.
        </p>
      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Registro de Horas (Sábados).
        </div>
      </footer>
    </div>
  );
}
