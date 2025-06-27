'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { defineWord, type DefineWordOutput } from '@/ai/flows/define-word';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, Book } from 'lucide-react';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

// Placeholder content for different units
const courseContent: Record<string, { title: string, content: JSX.Element }> = {
  'introduccion-y-saludos': {
    title: 'Unidad 1: Introducción y Saludos',
    content: (
      <div className="space-y-4">
        <p>Welcome to your first English lesson! Today, we will learn some basic greetings and introductions. These phrases are fundamental for starting any conversation.</p>
        <p>Let's start with greetings. "Hello" is a universal greeting you can use at any time. "Hi" is a more informal version. In the morning, you can say "Good morning." In the afternoon, "Good afternoon," and in the evening, "Good evening." When you leave, you say "Goodbye."</p>
        <p>Now, let's practice introductions. To introduce yourself, you can say, "My name is [Your Name]." or "I am [Your Name]." To ask someone their name, you say, "What is your name?" It's polite to respond with, "Nice to meet you." after an introduction. This simple phrase helps to build a friendly connection.</p>
        <p>Another important expression is asking how someone is doing. You can ask, "How are you?" Common responses include "I'm fine, thank you," or "I'm doing well, thanks." It is courteous to ask back, "And you?"</p>
      </div>
    ),
  },
   'presente-simple': {
    title: 'Unidad 3: Presente Simple',
    content: (
       <div className="space-y-4">
        <p>The Present Simple tense is one of the most important tenses in English. We use it to talk about routines, habits, facts, and general truths. The structure is quite straightforward for most verbs.</p>
        <p>For affirmative sentences with I, you, we, and they, you use the base form of the verb. For example: "I work in an office," or "They play football every weekend." However, for he, she, and it, you need to add an -s to the verb. For instance, "She works from home," and "He plays the guitar."</p>
        <p>For negative sentences, we use the auxiliary verb "do not" (don't) or "does not" (doesn't). Use "don't" with I, you, we, they. For example: "We don't live in the city." Use "doesn't" with he, she, it, and remember to use the base form of the main verb. Example: "It doesn't rain much in summer."</p>
        <p>To ask a question, you start with "Do" or "Does". For example: "Do you like classical music?" or "Does he speak French?" The word order is crucial for forming correct questions. Practice these forms to master them.</p>
      </div>
    ),
  },
  'preposiciones-lugar': {
    title: 'Unidad 5: Preposiciones de Lugar',
    content: (
      <div className="space-y-4">
        <p>Prepositions of place help us describe where something is located. The most common prepositions are "in," "on," and "at." Understanding the difference is essential for clear communication.</p>
        <p>We use "in" for enclosed spaces or larger areas. For example: "The keys are in my pocket." or "I live in London." It signifies that something is inside something else.</p>
        <p>We use "on" for surfaces. For example: "The book is on the table." or "There is a picture on the wall." The object is touching the surface.</p>
        <p>We use "at" for specific points or locations. For example: "Let's meet at the bus stop." or "She is waiting at the entrance." It refers to a precise place. This distinction is sometimes tricky, but with practice, it becomes natural.</p>
      </div>
    ),
  },
};

export default function MaterialViewerPage({ params }: { params: { slug: string } }) {
  const [selectedText, setSelectedText] = useState('');
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0, display: 'none' });
  const [definition, setDefinition] = useState<DefineWordOutput | null>(null);
  const [isDefining, setIsDefining] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const unitData = courseContent[params.slug] || { title: 'Material no encontrado', content: <p>El contenido para esta unidad no está disponible. Por favor, vuelve a intentarlo.</p> };

  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim() || '';

    if (text.length > 2 && text.length < 20 && !text.includes(' ')) {
      const range = selection?.getRangeAt(0);
      if (range) {
        const rect = range.getBoundingClientRect();
        setSelectedText(text);
        setPopoverPosition({
          top: rect.top + window.scrollY - 40,
          left: rect.left + window.scrollX + (rect.width / 2) - 25,
          display: 'block',
        });
      }
    } else {
      setPopoverPosition({ top: 0, left: 0, display: 'none' });
    }
  }, []);

  useEffect(() => {
    const contentElement = contentRef.current;
    document.addEventListener('click', () => setPopoverPosition({ top: 0, left: 0, display: 'none' }));

    if (contentElement) {
      contentElement.addEventListener('mouseup', (e) => {
        e.stopPropagation();
        handleSelection();
      });
    }

    return () => {
        document.removeEventListener('click', () => setPopoverPosition({ top: 0, left: 0, display: 'none' }));
        if(contentElement) {
            contentElement.removeEventListener('mouseup', (e) => {
                e.stopPropagation();
                handleSelection();
            });
        }
    };
  }, [handleSelection]);
  
  const handleDefineClick = async () => {
    if (!selectedText) return;
    setIsDefining(true);
    setPopoverPosition({ top: 0, left: 0, display: 'none' });
    
    try {
        const result = await defineWord({ word: selectedText });
        setDefinition(result);
        setIsDialogOpen(true);
    } catch(e) {
        console.error("Error defining word: ", e);
        toast({
            title: "Error de Diccionario",
            description: "No se pudo obtener la definición. Inténtalo de nuevo.",
            variant: "destructive"
        })
    } finally {
        setIsDefining(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
          <div className="container flex h-16 items-center justify-between">
            <Button asChild variant="outline" size="sm" className="hover:bg-primary/10 transition-colors">
                <Link href="/alumnos/aula-virtual">
                <ChevronLeft className="mr-2 h-4 w-4"/>
                Volver al Aula Virtual
                </Link>
            </Button>
            <div className="text-xl font-bold font-headline text-primary">
                First Class Institute
            </div>
          </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto shadow-xl bg-card">
            <CardHeader>
                <CardTitle className="text-3xl font-headline flex items-center">
                    <Book className="mr-3 h-8 w-8 text-primary" />
                    {unitData.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div 
                    ref={contentRef}
                    className="text-lg max-w-none text-foreground leading-relaxed selection:bg-accent/50"
                >
                    {unitData.content}
                </div>
            </CardContent>
        </Card>
        
        {popoverPosition.display === 'block' && (
            <div
                style={{ top: `${popoverPosition.top}px`, left: `${popoverPosition.left}px` }}
                className="absolute z-50"
                 onClick={(e) => e.stopPropagation()}
            >
                <Button onClick={handleDefineClick} size="sm" className="shadow-lg animate-in fade-in zoom-in-95">
                    {isDefining ? "Buscando..." : "Definir"}
                </Button>
            </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-md bg-card">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-headline capitalize">{selectedText}</DialogTitle>
                </DialogHeader>
                {definition && (
                    <div className="py-4 space-y-3">
                        <div>
                            <h4 className="font-semibold text-primary">Definición:</h4>
                            <p className="text-muted-foreground">{definition.definition}</p>
                        </div>
                        <div>
                           <h4 className="font-semibold text-primary">Ejemplo:</h4>
                            <p className="italic text-muted-foreground">"{definition.example}"</p>
                        </div>
                    </div>
                )}
                 <p className="text-xs text-muted-foreground mt-4 text-center border-t pt-3">
                    Definición generada por IA. La función de resaltado permanente está en desarrollo.
                 </p>
            </DialogContent>
        </Dialog>
        
      </main>
       <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Libro Virtual del Alumno.
        </div>
      </footer>
    </div>
  );
}
