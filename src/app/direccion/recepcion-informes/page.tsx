
'use client';

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ChevronLeft, FileClock, Search, Eye, CheckCircle, Clock } from 'lucide-react';

const informesPlaceholder = [
  { id: 'inf1', profesor: 'Pamela Altamirano Pozo', curso: 'EF 1A', turno: 'Noche', fechaEnvio: '2024-10-01 09:15', estado: 'Recibido' },
  { id: 'inf2', profesor: 'Roger Urrutia', curso: 'EF 4B', turno: 'Tarde', fechaEnvio: '2024-10-01 08:30', estado: 'Recibido' },
  { id: 'inf3', profesor: 'Laura Martinez', curso: 'EF 2A', turno: 'Mañana', fechaEnvio: '2024-09-02 10:00', estado: 'Revisado' },
  { id: 'inf4', profesor: 'Dr. David Lee', curso: 'Inglés Avanzado C', turno: 'Tarde', fechaEnvio: '2024-09-01 18:00', estado: 'Revisado' },
];

export default function RecepcionInformesPage() {
  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'Recibido':
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-300">
            <Clock className="mr-1 h-3 w-3" />
            {estado}
          </Badge>
        );
      case 'Revisado':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            {estado}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{estado}</Badge>;
    }
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
          <FileClock className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
            Recepción de Informes de Profesores
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Supervisa los informes de clases y asistencia enviados por el personal docente.
          </p>
        </div>

        <Card className="shadow-lg bg-card">
          <CardHeader>
            <CardTitle>Bandeja de Entrada de Informes</CardTitle>
            <CardDescription>Busca por profesor o filtra para encontrar informes específicos.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
                <Input placeholder="Buscar por nombre del profesor..." className="max-w-xs bg-background" />
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por turno..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="todos">Todos los turnos</SelectItem>
                        <SelectItem value="mañana">Mañana</SelectItem>
                        <SelectItem value="tarde">Tarde</SelectItem>
                        <SelectItem value="noche">Noche</SelectItem>
                    </SelectContent>
                </Select>
                 <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por estado..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="todos">Todos los estados</SelectItem>
                        <SelectItem value="recibido">Recibido</SelectItem>
                        <SelectItem value="revisado">Revisado</SelectItem>
                    </SelectContent>
                </Select>
                <Button><Search className="mr-2 h-4 w-4"/>Buscar</Button>
            </div>
            
            <div className="overflow-x-auto border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Profesor</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>Turno</TableHead>
                    <TableHead>Fecha de Envío</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {informesPlaceholder.map((informe) => (
                    <TableRow key={informe.id} className="hover:bg-secondary/50">
                      <TableCell className="font-medium">{informe.profesor}</TableCell>
                      <TableCell>{informe.curso}</TableCell>
                      <TableCell>{informe.turno}</TableCell>
                      <TableCell>{informe.fechaEnvio}</TableCell>
                      <TableCell>{getStatusBadge(informe.estado)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" disabled>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalle
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-dashed">
              (La funcionalidad de búsqueda, filtrado y vista de detalle está en desarrollo. Los datos son de ejemplo.)
            </p>
          </CardContent>
        </Card>

      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Recepción de Informes.
        </div>
      </footer>
    </div>
  );
}
