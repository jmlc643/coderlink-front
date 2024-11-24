import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateCustomerRequest } from '../../api/customer-api/interfaces';
import { AuthApiService } from '../../api/auth-api/auth-api.service';

@Component({
  selector: 'app-register-c',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './register-c.component.html',
  styleUrls: ['./register-c.component.scss']
})
export class RegisterCustomerComponent {

  // Mapping DTO

  createCustomerRequest: CreateCustomerRequest = {
    names: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  }

  // Variable to errors

  formError = ""

  showSuccessModal = false;

  // Injection of FormBuilder to Validations

  formBuilder = inject(FormBuilder)

  // Injection of Router

  router = inject(Router)

  // Injection of CustomerApiService
  authApiService = inject(AuthApiService)

  //Validation to same passwords
  passwordMatchValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const password = control.get('password')?.value;
    const repeat_password = control.get('confirmPassword')?.value;

    if (password !== repeat_password) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      control.get('confirmPassword')?.setErrors(null);
    }

    if (password && password.length < 8) {
      control.get('password')?.setErrors({ minlength: true });
      return { minlength: true };
    } else {
      control.get('password')?.setErrors(null);
    }

    return null;
  }

  // FormBuilder of Register Form

  registerForm = this.formBuilder.group({
    firstName : ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]] 
  })

  get firstName(){
    return this.registerForm.get('firstName')
  }

  get lastName(){
    return this.registerForm.get('lastName')
  }

  get username(){
    return this.registerForm.get('username')
  }

  get email(){
    return this.registerForm.get('email')
  }

  get password(){
    return this.registerForm.get('password')
  }

  get confirmPassword(){
    return this.registerForm.get('confirmPassword')
  }

  register() {
    if(this.registerForm.valid){
      if(this.registerForm.controls.confirmPassword != this.registerForm.controls.confirmPassword){
        console.error(`La contraseña ${this.registerForm.controls.confirmPassword} no es igual a ${this.registerForm.controls.confirmPassword}`)
        this.formError = "Las contraseñas deben ser iguales"
        return;
      }
      // Obtain values of formGroup
      let namesControl = this.registerForm.controls.firstName.value as string
      let lastNameControl = this.registerForm.controls.lastName.value as string
      this.createCustomerRequest.names = namesControl
      this.createCustomerRequest.lastName = lastNameControl
      this.createCustomerRequest.username = this.registerForm.controls.username.value as string
      this.createCustomerRequest.email = this.registerForm.controls.email.value as string
      this.createCustomerRequest.password = this.registerForm.controls.password.value as string 
      console.log(this.createCustomerRequest)
      this.authApiService.registerCustomer(this.createCustomerRequest).subscribe({
        next: (userData) => {
          console.log(userData)
        },
        error : (errorData: any) => {
          console.error(errorData);
          if (errorData && errorData.error && errorData.error.message) {
            // If error has a message, you can show it
            this.formError = errorData.error.message;
          } else {
            // If there isn't a message, show a generic message
            this.formError = 'Error al procesar la solicitud';
          }
        },
        complete: () => {
          console.info("Register succesfuly")
          this.formError = "";
          this.showSuccessModal = true;
          this.registerForm.reset();
        }
      }); 
    }else{
      this.registerForm.markAllAsTouched();
    }   
  }

  closeModal() {
    this.showSuccessModal = false;
    this.router.navigate(['/login']);
  }
}
