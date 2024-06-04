import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {  } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  code = new FormControl<string>('', Validators.required);
  hide = true;

  constructor(private router: Router, private loginService: LoginService) {}

  toggleVisibility(): void {
    this.hide = !this.hide;
  }

  login() {
    this.code.markAllAsTouched()
    if (this.code.invalid) {
      return
    }
    this.loginService.login(this.code.value!).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/votos');
      }, error: (res) => {
        Swal.fire('Error!', res.error.message, 'error');
      }
    });
  }
}
