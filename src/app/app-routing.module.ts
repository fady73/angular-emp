import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  {
    path: 'Home',
    loadChildren: () =>
      import('./employee/employee.module').then((mod) => mod.EmployeeModule),
  },
  {
    path: 'details/:id',
    loadChildren: () =>
      import('./view/view-employee.module').then((mod) => mod.AddModule),
  },
  {
    path: 'Edit/:ID',
    loadChildren: () => import('./add/add.module').then((mod) => mod.AddModule),
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then((mod) => mod.AddModule),
  },
  { path: '**', redirectTo: '/Home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
