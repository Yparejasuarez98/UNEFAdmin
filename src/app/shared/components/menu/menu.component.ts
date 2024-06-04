import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private router: Router) {

  }

  redirect() {
    this.router.navigateByUrl('/votos');
  }

  redirectCompany() {
    this.router.navigateByUrl('votos');
  }

  redirectResults() {
    this.router.navigateByUrl('votaciones');
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
