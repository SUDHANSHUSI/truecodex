import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../blogpost';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blogpost-detail',
  templateUrl: './blogpost-detail.component.html',
  styleUrls: ['./blogpost-detail.component.css'],
})
export class BlogpostDetailComponent implements OnInit {
  blog$!: Observable<Blogpost>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogpostService: BlogpostService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.blog$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        if (id) {
          return this.blogpostService.getBlog(+id);
        } else {
          throw new Error('Invalid blog post ID');
        }
      })
    );

    this.titleService.setTitle('Blog Detail');
  }
}
