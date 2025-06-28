
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, UploadCloud, PieChart, Edit, UserCog, ClipboardCheck } from 'lucide-react';
import { CalendarSection } from '@/components/calendar/calendar-section';
import { Separator } from '@/components/ui/separator';

export default function ProfesorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">
            Portal del Profesor
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Gestiona tus cursos, estudiantes y recursos educativos de manera eficiente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <Edit className="mr-2 h-6 w-6 text-accent" />
                Gestionar Aula Virtual
              </CardTitle>
              <CardDescription>Define el temario, toma asistencia y administra el contenido.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Configura los módulos de aprendizaje para tus alumnos.</p>
              <Button asChild variant="default" className="w-full">
                <Link href="/profesores/aula-virtual">Ir a Gestión del Aula</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <Users className="mr-2 h-6 w-6 text-accent" />
                Estudiantes
              </CardTitle>
              <CardDescription>Consulta el listado de tus estudiantes y su progreso.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Realiza seguimiento individual y grupal.</p>
              <Button asChild variant="outline">
                <Link href="#">Ver Estudiantes</Link>
              </Button>
               <p className="text-xs text-muted-foreground mt-2 text-center">(Funcionalidad en desarrollo)</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <UploadCloud className="mr-2 h-6 w-6 text-accent" />
                Materiales Adicionales
              </CardTitle>
              <CardDescription>Sube y organiza recursos educativos complementarios.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Comparte archivos, videos y enlaces.</p>
              <Button asChild variant="outline">
                <Link href="#">Subir Material</Link>
              </Button>
               <p className="text-xs text-muted-foreground mt-2 text-center">(Funcionalidad en desarrollo)</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <ClipboardCheck className="mr-2 h-6 w-6 text-accent" />
                Calificaciones y Feedback
              </CardTitle>
              <CardDescription>Revisa el rendimiento y proporciona comentarios a tus alumnos.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Accede al sistema de calificaciones y gestiona el feedback.</p>
              <Button asChild variant="outline">
                <Link href="/profesores/calificaciones">Gestionar Calificaciones</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <PieChart className="mr-2 h-6 w-6 text-accent" />
                Analíticas
              </CardTitle>
              <CardDescription>Visualiza estadísticas de tus cursos.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Métricas de participación y rendimiento.</p>
              <Button asChild variant="outline">
                <Link href="#">Ver Analíticas</Link>
              </Button>
               <p className="text-xs text-muted-foreground mt-2 text-center">(Funcionalidad en desarrollo)</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <UserCog className="mr-2 h-6 w-6 text-accent" />
                Mi Perfil
              </CardTitle>
              <CardDescription>Actualiza tu información y gestiona tu cuenta.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Revisa tus datos personales y profesionales.</p>
              <Button asChild variant="outline">
                <Link href="/profesores/perfil">Ir a Mi Perfil</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        <CalendarSection isEditable={true} />

      </main>
      <footer className="py-6 border-t mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Portal del Profesor.
        </div>
      </footer>
    </div>
  );
}
