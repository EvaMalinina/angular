import {EventEmitter, Injectable} from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NameService {

  private name: string = 'default';
  sharedName: EventEmitter<string> = new EventEmitter();

  public setName(name){
    this.sharedName.emit(name)
  }

}

