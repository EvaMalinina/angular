import { Component } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: string = 'Click-game';
  name: string = 'Mate';
  clickNumber: number = 0;
  time: number = 10;
  interval;
  records: any[] = [];


  @ViewChild('content') contentRef: ElementRef;
  showGameTemplate() {
    this.contentRef.nativeElement.style.display = 'flex';
  }

  @ViewChild('records') recordsRef: ElementRef;
  showRecordsTemplate() {
    this.recordsRef.nativeElement.style.display = 'flex';
  }

  @ViewChild('main') mainRef: ElementRef;
  hideMainScreen() {
    this.mainRef.nativeElement.style.display = 'none';
  }

  getName() {
    console.log('main', this.mainRef)
    this.name = prompt('Tell me your name please');
    if(this.name) {
      this.showGameTemplate();
      this.showRecordsTemplate();
      this.hideMainScreen();
    }
  }

  @ViewChild('btnStart') btnStartRef: ElementRef;
  @ViewChild('btnClick') btnClickRef: ElementRef;
  changeBtn() {
    this.btnStartRef.nativeElement.style.display = 'none';
    this.btnClickRef.nativeElement.style.display = 'block';
  }


  startTimer() {
    this.changeBtn();

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
          this.showRecords();

          this.clickNumber = 0;
          this.btnStartRef.nativeElement.style.display = 'block';
          this.btnClickRef.nativeElement.style.display = 'none';
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

  @ViewChild('list') listRef: ElementRef;
  showRecords() {
    let recordsWrap = this.recordsRef.nativeElement;
    let list = this.listRef.nativeElement;
    list.className = 'records__list';

    recordsWrap.appendChild(list);

    let recordsArr = this.records;

    for ( let record of recordsArr ) {
      let li = document.createElement('li');
      li.className = 'records__item';
      list.appendChild(li);

      li.insertAdjacentHTML('afterbegin', `
        <p class="records__player">Player: ${ record.name }</p>
        <p>Score: ${ record.score }</p>
    `)
    }
    this.records = [];
  }
}
