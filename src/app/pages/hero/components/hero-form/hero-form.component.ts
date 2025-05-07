import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-hero-form',
    templateUrl: './hero-form.component.html',
    imports: [ReactiveFormsModule],
    styleUrls: ['./hero-form.component.scss'],
    standalone: true
})
export class HeroFormComponent {
    heroForm: FormGroup;
    isEditing = false;
    heroId?: number;

    constructor(
        private fb: FormBuilder,
    ) {
        this.heroForm = this.fb.group({
            nome: ['', [Validators.required]],
            nomeHeroi: ['', [Validators.required]],
            dataNascimento: ['', [Validators.required]],
            altura: ['', [Validators.required, Validators.min(0)]],
            peso: ['', [Validators.required, Validators.min(0)]],
            superpoderes: [[], [Validators.required]]
        });
    }
}