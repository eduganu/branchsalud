import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabsPages/tabs/tabs.module').then(m => m.TabsPageModule)
  },  {
    path: 'tab4',
    loadChildren: () => import('./tabsPages/tab4/tab4.module').then( m => m.Tab4PageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
