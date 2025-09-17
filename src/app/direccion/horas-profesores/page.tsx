
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, Clock, Search, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const reportsPlaceholder = [
  { id: "r1", facilitador: "Pamela Altamirano Pozo", nivel: "EF 1A", mes: "September", estado: "Enviado", fechaEnvio: "2024-10-01" },
  { id: "r2", facilitador: "Roger Urrutia", nivel: "EF 4B", mes: "September", estado: "Pendiente", fechaEnvio: "" },
  { id: "r3", facilitador: "Laura Martinez", nivel: "EF 2A", mes: "August", estado: "Aprobado", fechaEnvio: "2024-09-02" },
];


export default function DireccionHorasProfesoresPage() {

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
            Supervisión de Horas de Profesores
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Visualiza, filtra y aprueba los informes de horas de clase registrados por el personal docente.
          </p>
        </div>

        <Card className="shadow-lg bg-card">
          <CardHeader>
            <CardTitle>Lista de Informes de Horas</CardTitle>
            <CardDescription>Busca por profesor o filtra por mes y estado para revisar los informes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
                <Input placeholder="Buscar por nombre del profesor..." className="max-w-xs bg-background" />
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por mes..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="september">Septiembre</SelectItem>
                        <SelectItem value="august">Agosto</SelectItem>
                        <SelectItem value="july">Julio</SelectItem>
                    </SelectContent>
                </Select>
                 <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por estado..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="enviado">Enviado</SelectItem>
                        <SelectItem value="aprobado">Aprobado</SelectItem>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                    </SelectContent>
                </Select>
                <Button><Search className="mr-2 h-4 w-4"/>Buscar</Button>
            </div>
            
            <div className="overflow-x-auto border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Facilitador</TableHead>
                    <TableHead>Nivel del Curso</TableHead>
                    <TableHead>Mes</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha de Envío</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportsPlaceholder.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.facilitador}</TableCell>
                      <TableCell>{report.nivel}</TableCell>
                      <TableCell>{report.mes}</TableCell>
                      <TableCell>{report.estado}</TableCell>
                      <TableCell>{report.fechaEnvio || 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" disabled>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Informe
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-dashed">
              (La búsqueda, filtrado y visualización detallada de informes están en desarrollo. Los datos son de ejemplo.)
            </p>
          </CardContent>
        </Card>

      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Supervisión de Horas.
        </div>
      </footer>
    </div>
  );
}
