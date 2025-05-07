import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
    standalone: true,
  imports: [
    RouterModule
  ]
})
export class HeroListComponent implements OnInit {
    // heroes: Hero[] = [];

    constructor() { }

    ngOnInit(): void {
        // this.loadHeroes();
    }

    // loadHeroes(): void {
    //     this.heroService.getHeroes().subscribe({
    //         next: (heroes) => this.heroes = heroes,
    //         error: (error) => console.error('Erro ao carregar heróis:', error)
    //     });
    // }

    // deleteHero(id: number): void {
    //     if (confirm('Tem certeza que deseja excluir este herói?')) {
    //         this.heroService.deleteHero(id).subscribe({
    //             next: () => {
    //                 this.heroes = this.heroes.filter(hero => hero.id !== id);
    //                 alert('Herói excluído com sucesso!');
    //             },
    //             error: (error) => console.error('Erro ao excluir herói:', error)
    //         });
    //     }
    // }
}