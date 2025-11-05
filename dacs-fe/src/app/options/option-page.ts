import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { KeycloakService } from '../core/services/keycloak.service';

@Component({
  selector: 'app-option-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './option-page.html',
  styleUrls: ['./option-page.css']
})
export class OptionPageComponent {
  title = 'Opción';

  constructor(private route: ActivatedRoute, public keycloak: KeycloakService) {
    const dataTitle = this.route.snapshot.data?.['title'];
    if (dataTitle) {
      this.title = dataTitle;
    } else if (this.route.snapshot.routeConfig?.path) {
      // capitalize
      this.title = this.route.snapshot.routeConfig.path.charAt(0).toUpperCase() + this.route.snapshot.routeConfig.path.slice(1);
    }
  }

  login(): void {
    this.keycloak.login();
  }
}
