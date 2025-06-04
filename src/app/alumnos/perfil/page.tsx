
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ChevronLeft, UserCircle, BookOpen, Edit3, Settings2, CalendarClock } from 'lucide-react';

export default function AlumnoPerfilPage() {
  const alumno = {
    nombre: "Ana García Pérez",
    email: "ana.garcia@example.com",
    rol: "Alumno",
    avatarUrl: "https://placehold.co/100x100.png", // Placeholder
    cursosInscritos: ["Inglés Básico A1", "Inglés Conversacional Nivel 1"],
    ultimaActividad: "Completó quiz 'Verbos Irregulares'",
    fechaRegistro: "15 de Enero, 2023",
  };

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

        <Card className="max-w-3xl mx-auto shadow-xl border border-border bg-card">
          <CardHeader className="text-center">
            <UserCircle className="mx-auto h-16 w-16 text-primary mb-4" />
            <CardTitle className="text-3xl font-headline">Mi Perfil de Alumno</CardTitle>
            <CardDescription>Aquí puedes ver y gestionar tu información personal y académica.</CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-lg bg-secondary/30 border">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage src={alumno.avatarUrl} alt={alumno.nombre} data-ai-hint="profile avatar" />
                <AvatarFallback>{alumno.nombre.substring(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-semibold">{alumno.nombre}</h2>
                <p className="text-primary">{alumno.rol}</p>
                <p className="text-sm text-muted-foreground">{alumno.email}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-xl font-semibold font-headline mb-3 flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-accent" />
                Resumen Académico
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between p-3 bg-background rounded-md border">
                  <span className="font-medium text-muted-foreground">Cursos Inscritos:</span>
                  <span>{alumno.cursosInscritos.join(", ") || "Ninguno"}</span>
                </div>
                <div className="flex justify-between p-3 bg-background rounded-md border">
                  <span className="font-medium text-muted-foreground">Última Actividad:</span>
                  <span>{alumno.ultimaActividad || "N/A"}</span>
                </div>
                <div className="flex justify-between p-3 bg-background rounded-md border">
                  <span className="font-medium text-muted-foreground">Miembro Desde:</span>
                  <span>{alumno.fechaRegistro}</span>
                </div>
              </div>
            </div>
            
            <Separator />

            <div>
              <h3 className="text-xl font-semibold font-headline mb-3 flex items-center">
                <Settings2 className="mr-2 h-5 w-5 text-accent" />
                Configuración de la Cuenta
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Gestiona tus preferencias de notificación, contraseña y más.
              </p>
              <Button variant="outline" className="w-full sm:w-auto hover:bg-primary/10 transition-colors" disabled>
                <Edit3 className="mr-2 h-4 w-4" />
                Editar Información Personal
              </Button>
              <p className="text-xs text-muted-foreground mt-2">(Funcionalidad de edición en desarrollo)</p>
            </div>

          </CardContent>
          <CardFooter className="p-6 border-t">
             <p className="text-xs text-muted-foreground text-center w-full">
              Para cambios en tu información académica, contacta con administración.
            </p>
          </CardFooter>
        </Card>
      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Perfil del Alumno.
        </div>
      </footer>
    </div>
  );
}
