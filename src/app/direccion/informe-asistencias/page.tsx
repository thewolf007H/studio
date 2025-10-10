
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { ChevronLeft, CheckSquare, BarChart2, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface AsistenciaDetallada {
    presente: number;
    ausente: number;
    permiso: number;
    tarde: number;
}

interface ReporteAlumno {
    id: string;
    nombre: string;
    asistencia: AsistenciaDetallada;
    totalClases: number;
}

const reportPlaceholder: ReporteAlumno[] = [
    { id: 'a1', nombre: 'Javier Sánchez Gómez', asistencia: { presente: 18, ausente: 1, permiso: 1, tarde: 2 }, totalClases: 22 },
    { id: 'a2', nombre: 'Sofía Moreno Jiménez', asistencia: { presente: 21, ausente: 0, permiso: 0, tarde: 1 }, totalClases: 22 },
    { id: 'a3', nombre: 'Miguel Ángel Díaz', asistencia: { presente: 15, ausente: 5, permiso: 0, tarde: 2 }, totalClases: 22 },
];

const cursosPlaceholder = [
  { id: "c1", nombre: "Inglés Básico A1 - Mañana" },
  { id: "c2", nombre: "Inglés Intermedio B1 - Tarde" },
  { id: "c3", nombre: "Taller de Conversación - Sábados" },
];

export default function InformeAsistenciasPage() {
    const [selectedCourse, setSelectedCourse] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [reportData, setReportData] = useState<ReporteAlumno[] | null>(null);

    const handleGenerateReport = () => {
        if(selectedCourse && selectedMonth) {
            // Simulating fetching data and generating a report
            setReportData(reportPlaceholder);
        } else {
            // In a real app, you'd show a toast or message
            alert("Por favor, selecciona un curso y un mes.");
        }
    };

    const getAttendancePercentage = (asistencia: AsistenciaDetallada, totalClases: number): number => {
        if (totalClases === 0) return 0;
        return (asistencia.presente / totalClases) * 100;
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
                    <CheckSquare className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
                        Informe Detallado de Asistencias
                    </h1>
                    <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
                        Filtra y visualiza los registros de asistencia de los estudiantes por curso y período.
                    </p>
                </div>

                <Card className="shadow-lg bg-card">
                    <CardHeader>
                        <CardTitle>Filtros del Reporte</CardTitle>
                        <CardDescription>Selecciona un curso y un mes para generar el informe de asistencia.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                        <Select onValueChange={setSelectedCourse}>
                            <SelectTrigger className="w-full sm:w-[250px]">
                                <SelectValue placeholder="Seleccionar Curso..." />
                            </SelectTrigger>
                            <SelectContent>
                                {cursosPlaceholder.map(curso => (
                                    <SelectItem key={curso.id} value={curso.id}>{curso.nombre}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select onValueChange={setSelectedMonth}>
                            <SelectTrigger className="w-full sm:w-[200px]">
                                <SelectValue placeholder="Seleccionar Mes..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="septiembre">Septiembre</SelectItem>
                                <SelectItem value="octubre">Octubre</SelectItem>
                                <SelectItem value="noviembre">Noviembre</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={handleGenerateReport}>
                            <BarChart2 className="mr-2 h-4 w-4"/>
                            Generar Reporte
                        </Button>
                    </CardContent>
                </Card>

                {reportData && (
                    <Card className="shadow-lg bg-card mt-8 animate-in fade-in-50">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div>
                                <CardTitle>Resultados del Reporte</CardTitle>
                                <CardDescription>Informe de asistencia para el curso y mes seleccionados.</CardDescription>
                            </div>
                            <Button variant="outline" disabled>
                                <Download className="mr-2 h-4 w-4"/>
                                Descargar PDF
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="min-w-[200px]">Nombre del Alumno</TableHead>
                                            <TableHead className="text-center">Presente</TableHead>
                                            <TableHead className="text-center">Ausente</TableHead>
                                            <TableHead className="text-center">Permiso</TableHead>
                                            <TableHead className="text-center">Tarde</TableHead>
                                            <TableHead className="text-center min-w-[150px]">% Asistencia</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {reportData.map(alumno => {
                                            const percentage = getAttendancePercentage(alumno.asistencia, alumno.totalClases);
                                            return (
                                                <TableRow key={alumno.id} className="hover:bg-secondary/50">
                                                    <TableCell className="font-medium">{alumno.nombre}</TableCell>
                                                    <TableCell className="text-center text-green-600 font-semibold">{alumno.asistencia.presente}</TableCell>
                                                    <TableCell className="text-center text-destructive font-semibold">{alumno.asistencia.ausente}</TableCell>
                                                    <TableCell className="text-center text-blue-600 font-semibold">{alumno.asistencia.permiso}</TableCell>
                                                    <TableCell className="text-center text-yellow-600 font-semibold">{alumno.asistencia.tarde}</TableCell>
                                                    <TableCell className="text-center">
                                                        <div className="flex items-center gap-2 justify-center">
                                                            <Progress value={percentage} className="w-20" />
                                                            <span className="text-xs font-semibold">{percentage.toFixed(1)}%</span>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                            <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-dashed">
                                (La generación del reporte es una simulación con datos de ejemplo.)
                            </p>
                        </CardContent>
                    </Card>
                )}

            </main>
            <footer className="py-8 border-t mt-16 bg-card">
                <div className="container text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} First Class Institute. Informes de Asistencia.
                </div>
            </footer>
        </div>
    );
}
