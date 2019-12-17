import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

declare var google;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  
  procesoBpmID = undefined;
  currentBPM : number = Math.floor(Math.random() * 4 + 57);
  caloriesBurned: number = 578;
  calories: number = 578;
  steps: number = 6798;

  user: User = new User();

  date1:Date = new Date("2019/11/17 00:00:00 UTC");
  date2:Date = new Date("2019/11/17 01:00:00 UTC");

  constructor(private userService: UserService) {
    this.userService.getUserInfo().subscribe(datos => {
      this.user = datos[0];
    });

    this.userService.getPulsaciones(this.date1,this.date2).subscribe(datos => {
      console.log(datos);
    });

    this.userService.getPasos(this.date1,this.date2).subscribe(datos => {
      console.log(datos);
    });
  }
  

  ngOnInit(): void {
    this.procesoBpmID = setInterval(() => {
        this.currentBPM = Math.floor(Math.random() * 4 + 57);
        console.log(this.caloriesFormula());
        this.caloriesBurned += this.caloriesFormula(); 
        this.calories = Math.floor(10*this.caloriesBurned)/10
    }, 5000);
  }

  ngOnDestroy() {
    if (this.procesoBpmID) {
      clearInterval(this.procesoBpmID);
    }
  }

  caloriesFormula() {
    let UserAge = 20;//this.user.fechaNacimiento
    if (this.user.sexo == "Hombre"){
      return Math.floor(
        1000*(-55.0969 + (0.6309 * this.currentBPM) + (0.1988 * this.user.peso) + (0.2017 * UserAge)) / 
        (4.184*12) //intervalos de 5s
      )/1000
    }
    else {
      return Math.floor(
        1000*(-20.4022 + (0.4472 * this.currentBPM) - (0.1263 * this.user.peso) + (0.074 * UserAge)) /
        (4.184*12) //intervalos de 5s
      )/1000
    }
  }

  showChartSuenoMiDia () {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Sueño profundo', 3],
      ['Sueño ligero', 1],
      
    ]);
  
    // Set chart options
    var options = {'Sueño profundo':4,
                   'Sueño ligero':3},
    pieHole: 0.4;
  
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_SuenoMiDia'));
        chart.draw(data, options);
   
    }

}
