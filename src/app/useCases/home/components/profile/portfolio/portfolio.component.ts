import { Component, inject } from '@angular/core';
import { ProfileService } from '../../../shared/services/profile/profile.service';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { WebPage } from '../../../shared/models/webPage';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor, NgClass],
  templateUrl: './portfolio.component.html',
  styles: ``,
})
export class PortfolioComponent {
  private profileService: ProfileService = inject(ProfileService);
  profile$ = this.profileService.profile$;
  webPage: WebPage[] = [];
  
  obtenerLosTipos(): WebPage[] {
    const unicos: string[] = [];
    return this.webPage.reduce((reduciendo, valor) => {
      if (!unicos.includes(valor.type)) {
        unicos.push(valor.type);
        reduciendo.push({ type: valor.type,
          position: 1, 
          title: '',    
          description: '', 
          link: '',     
          image: '' 
         });
      }
      return reduciendo;
    }, [] as WebPage[]);
  }

  // types: string[] = ['CAT', 'NATURE', 'MARRIES'];
}
