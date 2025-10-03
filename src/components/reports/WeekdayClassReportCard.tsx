
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Tema {
  tema?: string;
  pagina: number;
}

export type ClaseTipo = 'normal' | 'personalizada' | 'acelerada' | 'virtual' | 'hibrida';
export type ClasesPorDia = { [key in ClaseTipo]?: number };

export interface WeekdayClassReportData {
  tipo_documento: string;
  facilitador: string;
  nivel: string;
  modalidad: string;
  horario: string;
  fecha_inicio: string;
  fecha_fin: string;
  mes: string;
  estructura_semanal: {
    lunes: Tema[];
    martes: Tema[];
    miércoles: Tema[];
    jueves: Tema[];
    viernes: Tema[];
  };
  observaciones: string;
  clases_impartidas: {
    lunes: ClasesPorDia;
    martes: ClasesPorDia;
    miércoles: ClasesPorDia;
    jueves: ClasesPorDia;
    viernes: ClasesPorDia;
  };
}

interface WeekdayClassReportCardProps {
    data: WeekdayClassReportData;
}

const dias = ["lunes", "martes", "miércoles", "jueves", "viernes"] as const;

export function WeekdayClassReportCard({ data }: WeekdayClassReportCardProps) {
    const maxRows = Math.max(...dias.map(dia => data.estructura_semanal[dia].length));

    const totalClasesMes = dias.reduce((total, dia) => {
        const clasesDelDia = data.clases_impartidas[dia];
        const sumaDia = Object.values(clasesDelDia).reduce((acc, count) => acc + (count || 0), 0);
        return total + sumaDia;
    }, 0);

    return (
        <Card className="w-full mx-auto shadow-lg border-primary/10 bg-card font-sans text-sm">
            <CardHeader className="p-4">
                 <div className="flex justify-between items-start">
                    <div>
                        <p className="font-bold text-lg text-primary">{data.tipo_documento}</p>
                        <p className="text-xs text-muted-foreground">Mes: {data.mes}</p>
                    </div>
                </div>
            </CardHeader>
            <Separator/>
            <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs border rounded-lg p-3 bg-secondary/20">
                    <p><span className="font-semibold text-muted-foreground">Facilitador:</span><br/> {data.facilitador}</p>
                    <p><span className="font-semibold text-muted-foreground">Nivel:</span><br/> {data.nivel}</p>
                    <p><span className="font-semibold text-muted-foreground">Modalidad:</span><br/> {data.modalidad}</p>
                    <p><span className="font-semibold text-muted-foreground">Horario:</span><br/> {data.horario}</p>
                    <p><span className="font-semibold text-muted-foreground">Fecha Inicio:</span><br/> {data.fecha_inicio}</p>
                    <p><span className="font-semibold text-muted-foreground">Fecha Fin:</span><br/> {data.fecha_fin}</p>
                </div>
                
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {dias.map(dia => (
                                    <TableHead key={dia} className="capitalize text-center font-bold">{dia}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: maxRows }).map((_, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {dias.map(dia => {
                                        const item = data.estructura_semanal[dia][rowIndex];
                                        return (
                                            <TableCell key={dia} className="text-center p-2 align-top">
                                                {item ? (
                                                    <div className="flex flex-col items-center justify-center p-1 border rounded-md bg-background min-h-[50px]">
                                                        {item.tema && <span className="text-xs font-semibold">{item.tema}</span>}
                                                        <Badge variant="outline">p. {item.pagina}</Badge>
                                                    </div>
                                                ) : (
                                                    <div className="min-h-[50px]"></div>
                                                )}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
             <Separator/>
             <CardFooter className="p-4">
                <div className="w-full space-y-4">
                     <div>
                        <h4 className="font-semibold mb-2">Clases Impartidas por Día</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center">
                            {dias.map(dia => (
                                <div key={dia} className="p-2 bg-secondary/30 rounded-md">
                                    <p className="text-sm capitalize font-bold text-muted-foreground">{dia}</p>
                                    <Separator className="my-1"/>
                                    <div className="text-left text-xs space-y-1 mt-2">
                                        {Object.entries(data.clases_impartidas[dia]).length > 0 ? (
                                            Object.entries(data.clases_impartidas[dia]).map(([tipo, cantidad]) => (
                                                <div key={tipo} className="flex justify-between">
                                                    <span className="capitalize">{tipo}:</span>
                                                    <span className="font-bold text-primary">{cantidad}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-muted-foreground italic">Sin clases</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                     </div>
                     <div className="flex justify-end">
                        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                            <p className="text-sm font-semibold text-primary">Total Clases del Mes</p>
                            <p className="text-2xl font-bold text-primary text-center">{totalClasesMes}</p>
                        </div>
                     </div>
                </div>
             </CardFooter>
        </Card>
    )
}
