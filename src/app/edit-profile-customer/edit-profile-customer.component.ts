import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerApiService } from '../../api/customer-api/customer-api.service';
import { NgIf } from '@angular/common';
import { UpdateCustomer } from '../../api/customer-api/interfaces';
import { AuthApiService } from '../../api/auth-api/auth-api.service';

@Component({
  selector: 'app-edit-profile-customer',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './edit-profile-customer.component.html',
  styleUrl: './edit-profile-customer.component.scss'
})
export class EditProfileCustomerComponent implements OnInit{

  router = inject(Router)
  formBuilder = inject(FormBuilder)

  isVerificationModalOpen = false;
  verificationCode = '';
  customerApiService = inject(CustomerApiService)

  
  user = ''

  authApiService = inject(AuthApiService)

  editForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]]
  });

  verifyCodeForm = this.formBuilder.group({
    code: ["", Validators.required]
  })

  async ngOnInit(){
    await this.loadData()
  }

  private async loadData(){
    this.user = await this.authApiService.getUser()?.username as string
  }

  get username(){
    return this.editForm.get('username')
  }

  get email(){
    return this.editForm.get('email')
  }

  get password(){
    return this.editForm.get('password')
  }

  get code(){
    return this.verifyCodeForm.get('code')
  }

  save(): void {
    const formData = this.editForm.value;

    // Solicita el envío del código de verificación
    this.customerApiService.sendVerificationCode(formData.email as string).subscribe(() => {
      console.log('Código de verificación enviado');
      this.isVerificationModalOpen = true; // Abre el modal
    });
  }

  cancel(): void {
    const confirmation = window.confirm('Seguro que deseas cancelar los cambios?');
    if(confirmation) {
    this.router.navigate(['/profile-customer'])
    }
  }

  closeModal() {
    this.isVerificationModalOpen = false;
    this.verificationCode = '';
  }

  verifyCode() {
    const email = this.editForm.get('email')?.value;
    this.verificationCode = this.verifyCodeForm.controls.code.value as string
    const formData = this.editForm.value;

    // Verifica el código ingresado
    this.customerApiService.verifyEmailCode(email as string, this.verificationCode).subscribe({
      complete: async () => {
        console.log('Correo verificado correctamente');
        this.closeModal();
        await this.customerApiService.updateCustomer(formData as UpdateCustomer, this.user)
        this.authApiService.logout()
        this.router.navigate(['/login']).then(() => {
          window.location.reload()
        })
      },
      error: (error) => {
        console.error('Error al verificar el código:', error);
      }
    }
    );
  }
}