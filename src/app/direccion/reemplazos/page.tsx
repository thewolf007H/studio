
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { ChevronLeft, Users, Save, CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const replacementSchema = z.object({
    docenteReemplaza: z.string().min(1, "Debes seleccionar un docente."),
    docenteReemplazado: z.string().min(1, "Debes seleccionar un docente."),
    nivelClase: z.string().min(1, "El nivel es requerido."),
    tipoClase: z.enum(['Regular', 'Acelerado', 'Sábados']),
    horarioClase: z.string().min(1, "El horario es requerido."),
    fecha: z.date({ required_error: "La fecha es requerida." }),
    informeAvance: z.string().optional(),
});

type ReplacementFormValues = z.infer<typeof replacementSchema>;

const teachersPlaceholder = [
    { id: 't1', name: 'Dr. David Lee' },
    { id: 't2', name: 'Laura Martínez' },
    { id: 't3', name: 'Carlos Gómez' },
    { id: 't4', name: 'Pamela Altamirano' },
];

const replacementsPlaceholder = [
    { id: 'r1', reemplaza: 'Pamela Altamirano', reemplazado: 'Dr. David Lee', nivel: 'Inglés Básico A', fecha: '2024-07-20' },
    { id: 'r2', reemplaza: 'Carlos Gómez', reemplazado: 'Laura Martínez', nivel: 'Inglés Intermedio B1', fecha: '2024-07-22' },
];


export default function ReemplazosPage() {
    const { toast } = useToast();
    const { register, handleSubmit, control, formState: { errors } } = useForm<ReplacementFormValues>({
        resolver: zodResolver(replacementSchema),
    });

    const onSubmit = (data: ReplacementFormValues) => {
        console.log(data);
        toast({
            title: "Asignación Exitosa (Simulación)",
            description: `Se ha asignado a ${data.docenteReemplaza} para reemplazar a ${data.docenteReemplazado}.`
        });
        // Here you would typically reset the form
    };

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
                    <Users className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
                        Reemplazos de Docentes
                    </h1>
                    <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
                        Asigna un profesor sustituto para una clase, registra la fecha y los detalles del avance.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <Card className="shadow-lg bg-card">
                        <CardHeader>
                            <CardTitle>Asignar Nuevo Reemplazo</CardTitle>
                            <CardDescription>Completa el formulario para registrar una nueva sustitución.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="docenteReemplaza">Docente que Reemplaza</Label>
                                        <Controller
                                            name="docenteReemplaza"
                                            control={control}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger><SelectValue placeholder="Seleccionar docente..." /></SelectTrigger>
                                                    <SelectContent>
                                                        {teachersPlaceholder.map(t => <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {errors.docenteReemplaza && <p className="text-xs text-destructive mt-1">{errors.docenteReemplaza.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="docenteReemplazado">Docente Reemplazado</Label>
                                         <Controller
                                            name="docenteReemplazado"
                                            control={control}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger><SelectValue placeholder="Seleccionar docente..." /></SelectTrigger>
                                                    <SelectContent>
                                                        {teachersPlaceholder.map(t => <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {errors.docenteReemplazado && <p className="text-xs text-destructive mt-1">{errors.docenteReemplazado.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="nivelClase">Nivel de la Clase</Label>
                                    <Input id="nivelClase" {...register('nivelClase')} placeholder="Ej: Inglés Intermedio B1"/>
                                    {errors.nivelClase && <p className="text-xs text-destructive mt-1">{errors.nivelClase.message}</p>}
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     <div>
                                        <Label htmlFor="tipoClase">Tipo de Clase</Label>
                                        <Controller
                                            name="tipoClase"
                                            control={control}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger><SelectValue placeholder="Seleccionar tipo..." /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Regular">Regular</SelectItem>
                                                        <SelectItem value="Acelerado">Acelerado</SelectItem>
                                                        <SelectItem value="Sábados">Sábados</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="horarioClase">Horario de la Clase</Label>
                                        <Input id="horarioClase" {...register('horarioClase')} placeholder="Ej: 16:15 - 17:30"/>
                                        {errors.horarioClase && <p className="text-xs text-destructive mt-1">{errors.horarioClase.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Label>Fecha del Reemplazo</Label>
                                     <Controller
                                        name="fecha"
                                        control={control}
                                        render={({ field }) => (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? format(field.value, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent>
                                        </Popover>
                                        )}
                                    />
                                    {errors.fecha && <p className="text-xs text-destructive mt-1">{errors.fecha.message}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="informeAvance">Informe de Avance (Opcional)</Label>
                                    <Textarea id="informeAvance" {...register('informeAvance')} placeholder="Detallar qué se avanzó en la clase de reemplazo..." />
                                </div>

                                <Button type="submit" className="w-full font-semibold">
                                    <Save className="mr-2 h-5 w-5"/>
                                    Asignar Docente Reemplazante
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg bg-card">
                        <CardHeader>
                            <CardTitle>Historial de Reemplazos</CardTitle>
                            <CardDescription>Últimas sustituciones registradas en el sistema.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="overflow-x-auto border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Reemplaza</TableHead>
                                            <TableHead>Reemplazado</TableHead>
                                            <TableHead>Nivel</TableHead>
                                            <TableHead>Fecha</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {replacementsPlaceholder.map(rep => (
                                            <TableRow key={rep.id}>
                                                <TableCell className="font-medium text-primary">{rep.reemplaza}</TableCell>
                                                <TableCell className="text-muted-foreground">{rep.reemplazado}</TableCell>
                                                <TableCell>{rep.nivel}</TableCell>
                                                <TableCell>{rep.fecha}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-dashed">
                                (Los datos y el guardado son de ejemplo.)
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <footer className="py-8 border-t mt-16 bg-card">
                <div className="container text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} First Class Institute. Gestión de Reemplazos.
                </div>
            </footer>
        </div>
    );
}

