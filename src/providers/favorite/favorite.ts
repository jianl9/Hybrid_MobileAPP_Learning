import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  // inject dishservice into favorite to get access of dish service
  constructor(public http: Http,
              private dishservice: DishProvider) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];
  }

  addFavorite(id: number): boolean {
    // avoid duplicate
    if (!this.isFavorite(id))
      this.favorites.push(id);
    console.log('favorites', this.favorites);
    return true;
  }

  getFavorites(): Observable<Dish[]> {
    /* JS array method:
    when I call that getDishes method, it'll return me all the dishes.
    Now once I get all of the dishes I'm going to filter out only those dishes that are in my list of favorites.
    Now how do I know if a particular dish is in my list of favorites?
    Now this is where we saw that we already implemented this method here,
    which allows me to check if a particular dish is in the list of favorites
    So I'm going to use the same method here. So this is where I am using this favorites.some and then el,
    and then the filter will be applied.
    So only those dishes that are in my favorites will be selected.
    And so the dishes array will contain only those dishes that
    are in my favorites and that will be returned to my caller
    when the getFavorites method will be called.
     */
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index,1);
      return this.getFavorites(); // return modified array to the page
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }
}
