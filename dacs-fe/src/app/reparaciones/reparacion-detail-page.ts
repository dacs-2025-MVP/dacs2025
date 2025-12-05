import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../core/services/api-service';

@Component({
  selector: 'app-reparacion-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reparacion-detail-page.html',
  styleUrls: ['./reparacion-detail-page.css']
})
export class ReparacionDetailPageComponent implements OnInit {
  vehiculoId: number | null = null;
  reparacionId: number | null = null;
  reparacion: any = null;
  loading = false;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const vid = this.route.snapshot.paramMap.get('vehiculoId');
    const rid = this.route.snapshot.paramMap.get('id');
    this.vehiculoId = vid ? Number(vid) : null;
    this.reparacionId = rid ? Number(rid) : null;
    if (this.reparacionId) this.loadReparacion(this.reparacionId);
  }

  loadReparacion(id: number): void {
    this.loading = true;
    this.api.getReparacionById(id).subscribe({
      next: (resp) => {
        this.reparacion = resp?.data || resp;
        // Las lineas vienen dentro de la reparacion
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  back(): void { if (this.vehiculoId) this.router.navigate([`/vehiculos/${this.vehiculoId}/reparaciones`]); }
}
