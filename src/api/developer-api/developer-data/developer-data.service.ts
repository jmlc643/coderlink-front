import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CreateDeveloperRequest } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DeveloperDataService {

  private developerSource = new BehaviorSubject<CreateDeveloperRequest | null>(null);
  currentDeveloper = this.developerSource.asObservable();

  updateDeveloper(developer: CreateDeveloperRequest) {
    this.developerSource.next(developer);
  }
}
