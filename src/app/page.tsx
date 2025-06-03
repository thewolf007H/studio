import { Header } from '@/components/layout/header';
import { CourseInfoSection } from '@/components/course/course-info-section';
import { CalendarSection } from '@/components/calendar/calendar-section';
import { QuizSection } from '@/components/quiz/quiz-section';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
            Bienvenido a <span className="text-primary">LinguaMeet</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tu plataforma interactiva para aprender inglés, potenciada por inteligencia artificial. Explora cursos, organiza tu aprendizaje y ponte a prueba.
          </p>
        </div>
        
        <CourseInfoSection />
        
        <Separator className="my-12" />
        
        <CalendarSection />
        
        <Separator className="my-12" />
        
        <QuizSection />
      </main>
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LinguaMeet. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
