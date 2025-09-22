
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, Clock, Save, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ActividadDiaria {
    fecha: Date;
    actividad: string;
    horas: number;
}

export default function ProfesorRegistroHorasPage() {
    const { toast } = useToast();
    const [observaciones, setObservaciones] = useState('');
    
    // State for the new daily activity form
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [fechaActividad, setFechaActividad] = useState<Date | undefined>(new Date());
    const [descripcionActividad, setDescripcionActividad] = useState('');
    const [horasActividad, setHorasActividad] = useState<number | ''>('');
    const [actividadesRegistradas, setActividadesRegistradas] = useState<ActividadDiaria[]>([]);

    const handleSave = () => {
        if (actividadesRegistradas.length === 0) {
             toast({
                title: "No hay actividades para enviar",
                description: "Por favor, registra al menos una actividad antes de enviar el informe.",
                variant: "destructive",
            });
            return;
        }
        console.log("Enviando informe de horas con:", {actividades: actividadesRegistradas, observaciones});
        toast({
            title: "Informe de Horas Enviado",
            description: "Tu informe ha sido enviado a revisión. Gracias.",
        });
    };
    
    const handleSaveActividad = () => {
        if (!fechaActividad || !descripcionActividad || horasActividad === '' || horasActividad <= 0) {
            toast({
                title: "Error de Validación",
                description: "Por favor, completa todos los campos del formulario.",
                variant: "destructive",
            });
            return;
        }

        const nuevaActividad: ActividadDiaria = {
            fecha: fechaActividad,
            actividad: descripcionActividad,
            horas: horasActividad,
        };
        
        setActividadesRegistradas(prev => [...prev, nuevaActividad].sort((a,b) => b.fecha.getTime() - a.fecha.getTime()));
        
        toast({
            title: "Actividad Registrada",
            description: `Se guardó la actividad para el ${format(fechaActividad, "PPP", { locale: es })}.`
        });

        // Reset form and close dialog
        setFechaActividad(new Date());
        setDescripcionActividad('');
        setHorasActividad('');
        setIsDialogOpen(false);
    };

    const totalHoras = actividadesRegistradas.reduce((acc, act) => acc + act.horas, 0);

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
            Registra tus clases y otras actividades de Lunes a Viernes. El informe debe enviarse al final de la jornada.
          </p>
        </div>

        <Card className="shadow-lg bg-card max-w-4xl mx-auto mb-8">
            <CardHeader className="flex-row justify-between items-center">
                <div>
                    <CardTitle>Registro de Actividad Diaria</CardTitle>
                    <CardDescription>Añade un nuevo registro por cada día trabajado para llevar un conteo.</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><PlusCircle className="mr-2 h-5 w-5"/>Registrar Actividad</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-card">
                        <DialogHeader>
                            <DialogTitle>Registrar Nueva Actividad</DialogTitle>
                            <DialogDescription>
                                Selecciona la fecha, describe la clase o actividad y las horas dedicadas.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label>Fecha</Label>
                                <Calendar 
                                    mode="single"
                                    selected={fechaActividad}
                                    onSelect={setFechaActividad}
                                    className="rounded-md border bg-background"
                                    disabled={(date) => date > new Date()}
                                />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="actividad">Clase o Actividad Realizada</Label>
                                <Textarea 
                                    id="actividad"
                                    placeholder="Ej: Clase EF 1A (Units 1-2), Corrección de exámenes..."
                                    value={descripcionActividad}
                                    onChange={(e) => setDescripcionActividad(e.target.value)}
                                />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="horas">Horas Trabajadas</Label>
                                <Input 
                                    id="horas"
                                    type="number"
                                    placeholder="Ej: 1.25"
                                    value={horasActividad}
                                    onChange={(e) => setHorasActividad(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                            <Button type="submit" onClick={handleSaveActividad}>Guardar Actividad</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                {actividadesRegistradas.length > 0 ? (
                     <div className="overflow-x-auto border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Actividad / Clase</TableHead>
                                    <TableHead className="text-right">Horas</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {actividadesRegistradas.map((act, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{format(act.fecha, "PPP", { locale: es })}</TableCell>
                                        <TableCell className="text-muted-foreground">{act.actividad}</TableCell>
                                        <TableCell className="text-right font-bold text-primary">{act.horas.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-center py-6 border border-dashed rounded-md">
                        <p className="text-muted-foreground">Aún no has registrado actividades.</p>
                        <p className="text-sm text-muted-foreground">Usa el botón "Registrar Actividad" para empezar.</p>
                    </div>
                )}
                 <div className="mt-6">
                    <Label htmlFor="observaciones" className="font-semibold">Observaciones Generales del Informe</Label>
                    <Textarea 
                        id="observaciones"
                        placeholder="Añade aquí cualquier comentario relevante sobre el informe..."
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                        className="mt-2"
                        rows={3}
                    />
                </div>
            </CardContent>
             <CardFooter className="flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t">
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 text-center">
                    <p className="text-sm font-semibold text-primary">Total Horas Registradas</p>
                    <p className="text-2xl font-bold text-primary">{totalHoras.toFixed(2)}h</p>
                </div>
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
