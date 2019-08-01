import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DishProvider } from "../../providers/dish/dish";
import {Dish} from "../../shared/dish";
import {Comment} from "../../shared/comment";

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  commentForm: FormGroup;
  comment: Comment;
  dishcopy: Dish;
  dish: Dish;
  errMess: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder,
              public viewCtrl: ViewController,
              private dishprovider: DishProvider) {
    this.dishcopy = navParams.get('dish');
    this.dish = this.navParams.get('dish');

    this.commentForm = this.formBuilder.group({
      rating: 5,
      comment: ['', Validators.required],
      author: ['', Validators.required],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment['date'] = new Date().toDateString();
    this.dishcopy.comments.push(this.comment);
    this.dishprovider.putDish(this.dishcopy).subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => {this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.viewCtrl.dismiss();
  }

}
