import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {
  @Output() searchItem: EventEmitter<any> = new EventEmitter<any>();

  searchText: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  searching(item) {
    this.searchItem.emit(item);
    this.searchText = "";
  }

}
