
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, Megaphone, MessageSquarePlus, BellRing } from 'lucide-react';

export default function DireccionComunicacionesPage() {
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
          <Megaphone className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
            Comunicaciones Internas
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Gestiona avisos, notificaciones y comunicados para toda la institución o grupos específicos.
          </p>
        </div>
        
        <Card className="shadow-lg bg-card">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-headline">
              Panel de Comunicaciones
            </CardTitle>
            <CardDescription>Crea nuevos avisos, programa notificaciones y revisa el historial.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <Button variant="outline" className="py-8 text-lg hover:bg-primary/10" disabled>
                    <MessageSquarePlus className="mr-3 h-6 w-6"/>
                    Crear Nuevo Aviso General
                </Button>
                <Button variant="outline" className="py-8 text-lg hover:bg-primary/10" disabled>
                    <BellRing className="mr-3 h-6 w-6"/>
                    Programar Notificación
                </Button>
            </div>
            <p className="text-center text-muted-foreground p-6 border border-dashed rounded-md">
              Funcionalidad de creación, segmentación y envío de comunicaciones en desarrollo. Próximamente: plantillas de mensajes, historial de envíos y confirmaciones de lectura.
            </p>
          </CardContent>
        </Card>

      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Comunicaciones Internas.
        </div>
      </footer>
    </div>
  );
}
