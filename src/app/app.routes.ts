import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { JoinSelectionComponent } from './join-selection/join-selection.component';
import { RegisterFreelancerComponent } from './register-freelancer/register-freelancer.component';
import { LoginComponent } from './login/login.component';
import { FreelancerSectionComponent } from './freelancer-section/freelancer-section.component';
import { ProfileFreelancerComponent } from './profile-freelancer/profile-freelancer.component';
import { ProfileCustomerComponent } from './profile-customer/profile-customer.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ProjectSectionComponent } from './project-section/project-section.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileCustomerComponent } from './edit-profile-customer/edit-profile-customer.component';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
import { ModifyProjectComponent } from './modify-project/modify-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { HireDeveloperComponent } from './hire-developer/hire-developer.component';
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


export const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'join', component: JoinSelectionComponent },
  { path: 'register-client', component: RegisterCustomerComponent, canActivate: [authInverseGuard] },
  { path: 'register-freelancer', component: RegisterFreelancerComponent, canActivate: [authInverseGuard] },
  { path: 'login', component: LoginComponent, canActivate: [authInverseGuard] },
  { path: 'freelancer', component: FreelancerSectionComponent, canActivate: [customerGuard] },
  { path: 'profile-freelancer', component: ProfileFreelancerComponent, canActivate: [authGuard, developerGuard] },
  { path: 'profile-customer', component: ProfileCustomerComponent, canActivate: [authGuard, customerGuard] },
  { path: 'forgot', component: ForgotComponent, canActivate: [authInverseGuard]},
  { path: 'project-section', component: ProjectSectionComponent, canActivate: [developerGuard]},
  { path: 'change-password/:token', component: ChangePasswordComponent},
  { path: 'edit-profile-customer', component: EditProfileCustomerComponent, canActivate: [authGuard, customerGuard]},
  { path: 'crear-proyecto', component: CrearProyectoComponent, canActivate: [authGuard, customerGuard]},
  { path: 'modify-project/:id', component: ModifyProjectComponent, canActivate: [authGuard, customerGuard]},
  { path: 'view-project/:id', component: ViewProjectComponent},
  { path: 'hire-developer/:id', component: HireDeveloperComponent, canActivate: [authGuard, customerGuard]},
  { path: 'revisar-portafolios-freelancer', component: RevisarPortafoliosFreelancerComponent},
  { path: 'historial-proyectos', component: HistorialProyectosComponent, canActivate: [authGuard, customerGuard]},
  { path: 'ver-desarrolladores-favoritos', component: VerDesarrolladoresFavoritosComponent, canActivate: [authGuard, developerGuard] },
  { path: 'developer-historial-proyectos', component: HistorialProyectosDeveloperComponent, canActivate: [authGuard, developerGuard]},
  { path: 'solicitar-cambios', component: SolicitarCambiosComponent, canActivate: [authGuard, customerGuard]},
  { path: 'edit-profile-freelancer', component: EditProfileFreelancerComponent, canActivate: [authGuard, developerGuard]},
  { path: 'change-password-freelancer', component: ChangePasswordFreelancerComponent, canActivate: [authInverseGuard]},
];
