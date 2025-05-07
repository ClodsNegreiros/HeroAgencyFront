import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { SuperHero } from '../../../../models/interfaces/SuperHero';
import { HeroService } from '../../../../services/hero.service';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatProgressBarModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
    ]
})
export class HeroDetailComponent implements OnInit {
    hero: SuperHero | null = null;
    isLoading = false;
    error: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private heroService: HeroService
    ) { }

    ngOnInit(): void {
        this.loadHero();
    }

    loadHero(): void {
        this.isLoading = true;
        this.error = null;

        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (!id) {
            this.error = 'ID do herói não encontrado';
            this.isLoading = false;
            return;
        }

        this.heroService.getHeroById(id).subscribe({
            next: (hero) => {
                this.hero = hero;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Erro ao carregar herói:', error);
                this.error = 'Não foi possível carregar os detalhes do herói';
                this.isLoading = false;
            }
        });
    }

    goBack(): void {
        this.router.navigate(['/heroes']);
    }

    editHero(): void {
        if (this.hero?.id) {
            this.router.navigate(['/heroes/edit', this.hero.id]);
        }
    }
} 