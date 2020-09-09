import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    console.log("hero-detail before: " + this.hero);
    this.getHero();
    console.log("hero-detail after: " + JSON.stringify(this.hero));
  }

  doSomething() {
    console.log("hero-detail: " + JSON.stringify(this.hero));
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id'); //+ is number (get the ID)
    this.heroService.getHero(id) //ruft getHero Methode auf beim Service und übergibt dies die id (callback)
    .subscribe(hero => this.hero = hero); //this.hero ist beim Input() hero
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
  this.heroService.updateHero(this.hero)
    .subscribe(() => this.goBack());
}

}

//Child of Heroes.component