import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../blogpost';

interface ErrorObject {
  errorTitle: string;
  errorDesc: string;
}


@Component({
  selector: 'app-blogpost-recent',
  templateUrl: './blogpost-recent.component.html',
  styleUrls: ['./blogpost-recent.component.css'],
})
export class BlogpostRecentComponent implements OnInit {
  blogs!: Blogpost[];
  error!: ErrorObject;

  constructor(private blogpostService: BlogpostService) {}

  ngOnInit() {
    this.blogpostService.getRecentBlogs().subscribe(
      (data: Blogpost[] | Blogpost) => {
        if (Array.isArray(data)) {
          this.blogs = data;
        } else {
          this.blogs = [data];
        }
      },
      (error: ErrorObject) => {
        this.error = error;
      }
    );
  }
}
