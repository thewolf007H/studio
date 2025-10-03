
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, CalendarCheck, Check, Send, Calendar as CalendarIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const coursesData = [
  {
    id: "c1",
    info: {
      facilitador: "Ariel Berrios",
      horario: "07:00 - 08:15",
      modalidad: "VIRTUAL",
      nivel: "EF 4.4",
      mes: "Junio",
    },
    students: [
      { id: 1, nombre: "ARRIGA FLORES EVELIN", codigo: "9285" },
      { id: 2, nombre: "QUISPE LICONA ROSA", codigo: "9282" },
      { id: 3, nombre: "CONDORI MAMANI TATIANA", codigo: "9991" },
      { id: 4, nombre: "ARAGONDOÑA ZULEMA", codigo: "9984" },
    ]
  },
  {
    id: "c2",
    info: {
      facilitador: "Ariel Berrios",
      horario: "08:30 - 09:45",
      modalidad: "PRESENCIAL",
      nivel: "EF 2.1",
      mes: "Junio",
    },
    students: [
      { id: 5, nombre: "ZEGARRA CAERO DANTZA", codigo: "10416" },
      { id: 6, nombre: "SALAZAR PARDO JUAN VICTOR", codigo: "8887" },
      { id: 7, nombre: "TUCO DANA LAURA", codigo: "10308" },
    ]
  }
];

const attendanceOptions = ['✓', 'A', 'P', 'L', 'D', 'C', 'H', 'X'];
type AttendanceStatus = '✓' | 'A' | 'P' | 'L' | 'D' | 'C' | 'H' | 'X' | '';

interface StudentAttendance {
  id: number;
  nombre: string;
  codigo: string;
  asistencia: AttendanceStatus;
  observaciones: string;
}

const initializeStudentData = (studentsList: { id: number; nombre: string; codigo: string; }[]): StudentAttendance[] => {
  return studentsList.map(s => ({
    ...s,
    asistencia: '',
    observaciones: '',
  }));
};

