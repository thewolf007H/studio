
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ListPlus, FilePlus2, Eye, Settings, Video, Users as UsersIcon, ChevronLeft, UserCircle, Edit3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function AulaVirtualProfesorPage() {
  const temarioPlaceholder = [
    "Unidad 1: Introducción y Saludos",
    "Unidad 2: Verbo 'To Be' y Artículos",
    "Unidad 3: Presente Simple (En progreso)",
    "Unidad 4: Vocabulario: La Familia",
    "Unidad 5: Preposiciones de Lugar",
    "Repaso General y Práctica Conversacional",
  ];

  const alumnosPlaceholder = [
    { id: "1", nombre: "Ana García Pérez", progreso: 75 },
    { id: "2", nombre: "Carlos López Martín", progreso: 90 },
    { id: "3", nombre: "Laura Fernández Ruiz", progreso: 60 },
    { id: "4", nombre: "Javier Sánchez Gómez", progreso: 82 },
    { id: "5", nombre: "Sofía Moreno Jiménez", progreso: 95 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button asChild variant="outline" size="sm" className="hover:bg-primary/10 transition-colors">
            <Link href="/profesores">
               <ChevronLeft className="mr-2 h-4 w-4"/>
              Volver al Portal
            </Link>
          </Button>
        </div>
        
        <div className="relative text-center mb-12 p-6 md:p-8 bg-card rounded-xl shadow-xl overflow-hidden border border-border">
           <div className="absolute inset-0 opacity-[0.03] pattern-[0.8rem_0.8rem_#000000_radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:opacity-[0.05] dark:pattern-[0.8rem_0.8rem_#ffffff_radial-gradient(circle_at_center,_var(--tw-gradient-stops))]"></div>
          <Settings className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
            Gestión del Aula Virtual
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Administra el contenido del curso, crea evaluaciones, programa clases en vivo y supervisa el progreso de tus alumnos.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Columna Principal (Más ancha) */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] bg-card">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-headline">
                  <ListPlus className="mr-3 h-7 w-7 text-accent" />
                  Gestionar Temario del Curso
                </CardTitle>
                <CardDescription>Define y organiza los temas y unidades que se enseñarán. Los alumnos verán esto en tiempo real.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Crea, edita, reordena y publica el plan de estudios.
                </p>
                <Button asChild className="w-full md:w-auto font-semibold">
                  <Link href="#"><Edit3 className="mr-2 h-5 w-5" /> Editar Temario</Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-3">(Funcionalidad de edición de temario en desarrollo)</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] bg-card">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-headline">
                  <FilePlus2 className="mr-3 h-7 w-7 text-accent" />
                  Crear y Gestionar Evaluaciones
                </CardTitle>
                <CardDescription>Elabora nuevas pruebas, simuladores y gestiona las existentes.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Utiliza el generador de IA o crea preguntas manualmente para evaluar a tus alumnos.
                </p>
                <Button asChild className="w-full md:w-auto font-semibold">
                  <Link href="#">Crear Nueva Evaluación</Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-3">(Integración con IA y creación manual en desarrollo)</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] bg-card">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-headline">
                  <Video className="mr-2 h-6 w-6 text-accent" />
                  Clase Virtual / Videoconferencia
                </CardTitle>
                <CardDescription>Administra tus sesiones de clase en vivo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Genera y comparte enlaces para tus clases virtuales (ej. Google Meet, Zoom).
                </p>
                <div className="space-y-2">
                  <Label htmlFor="meeting-link" className="text-sm font-medium">Enlace de la Reunión</Label>
                  <Input id="meeting-link" type="url" placeholder="https://meet.google.com/abc-def-ghi" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meeting-password">Contraseña (opcional)</Label>
                  <Input id="meeting-password" type="text" placeholder="Contraseña de la reunión" className="bg-background" />
                </div>
                <Button className="w-full md:w-auto font-semibold">
                  Generar/Actualizar Enlace
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">(Integración con plataformas en desarrollo)</p>
              </CardContent>
            </Card>
          </div>

          {/* Columna Lateral (Más estrecha) */}
          <div className="lg:col-span-1 space-y-6 md:space-y-8">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] bg-card">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-headline">
                  <UsersIcon className="mr-2 h-6 w-6 text-accent" />
                  Alumnos Inscritos
                </CardTitle>
                <CardDescription>Visualiza los estudiantes de este curso.</CardDescription>
              </CardHeader>
              <CardContent>
                {alumnosPlaceholder.length > 0 ? (
                  <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {alumnosPlaceholder.map((alumno) => (
                      <li key={alumno.id} className="flex items-center justify-between p-3 bg-secondary/30 hover:bg-secondary/60 rounded-lg transition-colors duration-200">
                        <div className="flex items-center">
                          <UserCircle className="mr-3 h-6 w-6 text-muted-foreground" />
                          <span className="text-sm font-medium">{alumno.nombre}</span>
                        </div>
                        <Badge variant={alumno.progreso > 80 ? "default" : "secondary"} className={alumno.progreso > 80 ? "bg-green-500/80 text-white" : ""}>{alumno.progreso}%</Badge>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No hay alumnos inscritos.</p>
                )}
                <Button variant="outline" className="w-full mt-4 font-semibold">Gestionar Alumnos</Button>
                <p className="text-xs text-muted-foreground mt-3 text-center">(Funcionalidad en desarrollo)</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] bg-card border-dashed border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-headline">
                  <Eye className="mr-2 h-6 w-6 text-accent" />
                  Vista Previa (Alumno)
                </CardTitle>
                <CardDescription>Así verán los alumnos el temario.</CardDescription>
              </CardHeader>
              <CardContent>
                {temarioPlaceholder.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    {temarioPlaceholder.map((tema, index) => (
                      <li key={index}>{tema}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">Define el temario para ver la vista previa.</p>
                )}
                <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-border">Esta es una simulación. La gestión real se hace en "Gestionar Temario".</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LinguaMeet. Gestión del Aula Virtual.
        </div>
      </footer>
    </div>
  );
}
