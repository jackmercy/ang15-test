import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfModule } from '@rx-angular/template/if';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, IfModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() loading: boolean = false;
}
