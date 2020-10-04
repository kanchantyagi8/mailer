import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-right-pannel',
  templateUrl: './right-pannel.component.html',
  styleUrls: ['./right-pannel.component.scss']
})
export class RightPannelComponent implements OnInit {
  navigationLink: string;

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
  }

  changeComponent() {
    let navLink = this.globalService.getNavigation();
    this.navigationLink = navLink;
  }

}
