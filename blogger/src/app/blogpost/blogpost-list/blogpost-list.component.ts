import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../blogpost';
import { Title } from '@angular/platform-browser';

interface ErrorObject {
  errorTitle: string;
  errorDesc: string;
}

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css'],
})
export class BlogpostListComponent implements OnInit {
  title = 'Blogs';
  blogs!: Blogpost[];
  error!: ErrorObject;

  constructor(
    private titleService: Title,
    private blogpostService: BlogpostService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);

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
