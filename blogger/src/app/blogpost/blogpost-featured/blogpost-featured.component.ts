import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../blogpost';

interface ErrorObject {
  errorTitle: string;
  errorDesc: string;
}

@Component({
  selector: 'app-blogpost-featured',
  templateUrl: './blogpost-featured.component.html',
  styleUrls: ['./blogpost-featured.component.css'],
})
export class BlogpostFeaturedComponent implements OnInit {
  blogs!: Blogpost[];
  error!: ErrorObject;

  constructor(private blogpostService: BlogpostService) {}

  ngOnInit() {
    this.blogpostService.getBlogs().subscribe(
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
