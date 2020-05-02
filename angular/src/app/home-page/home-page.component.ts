import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  markdown: string;
  constructor(activatedRoute: ActivatedRoute) {
    this.markdown = activatedRoute.snapshot.data.markdown;
  }

  ngOnInit(): void {}
}
