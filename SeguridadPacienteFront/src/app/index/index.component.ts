import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  items: NbMenuItem[] = [
    {
      title: 'Regionales',
      icon: 'navigation-2-outline',
      link: '/index/regional',
    },
    {
      title: 'Pacientes',
      icon: 'person-outline',
      link: '/index/paciente',
    },
    {
      title: 'EPS',
      icon: 'activity-outline',
      link: '/index/eps',
    },
    {
      title: 'Sede',
      icon: 'home-outline',
      link: '/index/sede',
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
      link: '/index/prueba2',
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link: '/login',
    },
  ];

  // toggle() {
  //   this.sidebarService.toggle();
  // }

  compact() {
    this.sidebarService.toggle(true);
  }

  constructor(private sidebarService: NbSidebarService) {}

  ngOnInit(): void {}
}
