import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroFormComponent } from './pages/hero/components/hero-form/hero-form.component';
import { HeroListComponent } from './pages/hero/components/hero-list/hero-list.component';
import { HeroDetailComponent } from './pages/hero/components/hero-detail/hero-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/heroes', pathMatch: 'full' },
    { path: 'heroes/new', component: HeroFormComponent },
    { path: 'heroes/edit/:id', component: HeroFormComponent },
    { path: 'heroes', component: HeroListComponent },
    { path: 'heroes/:id', component: HeroDetailComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { } 