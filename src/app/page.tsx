
import { Header } from '@/components/layout/header';
import { CourseInfoSection } from '@/components/course/course-info-section';
import { QuizSection } from '@/components/quiz/quiz-section';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, Briefcase, Landmark } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
            Bienvenido a <span className="text-primary">First Class Institute</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tu plataforma interactiva para aprender inglés, potenciada por inteligencia artificial. Explora cursos, organiza tu aprendizaje y ponte a prueba.
          </p>
        </div>
        
        <CourseInfoSection />
                
        <Separator className="my-12" />
        
        <QuizSection />

        <Separator className="my-12" />

        <section id="portals" className="py-12">
          <h2 className="text-3xl font-bold font-headline text-center mb-8">Explora Nuestros Portales</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-headline">
                  <Users className="mr-3 h-7 w-7 text-primary" />
                  Portal del Alumno
                </CardTitle>
                <CardDescription>Tu espacio personalizado para aprender y crecer.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Accede a tus cursos, sigue tu progreso, interactúa con materiales de estudio y organiza tu calendario de aprendizaje.
                </p>
                <Button asChild className="w-full">
                  <Link href="/alumnos">Acceder como Alumno</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-headline">
                  <Briefcase className="mr-3 h-7 w-7 text-primary" />
                  Portal del Profesor
                </CardTitle>
                <CardDescription>Herramientas para gestionar y enriquecer tus clases.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Administra tus cursos, gestiona estudiantes, sube materiales educativos y sigue el rendimiento de tus alumnos.
                </p>
                <Button asChild className="w-full">
                  <Link href="/profesores">Acceder como Profesor</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-headline">
                  <Landmark className="mr-3 h-7 w-7 text-primary" />
                  Portal de Dirección
                </CardTitle>
                <CardDescription>Supervisión y gestión académica general.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Accede a reportes, gestiona personal docente y supervisa el progreso general de la institución.
                </p>
                <Button asChild className="w-full">
                  <Link href="/direccion">Acceder como Dirección</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

      </main>
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
