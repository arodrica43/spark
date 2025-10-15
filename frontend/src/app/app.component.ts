import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="container">
      <header>
        <h1>Spark Application</h1>
        <p>Angular 17 + Flask 3 + Spark 3.5</p>
      </header>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    header {
      padding: 20px 0;
      border-bottom: 2px solid #007bff;
      margin-bottom: 30px;
    }
    h1 {
      color: #007bff;
    }
    p {
      color: #666;
    }
  `]
})
export class AppComponent {
  title = 'spark-frontend';
}
