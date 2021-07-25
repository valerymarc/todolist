import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import { AddTodoComponent } from './todo/add-todo/add-todo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { SingleTodoComponent } from './single-todo/single-todo.component';

//Mise en place du routage
const ROUTES : Routes = [
  {path:'home', component: HomeComponent},
  {path:'todo', component: TodoComponent},
  {path:'add-todo', component: AddTodoComponent},
  {path:'notfound', component: NotFoundComponent},
  {path:'contact', component: ContactComponent},
  {path:'users', component: UsersComponent},
  {path:'add-user', component: AddUserComponent},
  {path:'single-todo/:id', component: SingleTodoComponent},
  {path:'', component: HomeComponent},
  {path:'**', pathMatch:'full', redirectTo: 'notfound'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutageModule { }
