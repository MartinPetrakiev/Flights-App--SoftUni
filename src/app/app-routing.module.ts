import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsComponet } from "./components/flights/flights.component";
import { AdminComponent } from "./components/admin/admin.component";
import { EditPanelComponent } from './components/edit-panel/edit-panel.component';

const routes: Routes = [
  { path: 'flights', component: FlightsComponet },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/edit-panel', component: EditPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