export default function ProfesorAsistenciaPage() {
  const { toast } = useToast();
  const [selectedCourseId, setSelectedCourseId] = useState(coursesData[0].id);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const selectedCourse = coursesData.find(c => c.id === selectedCourseId) || coursesData[0];
  
  // En una app real, la asistencia se cargaría para la fecha seleccionada.
  // Aquí, reseteamos el estado del estudiante al cambiar de curso.
  const [students, setStudents] = useState<StudentAttendance[]>(() => initializeStudentData(selectedCourse.students));

  const handleCourseChange = (courseId: string) => {
    const newCourse = coursesData.find(c => c.id === courseId)!;
    setSelectedCourseId(courseId);
    setStudents(initializeStudentData(newCourse.students));
  };
  
  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    // En una implementación real, aquí se haría fetch de la asistencia para la nueva fecha.
    // Por ahora, podemos resetear o mantener la data actual como simulación.
    toast({
        title: "Fecha Seleccionada",
        description: `Mostrando asistencia para el ${date ? format(date, 'PPP', { locale: es }) : ''}.`,
    });
  }

  const handleAttendanceChange = (studentId: number, value: string) => {
    const finalValue = value === 'unselected' ? '' : (value as AttendanceStatus);
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? { ...student, asistencia: finalValue }
          : student
      )
    );
  };
  
  const handleInputChange = (studentId: number, field: 'observaciones', value: string) => {
     setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId ? { ...student, [field]: value } : student
      )
    );
  }
  
  const handleSendReport = () => {
    if (!selectedDate) {
        toast({ title: "Error", description: "Por favor, selecciona una fecha.", variant: "destructive" });
        return;
    }
    console.log(`Enviando reporte para el curso ${selectedCourse.info.nivel} en la fecha ${format(selectedDate, 'yyyy-MM-dd')}`);
    console.log("Datos de asistencia:", students);
    toast({
        title: "Asistencia Guardada (Simulación)",
        description: `La asistencia del ${format(selectedDate, 'PPP', { locale: es })} ha sido guardada.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button asChild variant="outline" size="sm" className="hover:bg-primary/10 transition-colors">
            <Link href="/profesores">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Volver al Portal de Profesor
            </Link>
          </Button>
        </div>

        <div className="relative text-center mb-12 p-6 md:p-8 bg-card rounded-xl shadow-xl overflow-hidden border border-border">
          <div className="absolute inset-0 opacity-[0.03] pattern-[0.8rem_0.8rem_#000000_radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:opacity-[0.05] dark:pattern-[0.8rem_0.8rem_#ffffff_radial-gradient(circle_at_center,_var(--tw-gradient-stops))]"></div>
          <CalendarCheck className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
            Registro de Asistencia Diario
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Selecciona una fecha y un curso para registrar la asistencia diaria de tus estudiantes.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-start">
            <Card className="shadow-lg bg-card">
                <CardHeader>
                    <CardTitle>Seleccionar Fecha y Curso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium mb-2">Fecha</h3>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateChange}
                            className="rounded-md border"
                            locale={es}
                        />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium mb-2">Curso</h3>
                         <Select value={selectedCourseId} onValueChange={handleCourseChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un curso..." />
                            </SelectTrigger>
                            <SelectContent>
                                {coursesData.map(course => (
                                    <SelectItem key={course.id} value={course.id}>{course.info.nivel} ({course.info.horario})</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

             <div className="space-y-4">
                <Card className="shadow-lg bg-card">
                  <CardHeader>
                    <CardTitle>
                        Lista de Estudiantes - <span className="text-primary">{selectedDate ? format(selectedDate, 'eeee, d \'de\' MMMM', {locale: es}) : 'Selecciona una fecha'}</span>
                    </CardTitle>
                    <CardDescription>
                        Curso: {selectedCourse.info.nivel} ({selectedCourse.info.horario})
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="overflow-x-auto">
                    {selectedDate ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px]">Nº</TableHead>
                              <TableHead className="min-w-[250px]">Nombre Completo</TableHead>
                              <TableHead>Código</TableHead>
                              <TableHead className="w-[150px]">Asistencia</TableHead>
                              <TableHead>Observaciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {students.map((student, index) => (
                              <TableRow key={student.id} className="hover:bg-secondary/50">
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">{student.nombre}</TableCell>
                                <TableCell>{student.codigo}</TableCell>
                                <TableCell className="p-1">
                                  <Select
                                    value={student.asistencia}
                                    onValueChange={(value) => handleAttendanceChange(student.id, value)}
                                  >
                                    <SelectTrigger className="focus:ring-primary/50">
                                      <SelectValue placeholder="Marcar..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="unselected">Sin Marcar</SelectItem>
                                      {attendanceOptions.map(opt => (
                                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                 <TableCell className="p-1">
                                  <Input
                                    className="h-9"
                                    placeholder="Anotaciones del día..."
                                    value={student.observaciones}
                                    onChange={(e) => handleInputChange(student.id, 'observaciones', e.target.value)}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                    ) : (
                        <p className="text-muted-foreground text-center py-8">Por favor, selecciona una fecha para ver la lista de asistencia.</p>
                    )}
                  </CardContent>
                </Card>
                 <div className="flex justify-end">
                    <Button size="lg" onClick={handleSendReport} disabled={!selectedDate}>
                        <Send className="mr-2 h-5 w-5"/>
                        Guardar Asistencia del Día
                    </Button>
                </div>
                 <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-dashed">
                    Leyenda: ✓ (presente), A (ausente), P (permiso), L (tarde), D (retirado), C (cambio), H (feriado), X (bloqueado).
                </p>
             </div>
        </div>
        
      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Sistema de Asistencia.
        </div>
      </footer>
    </div>
  );
}
