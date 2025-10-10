
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Landmark, 
  UsersRound, 
  FileSearch, 
  Megaphone, 
  Banknote,
  ClipboardList,
  Replace,
  CalendarClock,
  PiggyBank,
  Snowflake,
  GraduationCap,
  Clock,
  BookUser,
  Users,
  FileClock
} from 'lucide-react';

export default function DireccionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">
            <Landmark className="inline-block mr-3 h-10 w-10" />
            Portal de Dirección
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Herramientas para la supervisión y gestión académica de First Class Institute.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <UsersRound className="mr-2 h-6 w-6 text-accent" />
                Gestión de Profesores
              </CardTitle>
              <CardDescription>Administra el personal docente y sus asignaciones.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Visualiza, añade nuevos perfiles y gestiona los cursos asignados a cada profesor.</p>
              <Button asChild className="w-full">
                <Link href="/direccion/gestion-profesores">Administrar Profesores</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <GraduationCap className="mr-2 h-6 w-6 text-accent" />
                Evaluaciones y Calificaciones
              </CardTitle>
              <CardDescription>Supervisa todas las evaluaciones y notas de los estudiantes.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Busca por alumno, revisa y descarga los boletines de notas y evaluaciones.</p>
              <Button asChild className="w-full">
                <Link href="/direccion/evaluaciones">Supervisar Evaluaciones</Link>
              </Button>
            </CardContent>
          </Card>

           <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <FileClock className="mr-2 h-6 w-6 text-accent" />
                Recepción de Informes
              </CardTitle>
              <CardDescription>Revisa los informes de asistencia y avance de los profesores.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Centraliza y gestiona los informes diarios y semanales del cuerpo docente.</p>
              <Button asChild className="w-full">
                <Link href="/direccion/recepcion-informes">Revisar Informes</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <Megaphone className="mr-2 h-6 w-6 text-accent" />
                Comunicaciones Internas
              </CardTitle>
              <CardDescription>Gestiona avisos y notificaciones para alumnos y profesores.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Envía comunicados importantes y gestiona plantillas de mensajes.</p>
              <Button asChild className="w-full">
                <Link href="/direccion/comunicaciones">Gestionar Comunicaciones</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <Banknote className="mr-2 h-6 w-6 text-accent" />
                Registro de Pagos
              </CardTitle>
              <CardDescription>Ingresa nuevos pagos de mensualidades de los estudiantes.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Accede al formulario para registrar un nuevo pago y generar el recibo correspondiente.</p>
              <Button asChild className="w-full">
                <Link href="/direccion/registro-pagos">Registrar Pago</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <Clock className="mr-2 h-6 w-6 text-accent" />
                Horas Profesores
              </CardTitle>
              <CardDescription>Supervisa los registros de horas y actividades de los profesores.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Visualiza y filtra los informes de horas de clase del personal docente.</p>
              <Button asChild className="w-full">
                <Link href="/direccion/horas-profesores">Supervisar Horas</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <ClipboardList className="mr-2 h-6 w-6 text-accent" />
                Inscripción de Alumnos
              </CardTitle>
              <CardDescription>Inscribe a personas registradas en cursos específicos.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Asigna un curso, horario y tarifa a un estudiante para un nuevo ciclo académico.</p>
              <Button asChild className="w-full">
                <Link href="/direccion/inscripcion-alumnos">Inscribir Alumno</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <Replace className="mr-2 h-6 w-6 text-accent" />
                Cambio de Status
              </CardTitle>
              <CardDescription>Gestiona las tarifas y precios de los cursos y modalidades.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Visualiza y asigna las diferentes tarifas a los estudiantes.</p>
              <Button asChild className="w-full">
                <Link href="/direccion/cambio-status">Gestionar Tarifas</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <CalendarClock className="mr-2 h-6 w-6 text-accent" />
                Cambio de Fecha
              </CardTitle>
              <CardDescription>Ajusta fechas de inicio o fin de cursos para un alumno.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Modifica las fechas de cursada de un estudiante por motivos excepcionales.</p>
              <Button asChild className="w-full">
                <Link href="/direccion/cambio-fecha">Cambiar Fecha</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <PiggyBank className="mr-2 h-6 w-6 text-accent" />
                Pago de Reincorporación
              </CardTitle>
              <CardDescription>Registra pagos para reactivar cuentas o cursos.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Gestiona los pagos de estudiantes que desean reincorporarse tras una pausa.</p>
              <Button asChild className="w-full">
                <Link href="/direccion/pago-reincorporacion">Registrar Pago</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <Snowflake className="mr-2 h-6 w-6 text-accent" />
                Congelación de Cuentas
              </CardTitle>
              <CardDescription>Pausa temporalmente la cuenta de un estudiante.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Administra las solicitudes de congelación de matrícula de los estudiantes.</p>
              <Button asChild className="w-full">
                <Link href="/direccion/congelacion-cuentas">Congelar Cuenta</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <BookUser className="mr-2 h-6 w-6 text-accent" />
                Asignar Cursos a Alumnos
              </CardTitle>
              <CardDescription>Matricula a un estudiante en un nuevo curso ofertado.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Busca un estudiante y asígnale un curso de la lista de disponibles para el ciclo.</p>
              <Button asChild className="w-full">
                <Link href="/direccion/asignar-cursos">Asignar Curso</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <Clock className="mr-2 h-6 w-6 text-accent" />
                Cambio de Horario
              </CardTitle>
              <CardDescription>Asigna un nuevo horario a un estudiante para un curso.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Modifica el horario de un estudiante en su curso actual por motivos excepcionales.</p>
              <Button asChild className="w-full">
                <Link href="/direccion/cambio-horario">Cambiar Horario</Link>
              </Button>
            </CardContent>
          </Card>

           <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <Users className="mr-2 h-6 w-6 text-accent" />
                Reemplazos de Docentes
              </CardTitle>
              <CardDescription>Asigna un profesor sustituto para una clase específica.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Gestiona las sustituciones de profesores por ausencias o emergencias.</p>
              <Button asChild className="w-full">
                <Link href="/direccion/reemplazos">Asignar Reemplazo</Link>
              </Button>
            </CardContent>
          </Card>

        </div>
        
      </main>
      <footer className="py-6 border-t mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Portal de Dirección.
        </div>
      </footer>
    </div>
  );
}
