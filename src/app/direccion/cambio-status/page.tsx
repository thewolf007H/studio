
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, Replace, Edit, UserPlus, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const tarifasData = {
  "REGULAR": {
    "KAPPA": { "código": "K", "precio": 450 },
    "ZETA": { "código": "Z", "precio": 350 },
    "ALFA": { "código": "A", "precio": 300 },
    "EPSILON": { "código": "E", "precio": 250 },
    "FLI": { "código": "FLI", "precio": 12600, "precio_descuento": 11000 },
    "OMEGA": { "precio": 0 }
  },
  "ACELERADO": {
    "KAPPA": { "código": "K", "precio": 900 },
    "ZETA": { "código": "Z", "precio": 700 },
    "ALFA": { "código": "A", "precio": 600 },
    "EPSILON": { "código": "E", "precio": 500 },
    "FLI": { "código": "FLI", "precio": 12600, "precio_descuento": 11000 },
    "OMEGA": { "precio": 0 }
  },
  "ESPECIALES": {
    "SPEAKING": { "precio": 125 },
    "PERSONALIZADO": { "precio": 1250 }
  }
};


export default function DireccionCambioStatusPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button asChild variant="outline" size="sm" className="hover:bg-primary/10 transition-colors">
            <Link href="/direccion">
              <ChevronLeft className="mr-2 h-4 w-4"/>
              Volver al Portal de Dirección
            </Link>
          </Button>
        </div>

        <div className="relative text-center mb-12 p-6 md:p-8 bg-card rounded-xl shadow-xl overflow-hidden border border-border">
          <div className="absolute inset-0 opacity-[0.03] pattern-[0.8rem_0.8rem_#000000_radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:opacity-[0.05] dark:pattern-[0.8rem_0.8rem_#ffffff_radial-gradient(circle_at_center,_var(--tw-gradient-stops))]"></div>
          <Replace className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
            Cambio de Status (Tarifas)
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Visualiza, asigna y gestiona las tarifas de las diferentes modalidades y cursos de la institución.
          </p>
        </div>
        
        <div className='flex justify-end gap-2 mb-6'>
            <Button disabled><UserPlus className="mr-2 h-4 w-4"/>Asignar Tarifa a Alumno</Button>
            <Button variant="outline" disabled><Edit className="mr-2 h-4 w-4"/>Crear/Editar Tarifas</Button>
        </div>

        <div className="space-y-8">
            {Object.entries(tarifasData).map(([modalidad, tarifas]) => (
                <Card key={modalidad} className="shadow-lg bg-card">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline flex items-center">
                            <Tag className="mr-3 h-6 w-6 text-accent"/>
                            Modalidad: <span className="text-primary ml-2">{modalidad}</span>
                        </CardTitle>
                        <CardDescription>Tarifas y precios para la modalidad {modalidad.toLowerCase()}.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(tarifas).map(([nivel, detalles]) => (
                            <Card key={nivel} className='bg-secondary/30'>
                                <CardHeader className='p-4'>
                                    <CardTitle className='text-lg'>{nivel}</CardTitle>
                                    {detalles.código && <CardDescription>Código: {detalles.código}</CardDescription>}
                                </CardHeader>
                                <Separator />
                                <CardContent className='p-4 space-y-2'>
                                     <div className="flex justify-between items-baseline">
                                        <span className="text-muted-foreground">Precio:</span>
                                        <span className={`text-xl font-bold ${detalles.precio_descuento ? 'line-through text-muted-foreground' : 'text-primary'}`}>
                                            Bs {detalles.precio.toFixed(2)}
                                        </span>
                                    </div>
                                    {detalles.precio_descuento && (
                                         <div className="flex justify-between items-baseline">
                                            <span className="text-muted-foreground">Con Descuento:</span>
                                            <span className="text-2xl font-bold text-green-600">Bs {detalles.precio_descuento.toFixed(2)}</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
        
        <p className="text-xs text-muted-foreground mt-8 pt-4 text-center border-t border-dashed">
            (La asignación y edición de tarifas son funcionalidades en desarrollo.)
        </p>

      </main>
      <footer className="py-8 border-t mt-16 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} First Class Institute. Gestión de Tarifas.
        </div>
      </footer>
    </div>
  );
}
