
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, ShoppingCart, BookOpen } from 'lucide-react';
import Image from 'next/image';

interface Book {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  imageHint: string;
}

const booksPlaceholder: Book[] = [
  {
    id: "book1",
    title: "English Foundations: Level A1",
    description: "El libro base para iniciar tu aventura en el inglés. Cubre gramática esencial, vocabulario y ejercicios prácticos.",
    price: "Bs 120.00",
    imageUrl: "https://placehold.co/300x400.png",
    imageHint: "textbook english"
  },
  {
    id: "book2",
    title: "Conversational English: Speak with Confidence",
    description: "Desarrolla tus habilidades de conversación con diálogos, frases útiles y actividades interactivas.",
    price: "Bs 95.00",
    imageUrl: "https://placehold.co/300x400.png",
    imageHint: "conversation book"
  },
  {
    id: "book3",
    title: "Advanced Grammar & Writing Workshop",
    description: "Perfecciona tu gramática y escritura con este manual avanzado, ideal para preparación de exámenes.",
    price: "Bs 150.00",
    imageUrl: "https://placehold.co/300x400.png",
    imageHint: "grammar workbook"
  },
  {
    id: "book4",
    title: "Vocabulary Booster: Everyday English",
    description: "Amplía tu vocabulario con temas cotidianos, desde el trabajo hasta el ocio. Incluye glosario y ejercicios.",
    price: "Bs 80.00",
    imageUrl: "https://placehold.co/300x400.png",
    imageHint: "vocabulary builder"
  }
];

export default function AlumnoTiendaPage() {
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

        <div className="relative text-center mb-12 p-6 md:p-8 bg-card rounded-xl shadow-xl overflow-hidden border border-border">
          <div className="absolute inset-0 opacity-[0.03] pattern-[0.8rem_0.8rem_#000000_radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:opacity-[0.05] dark:pattern-[0.8rem_0.8rem_#ffffff_radial-gradient(circle_at_center,_var(--tw-gradient-stops))]"></div>
          <BookOpen className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
            Tienda de Libros Exclusivos
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Adquiere los materiales de estudio diseñados por First Class Institute para potenciar tu aprendizaje.
          </p>
        </div>
        
        {booksPlaceholder.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {booksPlaceholder.map(book => (
              <Card key={book.id} className="shadow-lg hover:shadow-xl transition-shadow flex flex-col bg-card">
                <CardHeader className="p-0 border-b">
                  <Image
                    src={book.imageUrl}
                    alt={book.title}
                    data-ai-hint={book.imageHint}
                    width={300}
                    height={400}
                    className="object-cover w-full h-64 md:h-80 rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-lg font-headline mb-2">{book.title}</CardTitle>
                  <CardDescription className="text-xs mb-3 flex-grow">{book.description}</CardDescription>
                  <p className="text-lg font-semibold text-primary mb-3">{book.price}</p>
                </CardContent>
                <CardFooter className="p-4 border-t">
                  <Button className="w-full font-semibold" disabled>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Añadir al Carrito
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-lg bg-card">
            <CardContent className="p-10 text-center">
              <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-xl font-semibold text-muted-foreground">La tienda está vacía por el momento.</p>
              <p className="text-sm text-muted-foreground">Vuelve pronto para descubrir nuestros materiales exclusivos.</p>
            </CardContent>
          </Card>
        )}
        
        <p className="text-xs text-muted-foreground mt-10 pt-6 text-center border-t border-dashed">
          (Funcionalidad de carrito de compras y pasarela de pago en desarrollo. Los libros son ejemplos.)
        </p>

      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Tienda de Libros.
        </div>
      </footer>
    </div>
  );
}
