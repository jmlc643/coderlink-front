import { Component, inject } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RecoveryPasswordRequest } from '../../api/auth-api/interfaces';
import { AuthApiService } from '../../api/auth-api/auth-api.service';

@Component({
  selector: 'app-forgots',
  standalone:true,
  imports: [NgIf,NgFor,ReactiveFormsModule,RouterModule],
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {
  recoveryPasswordRequest: RecoveryPasswordRequest = {
    email: ''
  }

  showSuccessModal = false

  formError = ''

  authApiService = inject(AuthApiService)

  router = inject(Router)

  formBuilder = inject(FormBuilder)

  recoveryPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  })

  get email(){
    return this.recoveryPasswordForm.controls.email;
  }

  resetPassword() {
    if(this.recoveryPasswordForm.valid){
      this.formError="";
      this.recoveryPasswordRequest.email = this.recoveryPasswordForm.controls.email.value as string
      this.authApiService.recoveryPassword(this.recoveryPasswordRequest).subscribe({
        next: (userData) => {
          console.log(userData)
        },
        error : (errorData: any) => {
          console.error(errorData);
          this.formError="Correo no encontrado";
        },
        complete: () => {
          console.info("Enviar correo completo")
          this.showSuccessModal = true;
          this.recoveryPasswordForm.reset();
        }
      });
    }else{
      this.recoveryPasswordForm.markAllAsTouched();
      alert("Error de ingreso de datos")
    }
  }

  closeModal() {
    this.showSuccessModal = false;
    this.router.navigate(['/']);
  }
}
