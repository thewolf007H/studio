
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ChevronLeft, Snowflake, Search, UserX } from 'lucide-react';

export default function DireccionCongelacionCuentasPage() {
  const alumnosConDeuda = [
    { id: "a1", nombre: "Javier Sánchez Gómez", curso: "Inglés Intermedio B1", ultimoPago: "2024-06-05", diasRetraso: 40 },
    { id: "a2", nombre: "Sofía Moreno Jiménez", curso: "Inglés Básico A1", ultimoPago: "2024-05-05", diasRetraso: 71 },
    { id: "a3", nombre: "Miguel Ángel Díaz", curso: "Preparación TOEFL", ultimoPago: "2024-06-10", diasRetraso: 35 },
    { id: "a4", nombre: "Valentina Rojas Castillo", curso: "Inglés Avanzado C1", ultimoPago: "2024-07-01", diasRetraso: 14 },
  ];

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
          <Snowflake className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
            Congelación de Cuentas
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Busca estudiantes o visualiza la lista de alumnos con pagos atrasados para congelar su acceso a la plataforma.
          </p>
        </div>
        
        <Card className="shadow-lg bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-headline">Buscar y Congelar Cuentas</CardTitle>
            <CardDescription>Utiliza el buscador para encontrar un estudiante específico o gestiona la lista de abajo.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-6">
              <Input placeholder="Buscar por nombre o CI del estudiante..." className="max-w-sm bg-background" />
              <Button><Search className="mr-2 h-4 w-4"/>Buscar</Button>
            </div>
            
            <h3 className="text-lg font-semibold mb-3">Alumnos con Pagos Atrasados</h3>
            
            {alumnosConDeuda.length > 0 ? (
              <div className="overflow-x-auto border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre del Alumno</TableHead>
                      <TableHead>Último Pago</TableHead>
                      <TableHead>Días de Retraso</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alumnosConDeuda.map(alumno => (
                      <TableRow key={alumno.id} className="hover:bg-secondary/50 transition-colors">
                        <TableCell className="font-medium">{alumno.nombre}</TableCell>
                        <TableCell className="text-muted-foreground">{alumno.ultimoPago}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{alumno.diasRetraso} días</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" disabled>
                            <UserX className="mr-2 h-4 w-4" />
                            Congelar Cuenta
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6 border border-dashed rounded-md">
                No hay alumnos con pagos vencidos registrados.
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-dashed">
              (La búsqueda y congelación de cuentas son funcionalidades en desarrollo. Los datos son de ejemplo.)
            </p>
          </CardContent>
        </Card>

      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Gestión de Cuentas.
        </div>
      </footer>
    </div>
  );
}
