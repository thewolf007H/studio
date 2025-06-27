'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, CalendarCheck, Check, Edit2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const courseInfo = {
  facilitador: "Ariel Berrios",
  horario: "07:00 - 08:15",
  modalidad: "VIRTUAL",
  nivel: "EF 4.4",
  mes: "Junio",
  inicio: "19 de mayo de 2025",
  examenFinal: "11 de julio de 2025",
  entregaKardex: "14 de julio de 2025",
  claseId: "13370777",
};

const initialStudents = [
  { id: 1, nombre: "ARRIGA FLORES EVELIN", codigo: "9285", genero: "Z" },
  { id: 2, nombre: "QUISPE LICONA ROSA", codigo: "9282", genero: "Z" },
  { id: 3, nombre: "CONDORI MAMANI TATIANA", codigo: "9991", genero: "Z" },
  { id: 4, nombre: "ARAGONDOÑA ZULEMA", codigo: "9984", genero: "Z" },
  { id: 5, nombre: "ZEGARRA CAERO DANTZA", codigo: "10416", genero: "Z" },
  { id: 6, nombre: "SALAZAR PARDO JUAN VICTOR", codigo: "8887", genero: "V" },
  { id: 7, nombre: "TUCO DANA LAURA", codigo: "10308", genero: "Z" },
];

const attendanceDates = Array.from({ length: 27 - 11 + 1 }, (_, i) => 11 + i);
const attendanceOptions = ['✓', 'A', 'P', 'L', 'D', 'C', 'H', 'X'];

type AttendanceStatus = '✓' | 'A' | 'P' | 'L' | 'D' | 'C' | 'H' | 'X' | '';

interface Student {
  id: number;
  nombre: string;
  codigo: string;
  genero: 'Z' | 'V';
  asistencia: Record<number, AttendanceStatus>;
  evaluacionEscrita: string;
  evaluacionOral: string;
  observaciones: string;
}

const initializeStudentData = (students: typeof initialStudents): Student[] => {
  return students.map(s => ({
    ...s,
    asistencia: attendanceDates.reduce((acc, date) => {
      acc[date] = '';
      return acc;
    }, {} as Record<number, AttendanceStatus>),
    evaluacionEscrita: '',
    evaluacionOral: '',
    observaciones: '',
  }));
};

export default function ProfesorAsistenciaPage() {
  const [students, setStudents] = useState<Student[]>(() => initializeStudentData(initialStudents));

  const handleAttendanceChange = (studentId: number, date: number, value: AttendanceStatus) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? { ...student, asistencia: { ...student.asistencia, [date]: value } }
          : student
      )
    );
  };
  
  const handleInputChange = (studentId: number, field: 'evaluacionEscrita' | 'evaluacionOral' | 'observaciones', value: string) => {
     setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId ? { ...student, [field]: value } : student
      )
    );
  }

  const calculateTotalAttendance = (asistencia: Record<number, AttendanceStatus>) => {
    return Object.values(asistencia).filter(status => status === '✓').length;
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
            Registro de Asistencia Mensual
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Selecciona el estado de cada estudiante para registrar la asistencia diaria. Los totales se calculan automáticamente.
          </p>
        </div>

        <Card className="shadow-lg bg-card mb-8">
          <CardHeader>
            <CardTitle>Información del Curso</CardTitle>
            <CardDescription>Detalles generales del curso actual.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-secondary/30 rounded-md"><span className="font-semibold text-muted-foreground">Facilitador:</span> {courseInfo.facilitador}</div>
            <div className="p-3 bg-secondary/30 rounded-md"><span className="font-semibold text-muted-foreground">Horario:</span> {courseInfo.horario}</div>
            <div className="p-3 bg-secondary/30 rounded-md"><span className="font-semibold text-muted-foreground">Modalidad:</span> {courseInfo.modalidad}</div>
            <div className="p-3 bg-secondary/30 rounded-md"><span className="font-semibold text-muted-foreground">Nivel:</span> {courseInfo.nivel}</div>
            <div className="p-3 bg-secondary/30 rounded-md"><span className="font-semibold text-muted-foreground">Mes:</span> {courseInfo.mes}</div>
            <div className="p-3 bg-secondary/30 rounded-md"><span className="font-semibold text-muted-foreground">Examen Final:</span> {courseInfo.examenFinal}</div>
            <div className="p-3 bg-secondary/30 rounded-md"><span className="font-semibold text-muted-foreground">ID Clase:</span> {courseInfo.claseId}</div>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-card">
          <CardHeader>
            <CardTitle>Lista de Estudiantes - {courseInfo.mes}</CardTitle>
            <CardDescription>Haz clic en cada celda para registrar la asistencia.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table className="min-w-max">
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky left-0 bg-card z-10 w-12">Nº</TableHead>
                  <TableHead className="sticky left-12 bg-card z-10 min-w-[250px]">Nombre Completo</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Género</TableHead>
                  {attendanceDates.map(date => (
                    <TableHead key={date} className="text-center">{date}</TableHead>
                  ))}
                  <TableHead className="text-center font-bold text-primary">Total</TableHead>
                  <TableHead>Eval. Escrita</TableHead>
                  <TableHead>Eval. Oral</TableHead>
                  <TableHead>Observaciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={student.id} className="hover:bg-secondary/50">
                    <TableCell className="sticky left-0 bg-card z-10">{index + 1}</TableCell>
                    <TableCell className="sticky left-12 bg-card z-10 font-medium">{student.nombre}</TableCell>
                    <TableCell>{student.codigo}</TableCell>
                    <TableCell>{student.genero}</TableCell>
                    {attendanceDates.map(date => (
                      <TableCell key={date} className="p-1">
                        <Select
                          value={student.asistencia[date]}
                          onValueChange={(value) => handleAttendanceChange(student.id, date, value as AttendanceStatus)}
                        >
                          <SelectTrigger className="w-16 h-8 text-xs focus:ring-primary/50">
                            <SelectValue placeholder="-" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">-</SelectItem>
                            {attendanceOptions.map(opt => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-bold text-lg text-primary">{calculateTotalAttendance(student.asistencia)}</TableCell>
                    <TableCell className="p-1">
                      <Input 
                        className="w-24 h-8"
                        value={student.evaluacionEscrita}
                        onChange={(e) => handleInputChange(student.id, 'evaluacionEscrita', e.target.value)}
                      />
                    </TableCell>
                    <TableCell className="p-1">
                      <Input 
                         className="w-24 h-8"
                         value={student.evaluacionOral}
                         onChange={(e) => handleInputChange(student.id, 'evaluacionOral', e.target.value)}
                      />
                    </TableCell>
                     <TableCell className="p-1">
                      <Input
                        className="w-48 h-8"
                        placeholder="Anotaciones..."
                        value={student.observaciones}
                        onChange={(e) => handleInputChange(student.id, 'observaciones', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-dashed">
                Leyenda: ✓ (presente), A (ausente), P (permiso), L (tarde), D (retirado), C (cambio), H (feriado), X (bloqueado).
              </p>
          </CardContent>
        </Card>
      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Sistema de Asistencia.
        </div>
      </footer>
    </div>
  );
}
