import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapse-menu',
  templateUrl: './collapse-menu.component.html',
  styleUrls: ['./collapse-menu.component.scss']
})
export class CollapseMenuComponent implements OnInit {
  menuItemList: any;
  selected: any = 'mailbox';
  expend: boolean = false;

  constructor() {
    this.menuItemList = [
      {id: 'dashboard', value: "Dashboards"},
      {id: 'layout', value: "Layout"},
      {id: 'graph', value: "Graphs"},
      {id: 'mailbox', value: "Mailbox"},
      {id: 'metric', value: "Metrics"},
      {id: 'widget', value: "Widgets"},
      {id: 'form', value: "Forms"},
      {id: 'appview', value: "App"}
    ]
   }

  ngOnInit(): void {
  }

  selectedMenu(item) {
    this.selected = item;
  }

  isActive(item) {
    return this.selected === item;
  }

  userExpended() {
    this.expend = !this.expend;
  }

}
