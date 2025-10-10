
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ChevronLeft, Archive, CalendarIcon, Save } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const formSchema = z.object({
  student: z.string().min(1, "Debes seleccionar un alumno."),
  level: z.string().min(1, "El nivel es requerido."),
  ending_date: z.date({ required_error: "La fecha es requerida." }),
  facilitator: z.string().min(1, "El nombre del facilitador es requerido."),
  admin_obs: z.string().optional(),
  attendance: z.coerce.number().min(0, "Debe ser >= 0").max(100, "Debe ser <= 100"),
  participation: z.coerce.number().min(0, "Debe ser >= 0").max(100, "Debe ser <= 100"),
  verbal_comm: z.coerce.number().min(0, "Debe ser >= 0").max(100, "Debe ser <= 100"),
  written_comm: z.coerce.number().min(0, "Debe ser >= 0").max(100, "Debe ser <= 100"),
  practice: z.coerce.number().min(0, "Debe ser >= 0").max(100, "Debe ser <= 100"),
  final_score: z.coerce.number().min(0, "Debe ser >= 0").max(100, "Debe ser <= 100"),
  pass: z.boolean().default(false),
  fail: z.boolean().default(false),
  general_obs: z.string().optional(),
}).refine(data => !(data.pass && data.fail), {
  message: "Solo una opción (Aprobado o Reprobado) puede ser marcada.",
  path: ["pass"],
});


const alumnosPlaceholder = [
    { id: "s1", nombre: "TERAN BORDA, DAYLIN ARLEN" },
    { id: "s2", nombre: "SALAZAR PARDO, JUAN VICTOR" },
    { id: "s3", nombre: "ARRIGA FLORES, EVELIN" },
];


export default function KardexPage() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            student: '',
            level: '',
            facilitator: '',
            admin_obs: '',
            attendance: 0,
            participation: 0,
            verbal_comm: 0,
            written_comm: 0,
            practice: 0,
            final_score: 0,
            pass: false,
            fail: false,
            general_obs: ''
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Datos de Evaluación Kardex:", values);
        toast({
            title: "Evaluación Guardada",
            description: `El Kardex del alumno ha sido guardado exitosamente.`,
        });
    }

    return (
        <div className="flex flex-col min-h-screen bg-secondary/20">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Button asChild variant="outline" size="sm" className="hover:bg-primary/10 transition-colors">
                        <Link href="/profesores">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Volver al Portal
                        </Link>
                    </Button>
                </div>

                <div className="relative text-center mb-12 p-6 md:p-8 bg-card rounded-xl shadow-xl overflow-hidden border border-border">
                    <div className="absolute inset-0 opacity-[0.03] pattern-[0.8rem_0.8rem_#000000_radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:opacity-[0.05] dark:pattern-[0.8rem_0.8rem_#ffffff_radial-gradient(circle_at_center,_var(--tw-gradient-stops))]"></div>
                    <Archive className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
                        Evaluación Final del Participante (Kardex)
                    </h1>
                    <p className="text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Registra los datos de la evaluación final para el historial del alumno.
                    </p>
                </div>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
                        <Card className="shadow-lg bg-card">
                            <CardHeader>
                                <CardTitle>Información General</CardTitle>
                                <CardDescription>Datos básicos de la evaluación.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                               <FormField control={form.control} name="student" render={({ field }) => (
                                    <FormItem><FormLabel>Alumno</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecciona un alumno..." /></SelectTrigger></FormControl>
                                        <SelectContent>{alumnosPlaceholder.map(a => <SelectItem key={a.id} value={a.nombre}>{a.nombre}</SelectItem>)}</SelectContent>
                                    </Select><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="level" render={({ field }) => (
                                    <FormItem><FormLabel>Nivel</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="facilitator" render={({ field }) => (
                                    <FormItem><FormLabel>Facilitador</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                               <FormField control={form.control} name="ending_date" render={({ field }) => (
                                    <FormItem className="flex flex-col pt-2"><FormLabel>Fecha de Finalización</FormLabel>
                                    <Popover><PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                            {field.value ? (format(field.value, "PPP", { locale: es })) : (<span>Selecciona una fecha</span>)}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent>
                                    </Popover><FormMessage /></FormItem>
                                )} />
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg bg-card">
                            <CardHeader>
                                <CardTitle>Calificaciones (0-100)</CardTitle>
                                <CardDescription>Introduce el puntaje para cada criterio.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                <FormField control={form.control} name="attendance" render={({ field }) => (
                                    <FormItem><FormLabel>Asistencia</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="participation" render={({ field }) => (
                                    <FormItem><FormLabel>Participación</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="verbal_comm" render={({ field }) => (
                                    <FormItem><FormLabel>Comunicación Verbal</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="written_comm" render={({ field }) => (
                                    <FormItem><FormLabel>Comunicación Escrita</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></Form_Item>
                                )} />
                                <FormField control={form.control} name="practice" render={({ field }) => (
                                    <FormItem><FormLabel>Práctica</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="final_score" render={({ field }) => (
                                    <FormItem><FormLabel>Total Final</FormLabel><FormControl><Input type="number" {...field} className="font-bold border-primary" /></FormControl><FormMessage /></FormItem>
                                )} />
                            </CardContent>
                        </Card>
                        
                         <Card className="shadow-lg bg-card">
                            <CardHeader>
                                <CardTitle>Observaciones y Estado Final</CardTitle>
                            </CardHeader>
                             <CardContent className="space-y-6">
                               <FormField control={form.control} name="admin_obs" render={({ field }) => (
                                    <FormItem><FormLabel>Observaciones Administrativas</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="general_obs" render={({ field }) => (
                                    <FormItem><FormLabel>Observaciones Generales</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="signature" render={({ field }) => (
                                     <FormItem>
                                        <FormLabel>Firma del Facilitador</FormLabel>
                                        <div className="w-full h-24 bg-secondary/40 rounded-md border-2 border-dashed flex items-center justify-center">
                                            <p className="text-muted-foreground text-sm">(Funcionalidad de firma digital en desarrollo)</p>
                                        </div>
                                     </FormItem>
                                )} />
                                <Separator />
                                <div className="flex items-center space-x-8">
                                    <FormField control={form.control} name="pass" render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl><Checkbox checked={field.value} onCheckedChange={(checked) => { field.onChange(checked); if(checked) form.setValue('fail', false); }} /></FormControl>
                                            <div className="space-y-1 leading-none"><FormLabel>Aprobado</FormLabel></div>
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="fail" render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl><Checkbox checked={field.value} onCheckedChange={(checked) => { field.onChange(checked); if(checked) form.setValue('pass', false); }} /></FormControl>
                                            <div className="space-y-1 leading-none"><FormLabel>Reprobado</FormLabel></div>
                                        </FormItem>
                                    )} />
                                </div>
                                <FormMessage>{form.formState.errors.pass?.message}</FormMessage>
                             </CardContent>
                        </Card>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" size="lg" className="font-semibold">
                                <Save className="mr-2 h-5 w-5" />
                                Guardar Evaluación
                            </Button>
                        </div>
                    </form>
                </Form>
                <p className="text-xs text-muted-foreground mt-8 text-center">
                    (El guardado de datos es una simulación. La integración con la base de datos está en desarrollo.)
                </p>
            </main>
            <footer className="py-8 border-t mt-16 bg-card">
                <div className="container text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} First Class Institute. Kardex del Alumno.
                </div>
            </footer>
        </div>
    );
}
