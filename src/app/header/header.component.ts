import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  salutSub : any;
  nbPaireSub : any;
  secondes : any;
  minutes : any;
  heures: any;


  constructor() { }

  ngOnInit(): void {
    const salut = new Observable((observer) =>{
      //Emettre un données
      observer.next("Hello");
      observer.next("Valéry !");
      for(let i=0; i<10; i++){
        observer.next("Projet "+i);
      }
      observer.complete();
    });

    /*const nbPaires = new Observable((observer) =>{
      let value = 0;
      const interval = setInterval(() => {
        //if(value % 2 === 0) {
          observer.next(value);
        //}
        value++;
      }, 1000);
      return () => clearInterval(interval);
    });*/

    const secondeObs = interval(1000);

    this.nbPaireSub = secondeObs.subscribe(
      (value) => {
        this.secondes = value;
        if(this.secondes >= 60){
          this.minutes = Math.floor(this.secondes/60);
          this.secondes = this.secondes % 60;
        }
        if(this.minutes >=60){
          this.heures = Math.floor(this.minutes/60);
          this.minutes = this.minutes % 60;
        }
        console.log(value);
      }
    );
  }

  ngOnDestroy(){
    this.salutSub.unsubscribe();
    this.nbPaireSub.unsubscribe();
  }



}
