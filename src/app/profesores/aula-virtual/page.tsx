
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ListPlus, FilePlus2, Eye, Settings, Video, Users as UsersIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function AulaVirtualProfesorPage() {
  const temarioPlaceholder = [
    "Unidad 1: Introducción y Saludos",
    "Unidad 2: Verbo 'To Be' y Artículos",
    "Unidad 3: Presente Simple",
    "Unidad 4: Vocabulario: La Familia",
    "Unidad 5: Preposiciones de Lugar",
    "Repaso General y Práctica Conversacional",
  ];

  const alumnosPlaceholder = [
    { id: "1", nombre: "Ana García Pérez" },
    { id: "2", nombre: "Carlos López Martín" },
    { id: "3", nombre: "Laura Fernández Ruiz" },
    { id: "4", nombre: "Javier Sánchez Gómez" },
    { id: "5", nombre: "Sofía Moreno Jiménez" },
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
            Define el contenido del curso, crea evaluaciones, gestiona clases en vivo, organiza los materiales y visualiza tus alumnos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
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

        <Card className="shadow-lg hover:shadow-xl transition-shadow mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-headline">
              <Video className="mr-2 h-6 w-6 text-accent" />
              Clase Virtual / Videoconferencia
            </CardTitle>
            <CardDescription>Administra tus sesiones de clase en vivo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Genera y comparte enlaces para tus clases virtuales a través de Google Meet o Zoom.
            </p>
            <div>
              <Label htmlFor="meeting-link" className="text-sm font-medium">Enlace de la Reunión (Google Meet/Zoom)</Label>
              <Input id="meeting-link" type="text" placeholder="https://meet.google.com/abc-def-ghi" className="mt-1" disabled />
            </div>
            <div>
              <Label htmlFor="meeting-password">Contraseña (opcional)</Label>
              <Input id="meeting-password" type="text" placeholder="Contraseña de la reunión" className="mt-1" disabled />
            </div>
            <Button className="w-full">
              Generar/Actualizar Enlace de Clase
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">(Funcionalidad de integración con Google Meet/Zoom en desarrollo)</p>
          </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <UsersIcon className="mr-2 h-6 w-6 text-accent" />
                Alumnos Inscritos
              </CardTitle>
              <CardDescription>Visualiza y gestiona los estudiantes de este curso.</CardDescription>
            </CardHeader>
            <CardContent>
              {alumnosPlaceholder.length > 0 ? (
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {alumnosPlaceholder.map((alumno, index) => (
                    <li key={alumno.id} className="flex justify-between items-center py-1">
                      <span>{alumno.nombre}</span>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="#">Ver Detalles</Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Aún no hay alumnos inscritos en este curso.</p>
              )}
              <Button variant="outline" className="w-full mt-4">Gestionar Alumnos</Button>
              <p className="text-xs text-muted-foreground mt-3 text-center">(Funcionalidad de gestión de alumnos en desarrollo)</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
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
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Aún no has definido ningún tema para el curso.</p>
              )}
              <p className="text-xs text-muted-foreground mt-3">Esta es una vista previa estática. La gestión real se hace en "Gestionar Temario".</p>
            </CardContent>
          </Card>
        </div>

      </main>
      <footer className="py-6 border-t mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LinguaMeet. Gestión del Aula Virtual.
        </div>
      </footer>
    </div>
  );
}
