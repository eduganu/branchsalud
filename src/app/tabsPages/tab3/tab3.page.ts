import { Component, OnInit } from '@angular/core';

//Models
import { User } from 'src/app/models/User';

// Services
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  user: User = undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    //Obtenemos los datos del usuario predefinido
    this.userService.getUserInfo().subscribe(datos => {
      console.log(datos);
    })
  }

}
