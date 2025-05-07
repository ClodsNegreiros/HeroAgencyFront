import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.scss'],
    standalone: true,
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
      ]

})
export class HeroDetailComponent {
    isLoading = false;

    constructor(
    ) { }
} 