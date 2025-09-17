
import { Header } from '@/components/layout/header';
import { CourseInfoSection } from '@/components/course/course-info-section';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, Landmark, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">

        <section className="mb-16">
          <div className="relative text-center p-8 md:p-12 bg-gradient-to-br from-primary via-primary/80 to-accent rounded-xl shadow-2xl overflow-hidden border border-primary/30">
            <div className="absolute inset-0 opacity-[0.04] pattern-[0.8rem_0.8rem_#ffffff_radial-gradient(circle_at_center,_var(--tw-gradient-stops))]"></div>
            <Sparkles className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-white animate-pulse" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4 text-white drop-shadow-md">
              ¡Hola Futuro Bilingüe!
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              Estás a un paso de transformar tu mundo con el inglés. <span className="font-semibold">First Class Institute</span> te da la bienvenida a una experiencia de aprendizaje única y emocionante.
            </p>
          </div>
        </section>

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">
            Descubre <span className="text-primary">First Class Institute</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tu plataforma interactiva para aprender inglés, potenciada por inteligencia artificial. Explora cursos, organiza tu aprendizaje y ponte a prueba.
          </p>
        </div>
        
        <CourseInfoSection />
                
        <Separator className="my-12" />

        <section id="portals" className="py-12">
          <h2 className="text-3xl font-bold font-headline text-center mb-8">Nuestros Portales</h2>
          <div className="grid md:grid-cols-2 gap-8">
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
      <footer className="py-6 border-t mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
