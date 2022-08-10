import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  items=[
    {
      name:'Dashboard',
      icon:'fa fa-dashboard',
      link:'/dashboard'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
