
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, UploadCloud, PieChart, Edit } from 'lucide-react';

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
              <CardDescription>Define el temario, crea exámenes y administra el contenido del curso.</CardDescription>
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
            </CardContent>
          </Card>
        </div>

        <div className="text-center p-6 border border-dashed rounded-lg bg-secondary/30">
            <h3 className="text-xl font-semibold font-headline mb-2">Próximas Funcionalidades</h3>
            <ul className="list-disc list-inside text-muted-foreground text-sm">
                <li>Creación avanzada de quizzes y exámenes (dentro del Aula Virtual).</li>
                <li>Integración con herramientas de videoconferencia.</li>
                <li>Sistema de calificaciones y feedback automatizado.</li>
            </ul>
        </div>

      </main>
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LinguaMeet. Portal del Profesor.
        </div>
      </footer>
    </div>
  );
}
