
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CmspageService } from '../cmspage.service';
import { Page } from '../page';
import { switchMap } from 'rxjs/operators';


interface ErrorObject {
  errorTitle: string;
  errorDesc: string;
}


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  page!: Page;
  error!: ErrorObject;

  constructor(
    private route: ActivatedRoute,
    private cmspageService: CmspageService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const slug = params.get('slug');
        if (slug) {
          return this.cmspageService.getPage(slug);
        }
        throw new Error('Slug parameter is missing');
      })
    ).subscribe(
      (data: Page) => this.page = data,
      error => this.error = error
    );
  }
}