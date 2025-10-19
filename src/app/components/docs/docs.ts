import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-docs',
  imports: [MarkdownComponent],
  templateUrl: './docs.html',
})
export class Docs {}
