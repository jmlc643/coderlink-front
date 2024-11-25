import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeveloperApiService } from '../../api/developer-api/developer-api.service';
import { NgIf } from '@angular/common';
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { UpdateDeveloper } from '../../api/developer-api/interfaces';

@Component({
  selector: 'app-edit-profile-freelancer',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-profile-freelancer.component.html',
  styleUrl: './edit-profile-freelancer.component.scss'
})
export class EditProfileFreelancerComponent implements OnInit{

  router = inject(Router)
  formBuilder = inject(FormBuilder)

  isVerificationModalOpen = false;
  verificationCode = '';
  developerApiService = inject(DeveloperApiService)

  user = ''

  authApiService = inject(AuthApiService)

  editForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    portfolio: ['', Validators.required],
    paymentRate: [0, [Validators.required, Validators.min(1)]],
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

  get paymentRate(){
    return this.editForm.get('paymentRate')
  }

  get portfolio(){
    return this.editForm.get('portfolio')
  }

  get code(){
    return this.verifyCodeForm.get('code')
  }

  save(): void {
    const formData = this.editForm.value;
    // Solicita el envío del código de verificación
    this.developerApiService.sendVerificationCode(formData.email as string).subscribe(() => {
      this.isVerificationModalOpen = true; // Abre el modal
    });
  }

  cancel(): void {
    const confirmation = window.confirm('Seguro que deseas cancelar los cambios?');
    if(confirmation) {
    this.router.navigate(['/profile-freelancer'])
  }
}
  validateNumberInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/^\d$/.test(inputChar)) {
      event.preventDefault();
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
    this.developerApiService.verifyEmailCode(email as string, this.verificationCode).subscribe({
      complete: async () => {
        this.closeModal();
        await this.developerApiService.updateCustomer(formData as UpdateDeveloper, this.user)
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
