import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { MessageService } from './message.service';

//make HeroService available to the dependency injection system
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService which is injected into the HeroesComponent.
  constructor(private http: HttpClient, private messageService: MessageService) { }

  //returns an Observable vom Typ Hero (für asynchron), da im Real getHeroes auf Server Response warten muss
  getHeroes(): Observable<Hero[]> {
      this.messageService.add('HeroService: fetched heroes');
      //return of(HEROES); //von mock-heroes
      return this.http.get<Hero[]>(this.heroesUrl) //vom Server
      .pipe(tap(_ => this.log('fetched heroes')), catchError(this.handleError<Hero[]>('getHeroes', [])) //Error Handling mittels Pipe
    ); 
  }
  //HttpClient.get() call returns an Observable<Hero[]>; that is, "an observable of hero arrays". In practice, it will only return a single hero array.


  //Get 1 Hero
  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    //return of(HEROES.find(hero => hero.id === id)); //sucht in der Liste und gibt zurück falls seine id mit der gewünschten id übereinstimmt

    //:baseURL/:id.
    const url = `${this.heroesUrl}/${id}`;
    //returns an Observable<Hero> ("an observable of Hero objects") rather than an observable of hero arrays.
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  //heroes-detail.component.ts ruft diese Methode auf
  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  /*
  The HttpClient.put() method takes three parameters:
    the URL
    the data to update (the modified hero in this case)
    options
  The URL is unchanged. The heroes web API knows which hero to update by looking at the hero's id.
*/

//heroes.component.ts ruft diese Methode auf
/** POST: add a new hero to the server */
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

//heroes.component.ts ruft diese Methode auf
/** DELETE: delete the hero from the server */
deleteHero(hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

//Services are a great way to share information among classes that don't know each other.