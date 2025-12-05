import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reparacion-fotos-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reparacion-fotos-page.html',
  styleUrls: ['./reparacion-fotos-page.css']
})
export class ReparacionFotosPageComponent implements OnInit {
  vehiculoId: number | null = null;
  reparacionId: number | null = null;
  lineaId: number | null = null;

  // Hardcoded photos as requested
  fotos = [
    { id: 1, name: 'Filtro' },
    { id: 2, name: 'Filtro' },
    { id: 3, name: 'Filtro' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.vehiculoId = Number(this.route.snapshot.paramMap.get('vehiculoId'));
    this.reparacionId = Number(this.route.snapshot.paramMap.get('reparacionId'));
    this.lineaId = Number(this.route.snapshot.paramMap.get('lineaId'));
  }

  back(): void {
    if (this.vehiculoId && this.reparacionId) {
      this.router.navigate([`/vehiculos/${this.vehiculoId}/reparaciones/${this.reparacionId}`]);
    } else {
      this.router.navigate(['/home']);
    }
  }

  deleteFoto(index: number): void {
    if(confirm('¿Eliminar foto?')) {
      this.fotos.splice(index, 1);
    }
  }
}
