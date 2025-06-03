
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { School, BarChart3, UserCircle, MessageSquare, CalendarCheck, Trophy, CalendarPlus } from 'lucide-react';
import { CalendarSection } from '@/components/calendar/calendar-section';
import { Separator } from '@/components/ui/separator';

export default function AlumnoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">
            Portal del Alumno
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Bienvenido a tu espacio personal. Aquí podrás gestionar tu aprendizaje, acceder a materiales y mucho más.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <School className="mr-2 h-6 w-6 text-accent" />
                Aula Virtual
              </CardTitle>
              <CardDescription>Accede a tus clases, temario y exámenes.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Encuentra lecciones, simuladores y el plan de estudios.</p>
              <Button asChild variant="default" className="w-full">
                <Link href="/alumnos/aula-virtual">Entrar al Aula Virtual</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <BarChart3 className="mr-2 h-6 w-6 text-accent" />
                Mi Progreso
              </CardTitle>
              <CardDescription>Consulta tus avances y calificaciones.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Revisa tus resultados en quizzes y actividades.</p>
              <Button asChild variant="outline">
                <Link href="#">Ver Progreso</Link>
              </Button>
               <p className="text-xs text-muted-foreground mt-2 text-center">(Funcionalidad en desarrollo)</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <UserCircle className="mr-2 h-6 w-6 text-accent" />
                Mi Perfil
              </CardTitle>
              <CardDescription>Actualiza tu información personal y preferencias.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Gestiona los datos de tu cuenta.</p>
              <Button asChild variant="outline">
                <Link href="/alumnos/perfil">Editar Perfil</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <MessageSquare className="mr-2 h-6 w-6 text-accent" />
                Mensajería
              </CardTitle>
              <CardDescription>Comunícate con profesores y compañeros.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Accede a tus mensajes y notificaciones.</p>
              <Button asChild variant="outline">
                <Link href="#">Ir a Mensajes</Link>
              </Button>
               <p className="text-xs text-muted-foreground mt-2 text-center">(Funcionalidad en desarrollo)</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <CalendarPlus className="mr-2 h-6 w-6 text-accent" />
                Calendario de Estudio
              </CardTitle>
              <CardDescription>Organiza tus sesiones de estudio y tareas.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Planifica tu aprendizaje y recibe recordatorios.</p>
              <Button asChild variant="outline">
                <Link href="/alumnos/calendario-estudio">Abrir Calendario</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <Trophy className="mr-2 h-6 w-6 text-accent" />
                Gamificación y Recompensas
              </CardTitle>
              <CardDescription>Gana puntos y medallas por tu progreso.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Completa desafíos y desbloquea logros.</p>
              <Button asChild variant="outline" disabled>
                <Link href="#">Ver Mis Logros</Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">(Funcionalidad en desarrollo)</p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />
        
        <CalendarSection isEditable={false} />
        
        <Separator className="my-12" />
        
        <div className="text-center p-6 border border-dashed rounded-lg bg-secondary/30">
            <h3 className="text-xl font-semibold font-headline mb-2">Próximas Funcionalidades</h3>
            <ul className="list-disc list-inside text-muted-foreground text-sm">
                <li>Foros de discusión por curso.</li>
            </ul>
        </div>

      </main>
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LinguaMeet. Portal del Alumno.
        </div>
      </footer>
    </div>
  );
}
