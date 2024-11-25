import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateDeveloperRequest } from '../../api/developer-api/interfaces';
import { AuthApiService } from '../../api/auth-api/auth-api.service';

@Component({
  selector: 'app-register-freelancer',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './register-freelancer.component.html',
  styleUrls: ['./register-freelancer.component.scss']
})
export class RegisterFreelancerComponent {
  
  createDeveloperRequest: CreateDeveloperRequest = {
    username: '',
    names: '',
    lastName: '',
    email: '',
    password: '',
    typeUser: 'DEVELOPER',
    portfolio: '',
    paymentRate: 0,
    workExperience: '',
    skills: []
  }

  // Variable to errors

  formError = ""
  experienceError = false;

  showSuccessModal = false;

  // Injection of FormBuilder to Validations

  formBuilder = inject(FormBuilder)

  // Injection of Router

  router = inject(Router)

  // Injection of CustomerApiService
  authApiService = inject(AuthApiService)
  
  // FormBuilder of Register Form

  registerForm = this.formBuilder.group({
    firstName : ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    portfolio: ['', Validators.required],
    paymentRate: [0, [Validators.required, Validators.min(1)]],
    workExperience: ['', [Validators.required, Validators.maxLength(150)]],
    skills: ['', Validators.required]
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

  get portfolio(){
    return this.registerForm.get('portfolio')
  }

  get workExperience(){
    return this.registerForm.get('workExperience')
  }

  get paymentRate(){
    return this.registerForm.get('paymentRate')
  }

  get skills(){
    return this.registerForm.get('skills')
  }

  register() {
    if(this.registerForm.valid){
      // Obtain values of formGroup
      let namesControl = this.registerForm.controls.firstName.value as string
      let lastNameControl = this.registerForm.controls.lastName.value as string
      this.createDeveloperRequest.names = namesControl
      this.createDeveloperRequest.lastName = lastNameControl
      this.createDeveloperRequest.username = this.registerForm.controls.username.value as string
      this.createDeveloperRequest.email = this.registerForm.controls.email.value as string
      this.createDeveloperRequest.password = this.registerForm.controls.password.value as string
      this.createDeveloperRequest.portfolio = this.registerForm.controls.portfolio.value as string
      this.createDeveloperRequest.workExperience = this.registerForm.controls.workExperience.value as string
      this.createDeveloperRequest.paymentRate = this.registerForm.controls.paymentRate.value as number
      console.log(this.createDeveloperRequest)
      this.authApiService.registerDeveloper(this.createDeveloperRequest).subscribe({
        next: (userData) => {
          console.log(userData)
        },
        error : (errorData) => {
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
          this.showSuccessModal = true;
          console.log(this.showSuccessModal)
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

  validateExperienceLength() {
    this.experienceError = this.createDeveloperRequest.workExperience.length > 150;
  }

  addSkill() {
    // Agrega un nuevo campo vacío al array de habilidades
    this.createDeveloperRequest.skills.push(this.registerForm.controls.skills.value as string);
    const inputSkill = document.getElementById("skill-input-form") as HTMLInputElement
    if (inputSkill) {
      inputSkill.value = "";
    }
    console.log(this.createDeveloperRequest.skills)
  }


  removeSkill(index: number) {
    // Remueve el campo de habilidad en el índice especificado
    if (this.createDeveloperRequest.skills.length > 0) {
      this.createDeveloperRequest.skills.splice(index, 1);
    }
  }
}