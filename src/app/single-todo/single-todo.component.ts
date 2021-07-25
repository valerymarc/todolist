import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.css']
})
export class SingleTodoComponent implements OnInit {

   todo:any;
   error: string = "";
   nb : number =0;
  //Récuperer le parametre de l'url
  constructor(private route: ActivatedRoute,
              private todoService: TodoService,
              private router: Router) { }

  ngOnInit(): void {
    //Récuperer l'id du paramètre de l'URL
    const id = +this.route.snapshot.params['id'];
    this.todo = this.todoService.getTodo(id);
    if(!this.todo){
      this.error = "Identifiant incorrect";
    }

  }



}
