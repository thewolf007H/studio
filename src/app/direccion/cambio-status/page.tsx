
'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, Replace, Edit, UserPlus, Tag, Search, User, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

const studentPlaceholder = {
    id: "a1",
    nombre: "Javier Sánchez Gómez",
    ci: "9876543 LP",
    statusActual: "REGULAR - ZETA",
};


export default function DireccionCambioStatusPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [foundStudent, setFoundStudent] = useState<typeof studentPlaceholder | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const flatTarifas = useMemo(() => {
    return Object.entries(tarifasData).flatMap(([modalidad, tarifas]) => 
      Object.keys(tarifas).map(nivel => `${modalidad} - ${nivel}`)
    );
  }, []);

  const handleSearch = () => {
    if(searchTerm) {
      setFoundStudent(studentPlaceholder);
    } else {
      setFoundStudent(null);
      toast({
        title: "Búsqueda vacía",
        description: "Por favor, introduce un término de búsqueda.",
        variant: "destructive"
      });
    }
  };

  const handleAssignStatus = () => {
    if(!foundStudent || !selectedStatus) {
      toast({
        title: "Error",
        description: "Debes buscar un alumno y seleccionar un nuevo status.",
        variant: "destructive"
      });
      return;
    }

    console.log(`Asignando status ${selectedStatus} a ${foundStudent.nombre}`);
    toast({
      title: "Status Asignado Exitosamente (Simulación)",
      description: `${foundStudent.nombre} ahora tiene el status ${selectedStatus}.`
    });

    // Reset and close dialog
    setFoundStudent(null);
    setSearchTerm('');
    setSelectedStatus('');
    setIsDialogOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      // Reset state when closing dialog
      setFoundStudent(null);
      setSearchTerm('');
      setSelectedStatus('');
    }
  }


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
            <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button><UserPlus className="mr-2 h-4 w-4"/>Asignar Tarifa a Alumno</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg bg-card">
                  <DialogHeader>
                      <DialogTitle>Asignar Tarifa a Alumno</DialogTitle>
                      <DialogDescription>Busca un estudiante para asignarle una nueva tarifa.</DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="search-student">Paso 1: Buscar Estudiante</Label>
                      <div className="flex gap-2">
                        <Input 
                            id="search-student"
                            placeholder="Buscar por nombre o CI..." 
                            className="bg-background"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button onClick={handleSearch}><Search className="h-4 w-4"/></Button>
                      </div>
                    </div>

                    {foundStudent && (
                      <div className="space-y-4 pt-4 border-t animate-in fade-in-50">
                        <div className="p-4 border rounded-lg bg-secondary/30">
                            <p className="text-lg font-semibold flex items-center"><User className="mr-2 h-5 w-5"/>{foundStudent.nombre}</p>
                            <p className="text-sm text-muted-foreground">CI: {foundStudent.ci}</p>
                            <p className="text-sm text-muted-foreground">Status Actual: <span className="font-semibold text-primary">{foundStudent.statusActual}</span></p>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="status-select">Paso 2: Seleccionar Nueva Tarifa</Label>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger id="status-select">
                                    <SelectValue placeholder="Elige una tarifa para asignar..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {flatTarifas.map(status => (
                                        <SelectItem key={status} value={status}>{status}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                      <Button type="submit" onClick={handleAssignStatus} disabled={!foundStudent || !selectedStatus}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Confirmar Asignación
                      </Button>
                  </DialogFooter>
              </DialogContent>
            </Dialog>

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
