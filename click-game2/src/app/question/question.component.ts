import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NameService} from "../services/name.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  constructor(
    private nameService: NameService,
    private router: Router
  ) {}

  askName() {
    let name = prompt('Tell me your name please')
    if(name) {
      this.nameService.setName(name);
      this.router.navigateByUrl('/play', { skipLocationChange: true});
    }
  }
}
