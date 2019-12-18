import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule implements OnInit{
  
  user:User = new User();
  
  constructor(private userService: UserService) {
    this.userService.getUserInfo().subscribe(datos => {
      this.user = datos[0];
    });
  }
  
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  

  

  



}
