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

@ViewChild("lineCanvas", {static:true}) barCanvas: ElementRef;

private barChart: Chart;
datos:any = {
  type: "bar",
  data: {
    labels: [], 
    datasets: [
      {
        label: "pasos",
        data: [],
        
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
}
  

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getPulsaciones(new Date(this.hoy.getTime() - 86400000),this.hoy).subscribe(datos => {
      this.registrosPulsaciones = datos;
      console.log(this.registrosPulsaciones)
      this.datos.data = datos;
      console.log(this.datos)
      
      this.initGraph(this.datos);
    })
  }


  initGraph(datos){
    this.barChart = new Chart(this.barCanvas.nativeElement, datos);
  }
}
