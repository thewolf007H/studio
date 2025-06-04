
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, CalendarCheck, UserCheck, UserX, ListFilter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function ProfesorAsistenciaPage() {
  
  const placeholderAlumnos = [
    { id: "1", nombre: "Ana García Pérez", presente: true, fecha: "2024-07-23" },
    { id: "2", nombre: "Carlos López Martín", presente: true, fecha: "2024-07-23" },
    { id: "3", nombre: "Laura Fernández Ruiz", presente: false, fecha: "2024-07-23" },
    { id: "4", nombre: "Javier Sánchez Gómez", presente: true, fecha: "2024-07-23" },
    { id: "5", nombre: "Sofía Moreno Jiménez", presente: true, fecha: "2024-07-23", justificacion: "Cita médica" },
    { id: "6", nombre: "Pedro Martínez Torres", presente: false, fecha: "2024-07-21" },
  ];

  const cursosPlaceholder = [
    { id: "c1", nombre: "Inglés Básico A1 - Mañana" },
    { id: "c2", nombre: "Inglés Intermedio B1 - Tarde" },
  ];

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
          <CalendarCheck className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
            Seguimiento de Asistencia
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Registra la asistencia de tus alumnos a las clases, consulta el historial y gestiona justificaciones.
          </p>
        </div>
        
        <Card className="shadow-lg bg-card">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <CardTitle className="flex items-center text-xl font-headline">
                        <ListFilter className="mr-2 h-6 w-6 text-accent" />
                        Registro de Asistencia
                    </CardTitle>
                    <CardDescription>Filtra por curso y fecha para ver y gestionar la asistencia.</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <Select disabled>
                        <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Seleccionar Curso..." />
                        </SelectTrigger>
                        <SelectContent>
                        {cursosPlaceholder.map(curso => (
                            <SelectItem key={curso.id} value={curso.id}>{curso.nombre}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <Input type="date" className="w-full sm:w-auto bg-background" disabled defaultValue={new Date().toISOString().split('T')[0]}/>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            {placeholderAlumnos.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alumno</TableHead>
                      <TableHead className="text-center">Estado Asistencia</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Justificación</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {placeholderAlumnos.map(alumno => (
                      <TableRow key={alumno.id} className="hover:bg-secondary/50 transition-colors">
                        <TableCell className="font-medium">{alumno.nombre}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={alumno.presente ? "default" : "destructive"} className={`${alumno.presente ? 'bg-green-500/80' : 'bg-red-500/80'} text-white`}>
                            {alumno.presente ? <UserCheck className="mr-1 h-4 w-4" /> : <UserX className="mr-1 h-4 w-4" />}
                            {alumno.presente ? "Presente" : "Ausente"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{alumno.fecha}</TableCell>
                        <TableCell className="text-xs italic text-muted-foreground">{alumno.justificacion || "N/A"}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="hover:bg-primary/10" disabled>
                            {alumno.presente ? "Marcar Ausente" : "Marcar Presente"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">Selecciona un curso y fecha para ver el registro o no hay alumnos.</p>
            )}
            <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-dashed">
              (Funcionalidad de registro y gestión de asistencia en desarrollo. Los datos son ejemplos. Próximamente: toma de lista rápida, reportes de asistencia.)
            </p>
          </CardContent>
        </Card>

      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Seguimiento de Asistencia.
        </div>
      </footer>
    </div>
  );
}
