import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor,NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticationUserRequest} from '../../api/auth-api/interfaces';
import { AuthApiService } from '../../api/auth-api/auth-api.service';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [NgIf,NgFor,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authRequest: AuthenticationUserRequest = {
    username: '',
    password: ''
  }

  authorities = ""

  // Variable to errors

  loginError = ""

  // Injection of FormBuilder to Validations

  formBuilder = inject(FormBuilder)

  // Injection of Router

  router = inject(Router)

  // Injection of CustomerApiService
  authApiService = inject(AuthApiService)

  // FormBuilder of LoginForm

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  get username(){
    return this.loginForm.get('username')
  }

  get password(){
    return this.loginForm.get('password')
  }

  isLoading = false;

  goBack(){
    this.router.navigate(['/']);
  }

  login() {
    if(this.loginForm.valid){
      this.loginError="";
      this.authRequest.username = this.loginForm.controls.username.value as string
      this.authRequest.password = this.loginForm.controls.password.value as string
      this.authApiService.login(this.authRequest).subscribe({
        error : (errorData: any) => {
          console.error(errorData);
          this.loginError="Credenciales invalidas";
        },
        complete: async () => {
          console.info("Login completo")
          this.authorities = await this.authApiService.getUserRole() as string
          console.log(this.authorities)
          if(this.authorities == '[ROLE_CUSTOMER]'){
            this.router.navigateByUrl('/profile-customer').then(() => {
              window.location.reload();
            });
            this.loginForm.reset();
          }
          if(this.authorities == '[ROLE_DEVELOPER]'){
            this.router.navigateByUrl('/profile-freelancer').then(() => {
              window.location.reload();
            });
            this.loginForm.reset();
          }
        }
      });
    }else{
      this.loginForm.markAllAsTouched();
      alert("Error de ingreso de datos")
    }
  }
}
