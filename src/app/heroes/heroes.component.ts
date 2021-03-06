import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[]; //für die Liste My Heroes
  //selectedHero: Hero; //Ausgewählter Hero

  //Inject the HeroService
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }//When addHero() saves successfully, the subscribe() callback receives the new hero and pushes it into to the heroes list for display.

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero); //deleting from the UI
    this.heroService.deleteHero(hero).subscribe();
  }

  ngOnInit() {
    console.log("selected hero: " + this.selectedHero);
    this.getAllHeroes();
  }

/*
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    console.log("selected hero: " + JSON.stringify(this.selectedHero));
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
  */

//Observable ist wichtig für asynchron! Da man immer eine Antwort vom Server wartet
  getAllHeroes(): void {
      this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes); //subscribe the observable
    }
  }

//Parent of hero-detail.component