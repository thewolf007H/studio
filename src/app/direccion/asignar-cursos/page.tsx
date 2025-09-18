
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ChevronLeft, BookUser, Search, User, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const studentPlaceholder = {
    id: "a1",
    nombre: "Javier Sánchez Gómez",
    ci: "9876543 LP",
    status: "Activo",
    cursoActual: "Inglés Intermedio B1"
};

const coursesPlaceholder = [
    { id: "c1", nombre: "Inglés Intermedio B2 - Tarde" },
    { id: "c2", nombre: "Preparación TOEFL - Noche" },
    { id: "c3", nombre: "Inglés Avanzado C1 - Mañana" },
    { id: "c4", nombre: "Taller de Conversación Avanzada - Sábados" },
];

export default function AsignarCursosPage() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [foundStudent, setFoundStudent] = useState<typeof studentPlaceholder | null>(null);
    const [selectedCourse, setSelectedCourse] = useState('');

    const handleSearch = () => {
        // Simulating finding a student
        if(searchTerm) {
            setFoundStudent(studentPlaceholder);
        } else {
            setFoundStudent(null);
        }
    };

    const handleAssignCourse = () => {
        if(!foundStudent || !selectedCourse) {
            toast({
                title: "Error",
                description: "Debes buscar un alumno y seleccionar un curso.",
                variant: "destructive"
            });
            return;
        }

        const courseName = coursesPlaceholder.find(c => c.id === selectedCourse)?.nombre;

        console.log(`Asignando curso ${courseName} a ${foundStudent.nombre}`);
        toast({
            title: "Curso Asignado Exitosamente",
            description: `${foundStudent.nombre} ha sido inscrito en ${courseName}.`
        });

        // Reset state
        setFoundStudent(null);
        setSearchTerm('');
        setSelectedCourse('');
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
                    <BookUser className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
                        Asignar Cursos a Alumnos
                    </h1>
                    <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
                        Busca un estudiante y matricúlalo en un nuevo curso para el ciclo académico actual.
                    </p>
                </div>
                
                <div className="max-w-2xl mx-auto space-y-8">
                    <Card className="shadow-lg bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center"><Search className="mr-2 h-5 w-5"/>Paso 1: Buscar Estudiante</CardTitle>
                            <CardDescription>Busca al estudiante por nombre o CI para cargar su información.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex gap-2">
                            <Input 
                                placeholder="Buscar por nombre o CI..." 
                                className="bg-background"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button onClick={handleSearch}>Buscar</Button>
                        </CardContent>
                    </Card>

                    {foundStudent && (
                        <Card className="shadow-lg bg-card animate-in fade-in-50">
                            <CardHeader>
                                <CardTitle className="flex items-center"><User className="mr-2 h-5 w-5"/>Información del Estudiante</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="p-4 border rounded-lg bg-secondary/30">
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-semibold">{foundStudent.nombre}</p>
                                        <Badge variant={foundStudent.status === 'Activo' ? 'default' : 'secondary'} className={foundStudent.status === 'Activo' ? 'bg-green-500/80' : ''}>{foundStudent.status}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">CI: {foundStudent.ci}</p>
                                    <p className="text-sm text-muted-foreground">Curso Actual: {foundStudent.cursoActual}</p>
                                </div>

                                <div className="space-y-2 pt-4 border-t">
                                    <label htmlFor="course-select" className="font-medium text-lg">Paso 2: Seleccionar Nuevo Curso</label>
                                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                                        <SelectTrigger id="course-select">
                                            <SelectValue placeholder="Elige un curso para asignar..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {coursesPlaceholder.map(course => (
                                                <SelectItem key={course.id} value={course.id}>{course.nombre}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                            <CardContent>
                                <Button className="w-full font-semibold" onClick={handleAssignCourse}>
                                    <CheckCircle className="mr-2 h-5 w-5"/>
                                    Confirmar Asignación de Curso
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    <p className="text-xs text-muted-foreground text-center pt-4">
                        (La búsqueda y asignación son funcionalidades simuladas con datos de ejemplo.)
                    </p>
                </div>

            </main>
            <footer className="py-8 border-t mt-16 bg-card">
                <div className="container text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} First Class Institute. Asignación de Cursos.
                </div>
            </footer>
        </div>
    );
}
