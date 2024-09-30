import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { CreateProjectRequest } from '../../api/project-api/interfaces';
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { GetUserResponse } from '../../api/auth-api/interfaces';
import { ProjectApiService } from '../../api/project-api/project-api.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-crear-proyecto',
  standalone:true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.scss']
})
export class CrearProyectoComponent implements OnInit{
  
  userLoginOn: boolean = false;
  usuarioLogeado : any = {};
  token: string = ''
  username: GetUserResponse = {
    username: ''
  }

  authApiService = inject(AuthApiService)
  projectApiService = inject(ProjectApiService)

  createProjectRequest: CreateProjectRequest = {
    name: '',
    description: '',
    budget: 0,
    presentation: '',
    revision: '',
    category: '',
    qualification: '',
    username: ''
  }

  formError:String="";

  fb = inject(FormBuilder)
  router = inject(Router)

  proyectoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      presentacion: ['', Validators.required],
      revision: ['', Validators.required],
      categoria: ['', Validators.required],
      calificacion: ['1', Validators.required]
  });
  
  ngOnInit(): void {
    this.token = this.authApiService.userToken
    this.loadData()
  }

  private async loadData(){
    this.username = await this.authApiService.getUserByToken(this.token)
    console.log(this.username.username)
  }

  get nombre(){
    return this.proyectoForm.get('nombre')
  }

  get descripcion(){
    return this.proyectoForm.get('descripcion')
  }

  get revision(){
    return this.proyectoForm.get('revision')
  }

  get presentacion(){
    return this.proyectoForm.get('presentacion')
  }

  get categoria(){
    return this.proyectoForm.get('categoria')
  }

  get calificacion(){
    return this.proyectoForm.get('calificacion')
  }

  errorData: String="";

  goToHome() {
    this.router.navigate(['/profile-customer']); // Ajusta la ruta según sea necesario
  }

  onSubmit() {
    if(this.proyectoForm.valid){
      this.createProjectRequest.name = this.proyectoForm.controls.nombre.value as string
      this.createProjectRequest.description = this.proyectoForm.controls.descripcion.value as string
      this.createProjectRequest.presentation = this.proyectoForm.controls.presentacion.value as string
      this.createProjectRequest.revision = this.proyectoForm.controls.revision.value as string
      this.createProjectRequest.qualification = this.proyectoForm.controls.calificacion.value as string
      this.createProjectRequest.category = this.proyectoForm.controls.categoria.value as string
      this.createProjectRequest.username = this.username.username
        this.projectApiService.createProject(this.createProjectRequest).subscribe({
          next: (projectData) => {
            console.log(projectData)
          },
          error : (errorData: any) => {
            console.error(errorData);
            this.formError="Error al crear";
          },
          complete: () => {
            console.info("Creacion completada")
            this.router.navigateByUrl('/profile-customer');
            this.proyectoForm.reset();
          }
        });
    }else{
      this.proyectoForm.markAllAsTouched();
    } 
}
}