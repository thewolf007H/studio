
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ListOrdered, FileText, BookOpenCheck, Video, ChevronLeft, CheckSquare } from 'lucide-react';

export default function AulaVirtualAlumnoPage() {
  const temarioPlaceholder = [
    { title: "Unidad 1: Introducción y Saludos", completed: true },
    { title: "Unidad 2: Verbo 'To Be' y Artículos", completed: true },
    { title: "Unidad 3: Presente Simple", completed: false },
    { title: "Unidad 4: Vocabulario: La Familia", completed: false },
    { title: "Unidad 5: Preposiciones de Lugar", completed: false },
    { title: "Repaso General y Práctica Conversacional", completed: false },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button asChild variant="outline" size="sm" className="hover:bg-primary/10 transition-colors">
            <Link href="/alumnos">
              <ChevronLeft className="mr-2 h-4 w-4"/>
              Volver al Portal
            </Link>
          </Button>
        </div>
        
        <div className="relative text-center mb-12 p-6 md:p-8 bg-card rounded-xl shadow-xl overflow-hidden border border-border">
           <div className="absolute inset-0 opacity-[0.03] pattern-[0.8rem_0.8rem_#000000_radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:opacity-[0.05] dark:pattern-[0.8rem_0.8rem_#ffffff_radial-gradient(circle_at_center,_var(--tw-gradient-stops))]"></div>
          <BookOpenCheck className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
            Mi Aula Virtual
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Tu centro de aprendizaje: explora el temario, prepárate con exámenes y únete a clases en vivo.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] lg:col-span-2 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-headline">
                <ListOrdered className="mr-3 h-7 w-7 text-accent" />
                Temario del Curso
              </CardTitle>
              <CardDescription>Consulta los temas que se abordarán y marca tu progreso.</CardDescription>
            </CardHeader>
            <CardContent>
              {temarioPlaceholder.length > 0 ? (
                <ul className="space-y-3">
                  {temarioPlaceholder.map((tema, index) => (
                    <li key={index} className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${tema.completed ? 'bg-green-500/10 hover:bg-green-500/20' : 'bg-secondary/50 hover:bg-secondary/80'}`}>
                      <CheckSquare className={`mr-3 h-5 w-5 ${tema.completed ? 'text-green-600' : 'text-muted-foreground/50'}`} />
                      <span className={`flex-1 ${tema.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{tema.title}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center">El temario aún no ha sido definido.</p>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6 md:space-y-8 lg:col-span-1">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] bg-card">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-headline">
                  <FileText className="mr-2 h-6 w-6 text-accent" />
                  Exámenes y Simuladores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Pon a prueba tus conocimientos y practica para tus evaluaciones.
                </p>
                <Button asChild className="w-full font-semibold">
                  <Link href="#">Acceder a Pruebas</Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-3 text-center">(Funcionalidad en desarrollo)</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] bg-card">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-headline">
                  <Video className="mr-2 h-6 w-6 text-accent" />
                  Clase en Vivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Únete a las sesiones de videoconferencia programadas por tu profesor.
                </p>
                <Button asChild className="w-full font-semibold" variant="outline">
                  <Link href="#">Unirse a la Clase</Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-3 text-center">(Enlace disponible al iniciar sesión)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LinguaMeet. Aula Virtual del Alumno.
        </div>
      </footer>
    </div>
  );
}
