import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/main/footer/footer.component';
import { ToolbarComponent } from 'src/main/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    ToolbarComponent,
    FooterComponent
  ],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const importTE = async () => {
      await import('tw-elements');
    };
    importTE();
  }
}
