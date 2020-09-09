import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { MessageService } from './message.service';

//make HeroService available to the dependency injection system
@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  //returns an Observable vom Typ Hero (für asynchron), da im Real getHeroes auf Server Response warten muss
  getHeroes(): Observable<Hero[]> {
  return of(HEROES); //von mock-heroes
}

}

//Services are a great way to share information among classes that don't know each other.