
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { ChevronLeft, Clock, Search, Edit, User, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AlumnoHorario {
    id: string;
    nombre: string;
    curso: string;
    profesor: string;
    horarioActual: string;
}

const alumnosPlaceholder: AlumnoHorario[] = [
    { id: "a1", nombre: "Javier Sánchez Gómez", curso: "Inglés Intermedio B1", profesor: "Laura Martínez", horarioActual: "Tarde (16:15 - 17:30)" },
    { id: "a2", nombre: "Sofía Moreno Jiménez", curso: "Inglés Básico A1", profesor: "David Lee", horarioActual: "Mañana (08:00 - 09:15)" },
    { id: "a3", nombre: "Miguel Ángel Díaz", curso: "Preparación TOEFL", profesor: "Carlos Gómez", horarioActual: "Noche (19:00 - 20:30)" },
];

const horariosDisponibles = [
    { id: "h1", nombre: "Mañana (08:00 - 09:15)" },
    { id: "h2", nombre: "Mañana (09:30 - 10:45)" },
    { id: "h3", nombre: "Tarde (14:00 - 15:15)" },
    { id: "h4", nombre: "Tarde (16:15 - 17:30)" },
    { id: "h5", nombre: "Noche (19:00 - 20:30)" },
];

export default function CambioHorarioPage() {
    const { toast } = useToast();
    const [selectedStudent, setSelectedStudent] = useState<AlumnoHorario | null>(null);
    const [nuevoHorario, setNuevoHorario] = useState<string>('');

    const handleOpenDialog = (student: AlumnoHorario) => {
        setSelectedStudent(student);
        setNuevoHorario('');
    };
    
    const handleSaveChanges = () => {
        if (!selectedStudent || !nuevoHorario) {
            toast({
                title: "Error",
                description: "Debes seleccionar un nuevo horario.",
                variant: "destructive"
            });
            return;
        }

        console.log("Guardando cambio de horario para:", selectedStudent.nombre);
        console.log("Nuevo Horario ID:", nuevoHorario);

        const horarioSeleccionado = horariosDisponibles.find(h => h.id === nuevoHorario);

        toast({
            title: "Horario Actualizado (Simulación)",
            description: `El horario de ${selectedStudent.nombre} ha sido cambiado a ${horarioSeleccionado?.nombre}.`,
        });
        
        // Aquí se cerraría el diálogo en una implementación real
        document.querySelector('[aria-label="Close"]')?.click()
    };

    return (
        <div className="flex flex-col min-h-screen bg-secondary/20">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Button asChild variant="outline" size="sm" className="hover:bg-primary/10 transition-colors">
                        <Link href="/direccion">
                            <ChevronLeft className="mr-2 h-4 w-4"/>
                            Volver al Portal de Dirección
                        </Link>
                    </Button>
                </div>

                <div className="relative text-center mb-12 p-6 md:p-8 bg-card rounded-xl shadow-xl overflow-hidden border border-border">
                    <div className="absolute inset-0 opacity-[0.03] pattern-[0.8rem_0.8rem_#000000_radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:opacity-[0.05] dark:pattern-[0.8rem_0.8rem_#ffffff_radial-gradient(circle_at_center,_var(--tw-gradient-stops))]"></div>
                    <Clock className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
                        Cambio de Horario
                    </h1>
                    <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
                        Busca un estudiante y asigna un nuevo horario para su curso actual.
                    </p>
                </div>

                <Card className="shadow-lg bg-card">
                    <CardHeader>
                        <CardTitle>Lista de Estudiantes y Horarios</CardTitle>
                        <CardDescription>Busca un estudiante y gestiona su horario.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2 mb-6">
                            <Input placeholder="Buscar por nombre o CI del estudiante..." className="max-w-sm bg-background" />
                            <Button><Search className="mr-2 h-4 w-4"/>Buscar</Button>
                        </div>
                        
                        <div className="overflow-x-auto border rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nombre del Alumno</TableHead>
                                        <TableHead>Curso</TableHead>
                                        <TableHead>Profesor</TableHead>
                                        <TableHead>Horario Actual</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {alumnosPlaceholder.map(student => (
                                        <TableRow key={student.id} className="hover:bg-secondary/50">
                                            <TableCell className="font-medium">{student.nombre}</TableCell>
                                            <TableCell className="text-muted-foreground">{student.curso}</TableCell>
                                            <TableCell className="text-muted-foreground">{student.profesor}</TableCell>
                                            <TableCell className="text-primary font-semibold">{student.horarioActual}</TableCell>
                                            <TableCell className="text-right">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" onClick={() => handleOpenDialog(student)}>
                                                            <Edit className="mr-2 h-4 w-4"/>
                                                            Cambiar Horario
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-lg bg-card">
                                                        <DialogHeader>
                                                            <DialogTitle>Cambiar Horario para {selectedStudent?.nombre}</DialogTitle>
                                                            <DialogDescription>
                                                                Selecciona el nuevo horario para el curso actual del estudiante.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="py-4 space-y-4">
                                                            <div className="p-4 border rounded-lg bg-secondary/30 space-y-2">
                                                                <div className='flex items-center text-sm'>
                                                                    <User className="mr-2 h-4 w-4 text-muted-foreground"/>
                                                                    <span className='font-semibold'>{selectedStudent?.nombre}</span>
                                                                </div>
                                                                 <div className='flex items-center text-sm'>
                                                                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground"/>
                                                                    <span className='text-muted-foreground'>{selectedStudent?.curso}</span>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="horario-select">Seleccionar Nuevo Horario</Label>
                                                                <Select value={nuevoHorario} onValueChange={setNuevoHorario}>
                                                                    <SelectTrigger id="horario-select">
                                                                        <SelectValue placeholder="Elige un nuevo horario..." />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {horariosDisponibles.map(horario => (
                                                                            <SelectItem key={horario.id} value={horario.id} disabled={horario.nombre === selectedStudent?.horarioActual}>
                                                                                {horario.nombre} {horario.nombre === selectedStudent?.horarioActual && "(Actual)"}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button type="button" variant="outline" onClick={() => document.querySelector('[aria-label="Close"]')?.click()}>Cancelar</Button>
                                                            <Button type="submit" onClick={handleSaveChanges}>Guardar Cambio</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                         <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-dashed">
                          (La búsqueda y guardado de horarios son funcionalidades en desarrollo. Los datos son de ejemplo.)
                        </p>
                    </CardContent>
                </Card>

            </main>
            <footer className="py-8 border-t mt-16 bg-card">
                <div className="container text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} First Class Institute. Gestión de Horarios.
                </div>
            </footer>
        </div>
    );
}
