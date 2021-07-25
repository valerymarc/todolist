import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit, OnDestroy {

  today: Date = new Date();
  listTodo: any[] = [];
  //listTodoSub: Subscription;
  listTodoSub: any;





  constructor(private todoService: TodoService, private router: Router) { }


  ngOnInit(): void {
      this.today = this.todoService.today;
      this.listTodoSub = this.todoService.listTodoSubject.subscribe(
        (value: any[]) => {
          this.listTodo = value;
        },
        (error) => {
          console.log("Erreur", error);
        },
        () =>{
          console.log("Observable completé");
        }
      );
      this.todoService.emitTodo();
      /*this.todoService.listTodo
        .then((reponse: any) =>{
           this.listTodo = reponse;
           console.log("RÉPONSE", reponse);
        })
        .catch((error: any) =>{
          console.log("Erreur ", error);
        });*/
  }

  ngOnDestroy(){
    this.listTodoSub.unsubscribe();
  }


changeStatus = (j: number) =>{
    this.todoService.onChangeStatus(j);
  }

changeModif(j: number):void{
   this.todoService.onChangeModif(j);
}

onView(id: number){
  this.router.navigate(["single-todo", id])
}




}
