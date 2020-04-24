import { Component, OnInit } from '@angular/core';
import {NameService} from "../services/name.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  title: string = 'Click-game';
  name;
  clickNumber: number = 0;
  time: number = 10;
  interval;
  records: any[] = [];
  // show: boolean = false;
  visibleBtn: boolean = false;

  constructor( private nameService: NameService ) {}

  ngOnInit(): void {
    this.nameService.sharedName.subscribe(resp => {
      this.name = resp;
    });
  }

  showClickBtn() {
    this.visibleBtn = !this.visibleBtn;
  }

  public doSomething(userName: string):void {
    console.log('Picked name: ', userName);
  }

  changeName() {
    this.name = prompt('Tell me your name please');
  }

  startTimer() {
    this.showClickBtn();

    this.interval = setInterval(() => {
      if( this.time > 0 ) {
        this.time--;
        if( this.time === 0 ) {
          clearInterval( this.interval );

          if ( this.clickNumber === 0 ) {
            alert(`Sorry ${this.name}, you did not click a single time.
            Don't be a looser. Try 1 more time`);
          } else if ( this.clickNumber <= 30 && this.clickNumber > 0 ) {
            alert(`Congratulations ${this.name}, you clicked ${this.clickNumber} times.
            Your score is so so...`);
          } else if ( this.clickNumber <= 70 && this.clickNumber > 30 ){
            alert(`Congratulations ${this.name}, you clicked ${this.clickNumber} times.
            Your score is good.`);
          } else {
            alert(`Congratulations ${this.name}, you clicked ${this.clickNumber} times.
            Your score is excellent. You are maestro!`);
          }

          let user = {
            name: this.name,
            score: this.clickNumber
          }

          this.records.push(user);

          this.clickNumber = 0;
          this.showClickBtn();
        }
      } else {
        this.time = 10;
      }
    },1000)
  }

  countClick() {
    if (this.time > 0) {
      this.clickNumber++
    } else {
      this.clickNumber = 0
    }
  }

}
