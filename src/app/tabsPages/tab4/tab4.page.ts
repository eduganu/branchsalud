import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/services/user.service';
import { BpmInfo } from 'src/app/models/BpmInfo';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

registrosPulsaciones:BpmInfo[] = [];
hoy:Date = environment.systemDate;

dataDies = [{
  x: new Date("2019/11/11"),
  y: 1
}, {
  x: new Date("2019/11/12"),
  y: 10
}, {
  x: new Date("2019/11/13"),
  y: 5
}]

dataOriginal = {
  //labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
  datasets: [{
    label: 'Pulsaciones por minuto',
    data: this.dataDies,//[2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
    backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
    borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
    borderWidth: 1
  }]
}



@ViewChild("barCanvas", {static:true}) barCanvas: ElementRef;

private barChart: Chart;
datos:any = {
  type: "bar",
  data: this.dataOriginal,
  options: {
    scales: {
        xAxes: [{
            type: 'time',
            distribution : 'series',
            time: {
                unit: 'hour'
            }
        }]
    }
}
}
  

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getPulsaciones(new Date(this.hoy.getTime() - 86400000),this.hoy).subscribe(datos => {
      this.registrosPulsaciones = datos;
      console.log(this.registrosPulsaciones)
      let parsedDatos = [];
      datos.forEach(element => {
        parsedDatos.push({x:element.datetime , y:element.bpm})
        
      });
      this.dataOriginal.datasets[0].data = parsedDatos; // [{x:new Date(), y:1}]
      //this.datos.data.datasets.data = datos;
      console.log(this.datos)
      
      this.initGraph(this.datos);
    })

    //this.initGraph(this.datos);
  }


  initGraph(datos){
    this.barChart = new Chart(this.barCanvas.nativeElement, datos);
  }
}
