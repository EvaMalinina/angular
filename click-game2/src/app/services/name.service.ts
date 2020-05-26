import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NameService {

  public sharedName: BehaviorSubject<string> =  new BehaviorSubject<string>('');
  setName(name: string) {
    this.sharedName.next(name);
  }
}

