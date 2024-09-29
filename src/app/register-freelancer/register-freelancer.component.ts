import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateDeveloperRequest } from '../../api/developer-api/interfaces';
import { AuthApiService } from '../../api/auth-api/auth-api.service';

@Component({
  selector: 'app-register-freelancer',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './register-freelancer.component.html',
  styleUrls: ['./register-freelancer.component.scss']
})
export class RegisterFreelancerComponent {
  
  createDeveloperRequest: CreateDeveloperRequest = {
    username: '',
    dni: 4,
    names: '',
    lastName: '',
    email: '',
    password: '',
    typeUser: 'DEVELOPER',
    portfolio: '',
    hoursWorked: 3,
    paymentRate: '',
    workExperience: '',
    yearsExperience: 5,
    skills: []
  }

  // Variable to errors

  formError = ""

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
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    portfolio: ['', Validators.required],
    paymentRate: ['', Validators.required],
    workExperience: ['', Validators.required],
    skills: ['', Validators.required]
  })

  get firstName(){
    return this.registerForm.get('firstName')
  }

  get lastName(){
    return this.registerForm.get('lastName')
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
      this.createDeveloperRequest.username = namesControl.at(0) + lastNameControl
      this.createDeveloperRequest.email = this.registerForm.controls.email.value as string
      this.createDeveloperRequest.password = this.registerForm.controls.password.value as string
      this.createDeveloperRequest.portfolio = this.registerForm.controls.portfolio.value as string
      this.createDeveloperRequest.workExperience = this.registerForm.controls.workExperience.value as string
      this.createDeveloperRequest.paymentRate = this.registerForm.controls.paymentRate.value as string
      this.createDeveloperRequest.skills.push(this.registerForm.controls.skills.value as string) 
      console.log(this.createDeveloperRequest)
      this.authApiService.registerDeveloper(this.createDeveloperRequest).subscribe({
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
          this.router.navigateByUrl('/login');
          this.registerForm.reset();
        }
      }); 
    }else{
      this.registerForm.markAllAsTouched();
    }   
  }

  openGoogleAuth() {
    const googleAuthURL = 'https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ifkv=ARpgrqfahPgL75ggfdYMLu8k27GCVDPwO9gSM48fIpyW_5eFhu9xcvJ0WFDZ_yBKLHv6FyAqHptJsg&rip=1&sacu=1&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1743138878%3A1727373242782840&ddm=0';
    window.open(googleAuthURL, '_blanck');
  }
}