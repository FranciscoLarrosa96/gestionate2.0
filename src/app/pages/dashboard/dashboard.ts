import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../../shared/material-design.module';

interface VacacionesData {
  saldo: number;
}

interface DiasEstudioData {
  saldo: number;
}

interface HistorialVacaciones {
  periodo: string;
  dias: string;
}

interface Formulario {
  nombre: string;
}

interface HistorialEstudio {
  mensaje: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MaterialDesignModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  
  // Datos mockeados basados en la imagen
  vacacionesData: VacacionesData = {
    saldo: 19
  };

  diasEstudioData: DiasEstudioData = {
    saldo: 20
  };

  historialesVacaciones: HistorialVacaciones[] = [
    { periodo: '2025-01-02', dias: '14 días' }
  ];

  formularios: Formulario[] = [
    { nombre: 'Denuncia a Domicilio' },
    { nombre: 'Solicitud licencia' },
    { nombre: 'Horas extras feriado' },
    { nombre: 'Horas extras' },
    { nombre: 'Vacaciones' },
    { nombre: 'Autorización Descuento TC' }
  ];

  historialEstudio: HistorialEstudio = {
    mensaje: '--No se encontraron días de estudio--'
  };

}
