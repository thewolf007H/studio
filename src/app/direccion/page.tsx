
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Landmark, Users, BookCheck, LineChart } from 'lucide-react';

export default function DireccionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">
            <Landmark className="inline-block mr-3 h-10 w-10" />
            Portal de Dirección
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Herramientas para la supervisión y gestión académica de First Class Institute.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <Users className="mr-2 h-6 w-6 text-accent" />
                Gestión de Profesores
              </CardTitle>
              <CardDescription>Administra el personal docente y sus asignaciones.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Visualiza la lista de profesores, añade nuevos perfiles y gestiona sus cursos.</p>
              <Button asChild variant="outline">
                <Link href="#">Administrar Profesores</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <BookCheck className="mr-2 h-6 w-6 text-accent" />
                Supervisión de Cursos
              </CardTitle>
              <CardDescription>Revisa el contenido y el progreso de los cursos ofertados.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Accede a los temarios, estadísticas de finalización y feedback de alumnos.</p>
              <Button asChild variant="outline">
                <Link href="#">Supervisar Cursos</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <LineChart className="mr-2 h-6 w-6 text-accent" />
                Reportes y Estadísticas
              </CardTitle>
              <CardDescription>Consulta informes detallados sobre el rendimiento académico.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Genera reportes de inscripción, progreso de alumnos y efectividad de los cursos.</p>
              <Button asChild variant="outline">
                <Link href="#">Ver Reportes</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center p-6 border border-dashed rounded-lg bg-secondary/30">
            <h3 className="text-xl font-semibold font-headline mb-2">Funcionalidades en Desarrollo</h3>
            <ul className="list-disc list-inside text-muted-foreground text-sm">
                <li>Sistema de comunicación interna con profesores.</li>
                <li>Gestión de matrículas y pagos.</li>
                <li>Configuración de ciclos académicos.</li>
            </ul>
        </div>

      </main>
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Portal de Dirección.
        </div>
      </footer>
    </div>
  );
}
