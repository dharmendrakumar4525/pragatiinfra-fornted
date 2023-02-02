import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<div style="padding: 1.5rem;"><h1>Dpr</h1></div>
  <button [routerLink]="['/add-project']" >
  go to add project screen
</button>

<button [routerLink]="['/view-project']" >
  go to project view
</button>`,
  styles: [`h1 { font-family: 'Poppins', sans-serif !important; }`]
})
export class HomeComponent  {
}
