import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes: Hero[]; //für die Liste My Heroes
  selectedHero: Hero; //Ausgewählter Hero

  //Inject the HeroService
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    console.log("selected hero: " + this.selectedHero);
    this.getAllHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    console.log("selected hero: " + JSON.stringify(this.selectedHero));
  }

//Observable ist wichtig für asynchron! Da man immer eine Antwort vom Server wartet
  getAllHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes); //subscribe the observable
  }
}

//Parent of hero-detail.component