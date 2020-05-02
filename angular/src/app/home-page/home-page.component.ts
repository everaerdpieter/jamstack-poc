import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  markdown: string;
  constructor(private contentService: ContentService) {}

  async ngOnInit(): Promise<void> {
    this.markdown = await this.contentService.getContent('home-page.md');
  }
}
