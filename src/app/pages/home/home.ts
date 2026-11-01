import { Component } from '@angular/core';
import { SearchableList } from '../../components/searchable-list/searchable-list';

@Component({
  selector: 'app-home',
  imports: [SearchableList],
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
