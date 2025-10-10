
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ChevronLeft, Archive, Search, Printer, Download, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface KardexData {
  studentName: string;
  level: string;
  ending_date: string;
  facilitator: string;
  admin_obs?: string;
  attendance: number;
  participation: number;
  verbal_comm: number;
  written_comm: number;
  practice: number;
  final_score: number;
  pass: boolean;
  fail: boolean;
  general_obs?: string;
}

const kardexPlaceholder: KardexData = {
  studentName: 'TERAN BORDA, DAYLIN ARLEN',
  level: 'EF 4B',
  ending_date: '2024-07-26',
  facilitator: 'ROGER URRUTIA',
  admin_obs: 'La estudiante completó todos los pagos a tiempo.',
  attendance: 95,
  participation: 90,
  verbal_comm: 88,
  written_comm: 92,
  practice: 85,
  final_score: 90,
  pass: true,
  fail: false,
  general_obs: 'Excelente progreso durante el curso. Daylin muestra gran interés y habilidad para el idioma. Se recomienda continuar al siguiente nivel para seguir desarrollando su fluidez y precisión gramatical.',
};


export default function SupervisionKardexPage() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [foundKardex, setFoundKardex] = useState<KardexData | null>(null);

    const handleSearch = () => {
        if(searchTerm) {
            setFoundKardex(kardexPlaceholder);
        } else {
            toast({
                title: "Búsqueda vacía",
                description: "Por favor, introduce un término de búsqueda.",
                variant: "destructive"
            });
            setFoundKardex(null);
        }
    };
    
    const ScoreItem = ({ label, value }: { label: string, value: number }) => (
        <div className="flex justify-between items-center p-2 bg-secondary/20 rounded-md">
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
            <Badge variant="secondary" className="text-base">{value}</Badge>
        </div>
    );

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
                    <Archive className="mx-auto mb-4 h-14 w-14 md:h-16 md:w-16 text-primary" />
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3 text-primary">
                        Supervisión de Kardex
                    </h1>
                    <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
                        Busca y consulta las evaluaciones finales (Kardex) de los estudiantes.
                    </p>
                </div>

                <Card className="max-w-4xl mx-auto shadow-lg bg-card mb-8">
                    <CardHeader>
                        <CardTitle>Buscar Kardex de Estudiante</CardTitle>
                        <CardDescription>Busca por nombre, apellido o CI del estudiante para ver su historial.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-2">
                        <Input 
                            placeholder="Buscar estudiante..." 
                            className="bg-background"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button onClick={handleSearch}><Search className="mr-2 h-4 w-4"/>Buscar</Button>
                    </CardContent>
                </Card>

                {foundKardex && (
                    <Card className="max-w-4xl mx-auto shadow-xl bg-card animate-in fade-in-50">
                        <CardHeader className="flex flex-row justify-between items-start">
                            <div>
                                <CardTitle className="text-2xl font-headline text-primary">{foundKardex.studentName}</CardTitle>
                                <CardDescription>Mostrando la evaluación final para el nivel: {foundKardex.level}</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" disabled><Printer className="mr-2 h-4 w-4"/>Imprimir</Button>
                                <Button disabled><Download className="mr-2 h-4 w-4"/>Descargar PDF</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <p><span className="font-semibold text-muted-foreground">Facilitador:</span> {foundKardex.facilitator}</p>
                                <p><span className="font-semibold text-muted-foreground">Nivel:</span> {foundKardex.level}</p>
                                <p><span className="font-semibold text-muted-foreground">Fecha Finalización:</span> {foundKardex.ending_date}</p>
                            </div>
                            
                            <Separator />

                             <div>
                                <h3 className="text-lg font-semibold mb-3">Calificaciones de Criterios (0-100)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   <div className="space-y-2">
                                        <ScoreItem label="Asistencia" value={foundKardex.attendance} />
                                        <ScoreItem label="Participación" value={foundKardex.participation} />
                                        <ScoreItem label="Comunicación Verbal" value={foundKardex.verbal_comm} />
                                        <ScoreItem label="Comunicación Escrita" value={foundKardex.written_comm} />
                                        <ScoreItem label="Práctica" value={foundKardex.practice} />
                                   </div>
                                   <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                                        <p className="text-sm font-bold text-primary">TOTAL FINAL</p>
                                        <p className="text-5xl font-bold text-primary">{foundKardex.final_score}</p>
                                        {foundKardex.pass ? (
                                            <Badge className="bg-green-500 text-white"><CheckCircle className="mr-1 h-3 w-3"/> APROBADO</Badge>
                                        ) : (
                                            <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3"/> REPROBADO</Badge>
                                        )}
                                   </div>
                                </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="space-y-4">
                                {foundKardex.general_obs && (
                                    <div>
                                        <h4 className="font-semibold">Observaciones Generales del Facilitador:</h4>
                                        <p className="text-sm text-muted-foreground p-3 border rounded-md bg-secondary/20 mt-1"><i>"{foundKardex.general_obs}"</i></p>
                                    </div>
                                )}
                                {foundKardex.admin_obs && (
                                    <div>
                                        <h4 className="font-semibold">Observaciones Administrativas:</h4>
                                        <p className="text-sm text-muted-foreground p-3 border rounded-md bg-secondary/20 mt-1"><i>"{foundKardex.admin_obs}"</i></p>
                                    </div>
                                )}
                            </div>

                        </CardContent>
                         <CardContent>
                             <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-dashed">
                                (Los datos y la búsqueda son de ejemplo. La funcionalidad completa se conectará a la base de datos.)
                            </p>
                        </CardContent>
                    </Card>
                )}
            </main>
            <footer className="py-8 border-t mt-16 bg-card">
                <div className="container text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} First Class Institute. Supervisión de Kardex.
                </div>
            </footer>
        </div>
    );
}
