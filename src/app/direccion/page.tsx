
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
  FileClock,
  CheckSquare,
  Archive,
  BookMarked,
  Building
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function DireccionPage() {
  const academicFunctions = [
    { href: "/direccion/gestion-profesores", icon: UsersRound, title: "Gestión de Profesores", description: "Administra el personal docente y sus asignaciones." },
    { href: "/direccion/evaluaciones", icon: GraduationCap, title: "Evaluaciones y Calificaciones", description: "Supervisa todas las evaluaciones y notas de los estudiantes." },
    { href: "/direccion/recepcion-informes", icon: FileClock, title: "Recepción de Informes", description: "Revisa los informes de asistencia y avance de los profesores." },
    { href: "/direccion/horas-profesores", icon: Clock, title: "Horas Profesores", description: "Supervisa los registros de horas y actividades de los profesores." },
    { href: "/direccion/asignar-cursos", icon: BookUser, title: "Asignar Cursos a Alumnos", description: "Matricula a un estudiante en un nuevo curso ofertado." },
    { href: "/direccion/reemplazos", icon: Users, title: "Reemplazos de Docentes", description: "Asigna un profesor sustituto para una clase específica." },
    { href: "/direccion/informe-asistencias", icon: CheckSquare, title: "Informe de Asistencias", description: "Supervisa la asistencia de los alumnos en detalle." },
    { href: "/direccion/supervision-kardex", icon: Archive, title: "Supervisión de Kardex", description: "Consulta las evaluaciones finales de los alumnos." },
  ];

  const administrativeFunctions = [
    { href: "/direccion/inscripcion-alumnos", icon: ClipboardList, title: "Inscripción de Alumnos", description: "Inscribe a personas registradas en cursos específicos." },
    { href: "/direccion/registro-pagos", icon: Banknote, title: "Registro de Pagos", description: "Ingresa nuevos pagos de mensualidades de los estudiantes." },
    { href: "/direccion/comunicaciones", icon: Megaphone, title: "Comunicaciones Internas", description: "Gestiona avisos y notificaciones para alumnos y profesores." },
    { href: "/direccion/cambio-status", icon: Replace, title: "Cambio de Status", description: "Gestiona las tarifas y precios de los cursos y modalidades." },
    { href: "/direccion/cambio-fecha", icon: CalendarClock, title: "Cambio de Fecha", description: "Ajusta fechas de inicio o fin de cursos para un alumno." },
    { href: "/direccion/pago-reincorporacion", icon: PiggyBank, title: "Pago de Reincorporación", description: "Registra pagos para reactivar cuentas o cursos." },
    { href: "/direccion/congelacion-cuentas", icon: Snowflake, title: "Congelación de Cuentas", description: "Pausa temporalmente la cuenta de un estudiante." },
    { href: "/direccion/cambio-horario", icon: Clock, title: "Cambio de Horario", description: "Asigna un nuevo horario a un estudiante para un curso." },
  ];

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
            Herramientas para la supervisión y gestión de First Class Institute.
          </p>
        </div>

        {/* Academic Functions */}
        <section className="mb-16 p-6 bg-blue-50/30 dark:bg-blue-900/10 rounded-xl">
          <div className="flex items-center mb-6">
            <BookMarked className="h-8 w-8 text-blue-600 mr-4"/>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold font-headline text-blue-800 dark:text-blue-300">Funciones Académicas</h2>
                <p className="text-muted-foreground">Gestión de personal docente, cursos y rendimiento estudiantil.</p>
            </div>
          </div>
          <Separator className="mb-8 bg-blue-200 dark:bg-blue-800" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {academicFunctions.map((func) => (
              <Card key={func.href} className="shadow-lg hover:shadow-xl transition-shadow border-blue-100 dark:border-blue-900/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-headline">
                    <func.icon className="mr-2 h-6 w-6 text-accent" />
                    {func.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 h-12">{func.description}</p>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                    <Link href={func.href}>Ir a {func.title.split(' ')[0]}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Administrative Functions */}
        <section className="p-6 bg-green-50/30 dark:bg-green-900/10 rounded-xl">
          <div className="flex items-center mb-6">
            <Building className="h-8 w-8 text-green-600 mr-4"/>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold font-headline text-green-800 dark:text-green-300">Funciones Administrativas</h2>
                <p className="text-muted-foreground">Gestión de pagos, inscripciones, comunicaciones y estados de cuenta.</p>
            </div>
          </div>
          <Separator className="mb-8 bg-green-200 dark:bg-green-800"/>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {administrativeFunctions.map((func) => (
              <Card key={func.href} className="shadow-lg hover:shadow-xl transition-shadow border-green-100 dark:border-green-900/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-headline">
                    <func.icon className="mr-2 h-6 w-6 text-accent" />
                    {func.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 h-12">{func.description}</p>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                    <Link href={func.href}>Ir a {func.title.split(' ')[0]}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </main>
      <footer className="py-6 border-t mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Portal de Dirección.
        </div>
      </footer>
    </div>
  );
}
