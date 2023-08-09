import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor() { }
comments = [
  {
    id: 1,
    img: '',
    author: 'John Doe',
    date: '15-05-2015',
    text: 'lorem ipsum dolor sit amet',
  },
  {
    id: 2,
    img: '',
    author: 'Aurthur Conan Doyle',
    date: '21-07-1973',
    text: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!',
  },
  {
    id: 3,
    img: '',
    author: 'Agatha Cristie',
    date: '27-01-1988',
    text: 'lorems ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum! lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!',
  }
];


  getComments() {
    return this.comments;
  }

  addComment(comment: any) {
    this.comments.push(comment);
  }

  deleteComment(comment: any) {
    this.comments.splice(this.comments.indexOf(comment), 1);
    
  }
}
