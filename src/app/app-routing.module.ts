import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { DrainLevelComponent } from './drain-level/drain-level.component';


const routes :Routes =[
  {path:'DrainLevels/:id',component: DrainLevelComponent }
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})]
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule {

 }
