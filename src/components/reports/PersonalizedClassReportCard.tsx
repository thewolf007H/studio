
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface SesionPersonalizada {
  id: number;
  estudiante: string;
  fecha: string;
  dia: string;
  horas: number;
  informe_avance: string;
}

export interface PersonalizedClassReportData {
  tipo_documento: string;
  facilitador: string;
  mes: string;
  gestion: string;
  sesiones: SesionPersonalizada[];
  observaciones_generales: string;
}

interface PersonalizedClassReportCardProps {
    data: PersonalizedClassReportData;
}

export function PersonalizedClassReportCard({ data }: PersonalizedClassReportCardProps) {
    const totalHorasMes = data.sesiones.reduce((acc, sesion) => acc + sesion.horas, 0);

    return (
        <Card className="w-full mx-auto shadow-lg border-primary/10 bg-card font-sans text-sm">
            <CardHeader className="p-4">
                 <div className="flex justify-between items-start">
                    <div>
                        <p className="font-bold text-lg text-primary">{data.tipo_documento}</p>
                        <p className="text-xs text-muted-foreground">Mes: {data.mes} / Gestión: {data.gestion}</p>
                    </div>
                     <p className="text-right text-xs"><span className="font-semibold text-muted-foreground">Facilitador:</span><br/> {data.facilitador}</p>
                </div>
            </CardHeader>
            <Separator/>
            <CardContent className="p-4 space-y-4">
                
                <h3 className="text-base font-semibold">Historial de Sesiones</h3>
                <ScrollArea className="h-72 w-full border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-bold">Estudiante</TableHead>
                                <TableHead className="font-bold">Fecha</TableHead>
                                <TableHead className="font-bold">Día</TableHead>
                                <TableHead className="text-center font-bold">Horas</TableHead>
                                <TableHead className="font-bold">Informe de Avance</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.sesiones.length > 0 ? data.sesiones.map((sesion) => (
                                <TableRow key={sesion.id}>
                                    <TableCell className="font-medium">{sesion.estudiante}</TableCell>
                                    <TableCell>{sesion.fecha}</TableCell>
                                    <TableCell>{sesion.dia}</TableCell>
                                    <TableCell className="text-center font-semibold">{sesion.horas}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground">{sesion.informe_avance}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                                        No hay sesiones registradas para este mes.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </ScrollArea>
                 {data.observaciones_generales && (
                    <div>
                        <h4 className="font-semibold text-xs text-muted-foreground">Observaciones Generales:</h4>
                        <p className="text-xs p-2 border rounded-md bg-secondary/20 mt-1"><i>"{data.observaciones_generales}"</i></p>
                    </div>
                )}
            </CardContent>
             <Separator/>
             <CardFooter className="p-4 flex justify-end">
                 <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 text-center">
                    <p className="text-sm font-semibold text-primary">Total Horas Registradas</p>
                    <p className="text-2xl font-bold text-primary">{totalHorasMes.toFixed(1)}</p>
                </div>
             </CardFooter>
        </Card>
    )
}
