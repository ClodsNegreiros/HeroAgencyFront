import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SuperHero } from '../../../../models/interfaces/SuperHero';
import { HeroService } from '../../../../services/hero.service';

@Component({
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.scss'],
    standalone: true,
    imports: [
        RouterModule,
        CommonModule
    ]
})
export class HeroListComponent implements OnInit {
    heroes: SuperHero[] = [];
    loading: boolean = false;
    error: string | null = null;

    constructor(private heroService: HeroService) { }

    ngOnInit(): void {
        this.loadHeroes();
    }

    loadHeroes(): void {
        this.loading = true;
        this.error = null;

        this.heroService.getHeroes().subscribe({
            next: (heroes) => {
                this.heroes = heroes;
                this.loading = false;
            },
            error: (error) => {
                console.error('Erro ao carregar heróis:', error);
                this.error = 'Não foi possível carregar a lista de heróis. Por favor, tente novamente.';
                this.loading = false;
            }
        });
    }

    deleteHero(id: number): void {
        if (confirm('Tem certeza que deseja excluir este herói?')) {
            this.loading = true;
            this.heroService.deleteHero(id).subscribe({
                next: () => {
                    this.heroes = this.heroes.filter(hero => hero.id !== id);
                    this.loading = false;
                    alert('Herói excluído com sucesso!');
                },
                error: (error) => {
                    console.error('Erro ao excluir herói:', error);
                    this.error = 'Não foi possível excluir o herói. Por favor, tente novamente.';
                    this.loading = false;
                }
            });
        }
    }
}