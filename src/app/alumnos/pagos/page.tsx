
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, CreditCard, DollarSign, FileText, History } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

export default function AlumnoPagosPage() {
  const pagosPlaceholder = [
    { id: "p1", fecha: "2024-07-01", concepto: "Mensualidad Julio", monto: "Bs 250.00", estado: "Pagado", metodo: "Tarjeta Crédito **** 1234" },
    { id: "p2", fecha: "2024-06-01", concepto: "Mensualidad Junio", monto: "Bs 250.00", estado: "Pagado", metodo: "Transferencia Bancaria" },
    { id: "p3", fecha: "2024-05-01", concepto: "Mensualidad Mayo", monto: "Bs 250.00", estado: "Pagado", metodo: "Pago Móvil" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button asChild variant="outline" size="sm" className="hover:bg-primary/10 transition-colors">
            <Link href="/alumnos">
              <ChevronLeft className="mr-2 h-4 w-4"/>
              Volver al Portal de Alumno
            </Link>
          </Button>
        </div>

        <div className="relative text-center mb-12 p-6 md:p-8 bg-card rounded-xl shadow-xl overflow-hidden border border-border">
          <div className="absolute inset-0 opacity-[0.03] pattern-[0.8rem_0.8rem_#000000_radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:opacity-[0.05] dark:pattern-[0.8rem_0.8rem_#ffffff_radial-gradient(circle_at_center,_var(--tw-gradient-stops))]"></div>
          <CreditCard className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
            Mis Pagos
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Consulta tu historial de pagos, descarga facturas y realiza los pagos de tus mensualidades.
          </p>
        </div>
        
        <Card className="shadow-lg bg-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-headline">
              <DollarSign className="mr-2 h-6 w-6 text-accent" />
              Realizar Nuevo Pago
            </CardTitle>
            <CardDescription>Paga tu próxima mensualidad o cualquier saldo pendiente.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Actualmente, no tienes saldos pendientes. Si necesitas realizar un pago, el sistema te lo indicará aquí.
            </p>
            <Button className="w-full md:w-auto font-semibold" disabled>
              <CreditCard className="mr-2 h-5 w-5" />
              Pagar Mensualidad
            </Button>
            <p className="text-xs text-muted-foreground mt-3 text-center">(Funcionalidad de pasarela de pago en desarrollo)</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-card">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-headline">
              <History className="mr-2 h-6 w-6 text-accent" />
              Historial de Pagos
            </CardTitle>
            <CardDescription>Revisa todos los pagos que has realizado.</CardDescription>
          </CardHeader>
          <CardContent>
            {pagosPlaceholder.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Concepto</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pagosPlaceholder.map(pago => (
                      <TableRow key={pago.id} className="hover:bg-secondary/50 transition-colors">
                        <TableCell className="text-muted-foreground">{pago.fecha}</TableCell>
                        <TableCell className="font-medium">{pago.concepto}</TableCell>
                        <TableCell>{pago.monto}</TableCell>
                        <TableCell>
                          <Badge variant={pago.estado === "Pagado" ? "default" : "destructive"} className={pago.estado === "Pagado" ? "bg-green-500/80 text-primary-foreground" : "bg-red-500/80 text-primary-foreground"}>
                            {pago.estado}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{pago.metodo}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="hover:bg-primary/10" disabled>
                            <FileText className="mr-1 h-4 w-4" />
                            Ver Factura
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">No hay pagos registrados.</p>
            )}
            <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-dashed">
              (La generación y descarga de facturas, así como la visualización de pagos reales, está en desarrollo.)
            </p>
          </CardContent>
        </Card>

      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Gestión de Pagos del Alumno.
        </div>
      </footer>
    </div>
  );
}
