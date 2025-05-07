import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';

import { SuperHero } from '../../../../models/interfaces/SuperHero';
import { Superpower } from '../../../../models/interfaces/superpower';
import { HeroService } from '../../../../services/hero.service';

@Component({
    selector: 'app-hero-form',
    templateUrl: './hero-form.component.html',
    styleUrls: ['./hero-form.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatCardModule
    ]
})
export class HeroFormComponent implements OnInit {
    heroForm: FormGroup;
    isEditing = false;
    heroId?: number;
    superpowers: Superpower[] = [];
    isLoading = false;
    error: string | null = null;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private heroService: HeroService
    ) {
        this.heroForm = this.fb.group({
            name: ['', [Validators.required]],
            heroName: ['', [Validators.required]],
            birthDate: ['', [Validators.required]],
            height: ['', [Validators.required, Validators.min(0)]],
            weight: ['', [Validators.required, Validators.min(0)]],
            superpowers: [[], [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.loadSuperpowers();
        this.heroId = Number(this.route.snapshot.paramMap.get('id'));
        if (this.heroId) {
            this.isEditing = true;
            this.loadHero();
        }
    }

    loadSuperpowers(): void {
        this.isLoading = true;
        this.error = null;
        console.log('Iniciando carregamento dos superpoderes...');

        this.heroService.getSuperpowers().subscribe({
            next: (powers) => {
                console.log('Superpoderes carregados com sucesso:', powers);
                this.superpowers = powers;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Erro detalhado ao carregar superpoderes:', {
                    status: error.status,
                    message: error.message,
                    error: error.error
                });
                this.error = `Erro ao carregar superpoderes: ${error.status} - ${error.message}`;
                this.isLoading = false;
            }
        });
    }

    loadHero(): void {
        if (!this.heroId) return;

        this.isLoading = true;
        this.heroService.getHeroById(this.heroId).subscribe({
            next: (hero) => {
                this.heroForm.patchValue({
                    name: hero.name,
                    heroName: hero.heroName,
                    birthDate: new Date(hero.birthDate),
                    height: hero.height,
                    weight: hero.weight,
                    superpowers: hero.superpowers?.map(p => p.id) || []
                });
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Erro ao carregar herói:', error);
                this.error = 'Não foi possível carregar os dados do herói';
                this.isLoading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.heroForm.invalid) return;

        this.isLoading = true;
        const formValue = this.heroForm.value;
        const heroData: SuperHero = {
            name: formValue.name,
            heroName: formValue.heroName,
            birthDate: formValue.birthDate.toISOString(),
            height: formValue.height,
            weight: formValue.weight,
            SuperHeroPowersIds: formValue.superpowers
        };

        const request = this.isEditing
            ? this.heroService.updateHero(this.heroId!, heroData)
            : this.heroService.createHero(heroData);

        request.subscribe({
            next: () => {
                this.isLoading = false;
                this.router.navigate(['/heroes']);
            },
            error: (error) => {
                console.error('Erro ao salvar herói:', error);
                this.error = 'Não foi possível salvar o herói';
                this.isLoading = false;
            }
        });
    }

    onSuperpowerChange(powerId: number, isChecked: boolean): void {
        const currentPowers = this.heroForm.get('superpowers')?.value || [];
        const updatedPowers = isChecked
            ? [...currentPowers, powerId]
            : currentPowers.filter((id: number) => id !== powerId);

        this.heroForm.patchValue({ superpowers: updatedPowers });
    }
}