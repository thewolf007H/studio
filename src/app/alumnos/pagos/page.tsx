
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, CreditCard, History, FileText } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';


const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.861 9.861 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.204-1.634a11.802 11.802 0 005.785 1.634h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);


export default function AlumnoPagosPage() {
  const pagosPlaceholder = [
    { id: "p1", fecha: "2024-07-01", concepto: "Mensualidad Julio", estado: "Pagado", metodo: "Tarjeta Crédito **** 1234" },
    { id: "p2", fecha: "2024-06-01", concepto: "Mensualidad Junio", estado: "Pagado", metodo: "Transferencia Bancaria" },
    { id: "p3", fecha: "2024-05-01", concepto: "Mensualidad Mayo", estado: "Pagado", metodo: "Pago Móvil" },
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
        
        <Card className="shadow-lg bg-card mb-8 border-green-500/50 border">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-headline">
              <WhatsappIcon className="h-6 w-6 mr-2 text-green-500" fill="currentColor" />
              Contactar para Pagos
            </CardTitle>
            <CardDescription>Comunícate directamente con administración para gestionar tus pagos.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Para realizar un pago, consultar saldos o solicitar tu factura, por favor contáctanos a través de WhatsApp. Nuestro equipo te atenderá a la brevedad.
            </p>
            <Button asChild className="w-full md:w-auto font-semibold bg-green-600 hover:bg-green-700 text-white">
              <Link href="https://wa.me/59100000000?text=Hola,%20quisiera%20consultar%20sobre%20mis%20pagos." target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="h-5 w-5 mr-2" fill="currentColor"/>
                Chatear por WhatsApp
              </Link>
            </Button>
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
