import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/services/user.service';
import { BpmInfo } from 'src/app/models/BpmInfo';
import { element } from 'protractor';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

registrosPulsaciones:BpmInfo[] = [];
hoy:Date = environment.systemDate;
deltaTime = 0

dataOriginal = {
  datasets: [{
    label: 'Pulsaciones por minuto',
    data: [],
    backgroundColor: 'rgb(205, 65, 65)', 
    borderColor: 'rgb(205, 65, 65)',
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
            
            
        }],
        yAxes:[{
          ticks : {min:0}
        }]
    }
}
}
  
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getPulsaciones(new Date(this.hoy.getTime() - 86400000),this.hoy).subscribe(datos => {
      this.registrosPulsaciones = datos;
      let parsedDatos = [];
      datos.forEach(element => {
        parsedDatos.push({x:element.datetime , y:element.bpm})
        
      });

      this.dataOriginal.datasets[0].data = parsedDatos;
      this.showBpmTiempo("dia");

    })

  }


  initGraph(datos){
    this.barChart = new Chart(this.barCanvas.nativeElement, datos);
  }

  showBpmTiempo(lapso:string){
    
    if (lapso === "semana"){
      this.deltaTime = 604800000
      
    } else if (lapso === "dia") {
      this.deltaTime = 86400000
    }

    this.userService.getPulsaciones(new Date(this.hoy.getTime() - this.deltaTime),this.hoy).subscribe(datos => {
      let parsedDatosDia = [];
      let fechasref = []
      datos.forEach(element => {
        let anyo = new Date(element.datetime).getUTCFullYear();
        let mes = new Date(element.datetime).getUTCMonth();
        let dia = new Date(element.datetime).getUTCDay();
        let hora = new Date(element.datetime).getUTCHours();
        let fecha = new Date(anyo + "/" + mes + "/" + dia + " " + hora + ":00:00")
        if (lapso === "semana"){
          fecha = new Date(anyo + "/" + mes + "/" + dia + " " + "00:00:00")
          
        } else if (lapso === "dia") {
          fecha = new Date(anyo + "/" + mes + "/" + dia + " " + hora + ":00:00")
        }
        
        //console.log(fecha)
        
        parsedDatosDia.push({x:fecha, y:element.bpm})

        if (!fechasref.includes(fecha)){
          fechasref.push(fecha)
        }
        
      })

      let nuevaArrayAgrupada = []
      let dia = parsedDatosDia[0].x;
      console.log(parsedDatosDia[0].x.getTime() === parsedDatosDia[1].x.getTime())
      let valores = [];
      for (let i = 0; i < parsedDatosDia.length; i++){
        if(parsedDatosDia[i].x.getTime() === dia.getTime()){
          
          valores.push(parsedDatosDia[i].y);
        } else {
          
          if(valores.length > 0){
            let suma = valores.reduce((total,amount) => total + amount)
            nuevaArrayAgrupada.push({x:dia, y:(Math.round(suma/valores.length))})
            dia = parsedDatosDia[i].x;
            suma = 0
            valores = []
          }
        }
      }
      if(valores.length > 0){
        let suma = valores.reduce((total,amount) => total + amount)
        nuevaArrayAgrupada.push({x:dia, y:(Math.round(suma/valores.length))})
        dia = parsedDatosDia[parsedDatosDia.length-1].x;
        suma = 0
        valores = []
      }

      this.dataOriginal.datasets[0].data = nuevaArrayAgrupada;
      this.initGraph(this.datos);
    })
  }
}


