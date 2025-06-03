
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ListOrdered, FileText, BookOpenCheck } from 'lucide-react';

export default function AulaVirtualAlumnoPage() {
  const temarioPlaceholder = [
    "Unidad 1: Introducción y Saludos",
    "Unidad 2: Verbo 'To Be' y Artículos",
    "Unidad 3: Presente Simple",
    "Unidad 4: Vocabulario: La Familia",
    "Unidad 5: Preposiciones de Lugar",
    "Repaso General y Práctica Conversacional",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-10">
          <Button asChild variant="outline" size="sm">
            <Link href="/alumnos">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="m15 18-6-6 6-6"/></svg>
              Volver al Portal
            </Link>
          </Button>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">
            <BookOpenCheck className="inline-block mr-3 h-10 w-10" />
            Aula Virtual
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Aquí encontrarás el material de estudio, los temas del curso y acceso a los exámenes y simuladores.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <ListOrdered className="mr-2 h-6 w-6 text-accent" />
                Temario del Curso
              </CardTitle>
              <CardDescription>Consulta los temas que se abordarán en el curso.</CardDescription>
            </CardHeader>
            <CardContent>
              {temarioPlaceholder.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  {temarioPlaceholder.map((tema, index) => (
                    <li key={index}>{tema}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">El temario aún no ha sido definido por el profesor.</p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <FileText className="mr-2 h-6 w-6 text-accent" />
                Exámenes y Simuladores
              </CardTitle>
              <CardDescription>Pon a prueba tus conocimientos y practica para tus evaluaciones.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Prepárate con pruebas interactivas y simulacros de examen.
              </p>
              <Button asChild className="w-full">
                <Link href="#">Acceder a Exámenes</Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-3 text-center">(Funcionalidad de exámenes y quiz en desarrollo)</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="py-6 border-t mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LinguaMeet. Aula Virtual del Alumno.
        </div>
      </footer>
    </div>
  );
}
