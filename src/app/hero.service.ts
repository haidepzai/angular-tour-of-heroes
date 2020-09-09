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

  //This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService which is injected into the HeroesComponent.
  constructor(private messageService: MessageService) { }

  //returns an Observable vom Typ Hero (für asynchron), da im Real getHeroes auf Server Response warten muss
  getHeroes(): Observable<Hero[]> {
      this.messageService.add('HeroService: fetched heroes');
      return of(HEROES); //von mock-heroes
  }
  //Get 1 Hero
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id)); //sucht in der Liste und gibt zurück falls seine id mit der gewünschten id übereinstimmt
  }

}

//Services are a great way to share information among classes that don't know each other.