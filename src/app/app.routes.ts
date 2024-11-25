import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { JoinSelectionComponent } from './join-selection/join-selection.component';
import { RegisterFreelancerComponent } from './register-freelancer/register-freelancer.component';
import { LoginComponent } from './login/login.component';
import { FreelancerSectionComponent } from './freelancer-section/freelancer-section.component';
import { ProfileFreelancerComponent } from './profile-freelancer/profile-freelancer.component';
import { ProfileCustomerComponent } from './profile-customer/profile-customer.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileCustomerComponent } from './edit-profile-customer/edit-profile-customer.component';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
import { ModifyProjectComponent } from './modify-project/modify-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { RegisterCustomerComponent } from './register-c/register-c.component';
import { RevisarPortafoliosFreelancerComponent } from './revisar-portafolios-freelancer/revisar-portafolios-freelancer.component';
import { HistorialProyectosComponent } from './historial-proyectos/historial-proyectos.component';
import { HistorialProyectosDeveloperComponent } from './historial-proyectos-developer/historial-proyectos-developer.component';
import { SolicitarCambiosComponent } from './solicitar-cambios/solicitar-cambios.component';
import { EditProfileFreelancerComponent } from './edit-profile-freelancer/edit-profile-freelancer.component';
import { ChangePasswordFreelancerComponent } from './change-password-freelancer/change-password-freelancer.component';
import { VerDesarrolladoresFavoritosComponent } from './ver-desarrolladores-favoritos/ver-desarrolladores-favoritos.component';
import { authGuard } from '../guards/auth/auth.guard';
import { authInverseGuard } from '../guards/auth/auth-inverse.guard';
import { developerGuard } from '../guards/developer/developer.guard';
import { customerGuard } from '../guards/customer/customer.guard';
import { ConfirmPaidComponent } from './confirm-paid/confirm-paid.component';


export const routes: Routes = [
  { path: '', component: PrincipalComponent },
  // Rutas de autenticación (inverso)
  {
    path: '',
    canActivate: [authInverseGuard],
    children: [
      { path: 'join', component: JoinSelectionComponent },
      { path: 'register-client', component: RegisterCustomerComponent },
      { path: 'register-freelancer', component: RegisterFreelancerComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgot', component: ForgotComponent },
      { path: 'change-password/:token', component: ChangePasswordComponent },
      { path: 'change-password-freelancer', component: ChangePasswordFreelancerComponent },
    ],
  },

  // Rutas de Freelancer
  {
    path: '',
    canActivate: [authGuard, developerGuard],
    children: [
      { path: 'profile-freelancer', component: ProfileFreelancerComponent },
      { path: 'edit-profile-freelancer', component: EditProfileFreelancerComponent },
      { path: 'developer-historial-proyectos', component: HistorialProyectosDeveloperComponent },
    ],
  },
  { path: 'freelancer', component: FreelancerSectionComponent },

  // Rutas de Cliente
  {
    path: '',
    canActivate: [authGuard, customerGuard],
    children: [
      { path: 'profile-customer', component: ProfileCustomerComponent },
      { path: 'edit-profile-customer', component: EditProfileCustomerComponent },
      { path: 'crear-proyecto', component: CrearProyectoComponent },
      { path: 'modify-project/:id', component: ModifyProjectComponent },
      { path: 'historial-proyectos', component: HistorialProyectosComponent },
      { path: 'solicitar-cambios/:id', component: SolicitarCambiosComponent },
      { path: 'ver-desarrolladores-favoritos', component: VerDesarrolladoresFavoritosComponent },
      { path: 'confirm-paid', component: ConfirmPaidComponent},
      { path: 'view-project/:id', component: ViewProjectComponent },
    ],
  },

  // Rutas comunes
  { path: 'project-section', loadComponent: () => import('./project-section/project-section.component').then(m => m.ProjectSectionComponent) },
  { path: 'revisar-portafolios-freelancer/:username', component: RevisarPortafoliosFreelancerComponent },

  // Redirección y rutas no encontradas
  { path: '**', redirectTo: '/' },
];
