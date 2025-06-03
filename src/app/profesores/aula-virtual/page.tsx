
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ListPlus, FilePlus2, Eye, Settings } from 'lucide-react';

export default function AulaVirtualProfesorPage() {
  const temarioPlaceholder = [
    "Unidad 1: Introducción y Saludos",
    "Unidad 2: Verbo 'To Be' y Artículos",
    "Unidad 3: Presente Simple",
    // ... más temas
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-10">
          <Button asChild variant="outline" size="sm">
            <Link href="/profesores">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="m15 18-6-6 6-6"/></svg>
              Volver al Portal
            </Link>
          </Button>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">
            <Settings className="inline-block mr-3 h-10 w-10" />
            Gestión del Aula Virtual
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Define el contenido del curso, crea evaluaciones y organiza los materiales para tus estudiantes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <ListPlus className="mr-2 h-6 w-6 text-accent" />
                Gestionar Temario del Curso
              </CardTitle>
              <CardDescription>Define y organiza los temas y unidades que se enseñarán.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Crea, edita y reordena el plan de estudios.
              </p>
              <Button asChild className="w-full">
                <Link href="#">Editar Temario</Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-3 text-center">(Funcionalidad de edición de temario en desarrollo)</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <FilePlus2 className="mr-2 h-6 w-6 text-accent" />
                Crear y Gestionar Exámenes
              </CardTitle>
              <CardDescription>Elabora nuevas pruebas, simuladores y gestiona las existentes.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Utiliza el generador de IA o crea preguntas manualmente.
              </p>
              <Button asChild className="w-full">
                <Link href="#">Crear Nuevo Examen</Link>
              </Button>
               <p className="text-xs text-muted-foreground mt-3 text-center">(Integración con generador de IA y creación manual en desarrollo)</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg hover:shadow-xl transition-shadow mt-8">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <Eye className="mr-2 h-6 w-6 text-accent" />
                Vista Previa del Temario (Alumno)
              </CardTitle>
              <CardDescription>Así es como los alumnos verán el temario actualmente definido.</CardDescription>
            </CardHeader>
            <CardContent>
              {temarioPlaceholder.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  {temarioPlaceholder.map((tema, index) => (
                    <li key={index}>{tema}</li>
                  ))}
                  <li>Unidad 4: Vocabulario: La Familia</li>
                  <li>Unidad 5: Preposiciones de Lugar</li>
                  <li>Repaso General y Práctica Conversacional</li>
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Aún no has definido ningún tema para el curso.</p>
              )}
              <p className="text-xs text-muted-foreground mt-3">Esta es una vista previa estática. La gestión real se hace en "Gestionar Temario".</p>
            </CardContent>
          </Card>

      </main>
      <footer className="py-6 border-t mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LinguaMeet. Gestión del Aula Virtual.
        </div>
      </footer>
    </div>
  );
}
