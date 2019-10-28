import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NbSidebarService, NbMenuService  } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyecto';

  constructor(private sidebarService: NbSidebarService) {
  }
  
  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  items = [
    {
      title: 'Profile',
      icon: 'archive-outline',
      link: [],
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
      link: [],
    },
    {
      title: 'Privacy Policy',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
      link: [],
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link: [],
    },
  ];
}
