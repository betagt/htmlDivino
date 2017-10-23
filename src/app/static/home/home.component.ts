import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { HomeService } from './home.service';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [ HomeService]
})

export class HomeComponent implements OnInit {
  constructor(public router: Router) {
  }

  ngOnInit() {}

}
