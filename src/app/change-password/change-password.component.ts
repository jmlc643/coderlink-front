import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { ChangePasswordRequest } from '../../api/auth-api/interfaces';
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit{
  //Se muestra si hay algun error
  formError:String="";

  //Inyeccion Servicios
  authApiService = inject(AuthApiService);

  //Validaciones del formulario
  formBuilder = inject(FormBuilder)

  //Inyeccion routers
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute);

  //Validaciones de angular
  resetPassForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordR: ['', [Validators.required, Validators.minLength(8)]]
  });

  changePassword : ChangePasswordRequest = {
    password: '',
    confirmationPassword: '',
    token: ''
  }

  ngOnInit(): void {
    //Recibe el parametro del id enrutado y lo guarda en una variable
    this.activatedRoute.params.subscribe( () => {
      this.changePassword.token = this.activatedRoute.snapshot.params['token'];
    })
  }

  //Para acceder mas facil a los control name
  get password() {
    return this.resetPassForm.get('password');
  }

  get passwordR() {
    return this.resetPassForm.get('passwordR');
  }

  resetPass(){
    if(this.resetPassForm.valid){
      this.changePassword.password = this.resetPassForm.controls.password.value as string
      this.changePassword.confirmationPassword = this.resetPassForm.controls.passwordR.value as string
      this.authApiService.resetPass(this.changePassword).subscribe({
        next: (userData) => {
          console.log(userData)
        },
        error : (errorData: any) => {
          if (errorData && errorData.error && errorData.error.message) {
            // Si el error tiene un mensaje, puedes mostrarlo
            if(errorData.status == 400){
              this.formError = "Las contraseñas deben ser iguales"
            }
          } else {
            // Si no hay un mensaje específico, muestra un mensaje genérico
            this.formError = 'Error al procesar la solicitud';
          }
        },
        complete: () => {
          this.router.navigateByUrl('/login');
          this.resetPassForm.reset();
        }
      });
    }else{
      this.resetPassForm.markAllAsTouched();
      alert("Error de ingreso de datos")
    }
  }

  goBack() {
    this.router.navigate(['/edit-profile-customer']); // Redirige a la página principal
  }
}
