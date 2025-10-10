
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, Save, Edit, PlusCircle, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PersonalizedClassReportCard, type PersonalizedClassReportData, type SesionPersonalizada } from '@/components/reports/PersonalizedClassReportCard';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const reportDataPersonalized: PersonalizedClassReportData = {
  tipo_documento: "Personalized Class Report",
  facilitador: "Carlos Gómez",
  mes: "Septiembre",
  gestion: "2024",
  sesiones: [
    { id: 1, estudiante: "Ana García", fecha: "2024-09-02", dia: "Lunes", horas: 2, informe_avance: "Repaso de verbos irregulares y práctica de conversación." },
    { id: 2, estudiante: "Ana García", fecha: "2024-09-04", dia: "Miércoles", horas: 1, informe_avance: "Corrección de ensayo y ejercicios de gramática." },
    { id: 3, estudiante: "Luis Fernandez", fecha: "2024-09-05", dia: "Jueves", horas: 2.5, informe_avance: "Preparación intensiva para entrevista de trabajo." },
  ],
  observaciones_generales: "Ambos estudiantes muestran un progreso notable. Ana necesita enfocarse más en la fluidez.",
};

const alumnosPersonalizados = [
    { id: "s1", nombre: "Ana García" },
    { id: "s2", nombre: "Luis Fernandez" },
    { id: "s3", nombre: "Sofía Moreno" },
]

export default function ProfesorRegistroHorasPersonalizadasPage() {
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [reportData, setReportData] = useState(reportDataPersonalized);
    const [registroSesion, setRegistroSesion] = useState({
        estudiante: '',
        dia: '',
        fecha: new Date().toISOString().split('T')[0],
        horas: 1,
        informe: ''
    });

    const handleSave = () => {
        console.log("Enviando informe de horas personalizadas con:", reportData);
        toast({
            title: "Informe de Clases Personalizadas Enviado",
            description: "Tu informe ha sido enviado a revisión. Gracias.",
        });
        setIsEditing(false);
    };

    const handleRegistrarSesion = () => {
        const { estudiante, dia, horas, informe, fecha } = registroSesion;
        if (!estudiante || !dia || horas <= 0 || !fecha) {
            toast({
                title: "Error de Validación",
                description: "Debes seleccionar estudiante, día, fecha y una cantidad de horas válida.",
                variant: "destructive",
            });
            return;
        }

        const wordCount = informe.trim().split(/\s+/).length;
        if (wordCount < 8 || wordCount > 20) {
             toast({
                title: "Error en el Informe",
                description: "El informe de avance debe contener entre 8 y 20 palabras.",
                variant: "destructive",
            });
            return;
        }
        
        const newSession: SesionPersonalizada = {
            id: reportData.sesiones.length + 1,
            estudiante: estudiante,
            fecha: fecha,
            dia: dia,
            horas: horas,
            informe_avance: informe
        }

        setReportData(prevData => ({
            ...prevData,
            sesiones: [...prevData.sesiones, newSession]
        }));

        toast({
            title: "Sesión Registrada (Simulación)",
            description: `Se registraron ${horas} horas para ${estudiante} el día ${dia}.`,
        });

        document.querySelector('[data-radix-dialog-content] [aria-label="Close"]')?.click();
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
          <UserCheck className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
            Class Reports (Personalizadas)
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Registra cada sesión de clase personalizada impartida durante el mes.
          </p>
        </div>

        <Card className="shadow-lg bg-card max-w-5xl mx-auto">
            <CardHeader className="flex-row justify-between items-center">
                 <div>
                    <CardTitle>Informe de Clases Personalizadas</CardTitle>
                    <CardDescription>Revisa el informe, añade sesiones y observaciones generales antes de enviar.</CardDescription>
                </div>
                 <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="mr-2 h-4 w-4"/>
                    {isEditing ? "Cancelar Edición" : "Editar Observaciones"}
                </Button>
            </CardHeader>
            <CardContent>
                <PersonalizedClassReportCard data={reportData} />
                 <div className="mt-6">
                    <label htmlFor="observaciones" className="block text-sm font-medium text-muted-foreground mb-1">Observaciones Generales del Mes</label>
                    <Textarea
                        id="observaciones"
                        placeholder="Añade aquí cualquier comentario general sobre las clases personalizadas del mes..."
                        value={reportData.observaciones_generales}
                        onChange={(e) => setReportData({...reportData, observaciones_generales: e.target.value})}
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
                            Registrar Nueva Sesión
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-card">
                        <DialogHeader>
                            <DialogTitle>Registro de Sesión Personalizada</DialogTitle>
                            <DialogDescription>
                                Completa los detalles de la sesión impartida.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="estudiante-personalizado">Estudiante</Label>
                                <Select onValueChange={(value) => setRegistroSesion(p => ({ ...p, estudiante: value }))}>
                                    <SelectTrigger id="estudiante-personalizado"><SelectValue placeholder="Selecciona un estudiante..." /></SelectTrigger>
                                    <SelectContent>
                                        {alumnosPersonalizados.map(s => <SelectItem key={s.id} value={s.nombre}>{s.nombre}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fecha-sesion">Fecha de la Sesión</Label>
                                <Input 
                                    id="fecha-sesion" 
                                    type="date"
                                    value={registroSesion.fecha}
                                    onChange={(e) => setRegistroSesion(p => ({ ...p, fecha: e.target.value }))}
                                />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="dia-sesion">Día de la Semana</Label>
                                <Select onValueChange={(value) => setRegistroSesion(p => ({ ...p, dia: value }))}>
                                    <SelectTrigger id="dia-sesion"><SelectValue placeholder="Selecciona un día..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Lunes">Lunes</SelectItem>
                                        <SelectItem value="Martes">Martes</SelectItem>
                                        <SelectItem value="Miércoles">Miércoles</SelectItem>
                                        <SelectItem value="Jueves">Jueves</SelectItem>
                                        <SelectItem value="Viernes">Viernes</SelectItem>
                                        <SelectItem value="Sábado">Sábado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="horas-sesion">Cantidad de Horas</Label>
                                <Input 
                                    id="horas-sesion" 
                                    type="number"
                                    step="0.5"
                                    min="0.5"
                                    value={registroSesion.horas} 
                                    onChange={(e) => setRegistroSesion(p => ({ ...p, horas: parseFloat(e.target.value) || 1 }))}
                                />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="informe-sesion">Informe de Avance</Label>
                                <Textarea
                                    id="informe-sesion"
                                    placeholder="¿Qué se avanzó en esta sesión?"
                                    value={registroSesion.informe}
                                    onChange={(e) => setRegistroSesion(p => ({ ...p, informe: e.target.value }))}
                                />
                                <p className="text-xs text-muted-foreground">Breve descripción (8-20 palabras).</p>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => document.querySelector('[data-radix-dialog-content] [aria-label="Close"]')?.click()}>Cancelar</Button>
                            <Button type="submit" onClick={handleRegistrarSesion}>Guardar Sesión</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                 <Button size="lg" onClick={handleSave}>
                    <Save className="mr-2 h-5 w-5" />
                    Enviar Informe Mensual
                </Button>
            </CardFooter>
        </Card>
        
        <p className="text-xs text-muted-foreground text-center mt-6 max-w-3xl mx-auto">
            Recuerda registrar cada clase personalizada y enviar el informe consolidado al final del mes para la gestión de pagos.
        </p>
      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Registro de Horas Personalizadas.
        </div>
      </footer>
    </div>
  );
}
