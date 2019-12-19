import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

//Models
import { User } from 'src/app/models/User';

// Services
import { UserService } from 'src/app/services/user.service';

import { Chart } from 'chart.js';
import { StepInfo } from 'src/app/models/StepInfo';
import { element } from 'protractor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit{

  @ViewChild("barCanvas",{static:true}) barCanvas: ElementRef;

  private barChart: Chart;


  registroPasos: StepInfo[] = [];
  hoy:Date = environment.systemDate;
  deltaTime = 0

  dataGraficoPasos = {
    datasets: [{
      label: 'Pasos acumulados',
      data: [],
      backgroundColor: 'rgb(205, 65, 65)', 
      borderColor: 'rgb(230, 10, 10)',
      borderWidth: 1
    }]
  }

  datos:any = {
    type: "bar",
    data: this.dataGraficoPasos,
    options: {
      scales: {
          xAxes: [{
              type: 'time',
              distribution : 'series',
          }],
          yAxes:[{
            ticks : {beginAtZero:true}
          }]
      }
  }
  }
 
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    //Obtenemos los datos del usuario predefinido
    this.userService.getUserInfo().subscribe(datos => {
      console.log(datos);
    })

    this.userService.getPasos(new Date(this.hoy.getTime() - 86400000), new Date(this.hoy)).subscribe(pasos =>  {
      this.registroPasos = pasos;
      //console.log(this.registroPasos)

      let parsedDatos = [];
      pasos.forEach(element => {
      parsedDatos.push({x:element.datetime , y:element.stepAccumulated})
      
      });
      this.dataGraficoPasos.datasets[0].data = parsedDatos;
      console.log(parsedDatos)
      
      this.showPasosTiempo("dia");
    })
    
  }

  initGraph(datos){
    this.barChart = new Chart(this.barCanvas.nativeElement, datos);
  }
 

  showPasosTiempo(lapso:string){

    if (lapso === "semana"){
      this.deltaTime = 604800000
      
    } else if (lapso === "dia") {
      this.deltaTime = 86400000
    }

    this.userService.getPasos(new Date(this.hoy.getTime() - this.deltaTime),this.hoy).subscribe(datos => {
      
      let parsedDatosDia = [];
      let fechasref = [];

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
        
        parsedDatosDia.push({x:fecha, y:element.stepAccumulated})

        if (!fechasref.includes(fecha)){
          fechasref.push(fecha)
        }
        
      })

      let nuevaArrayAgrupada = []
      let dia = parsedDatosDia[0].x;
      let valores = [];
      for (let i = 0; i < parsedDatosDia.length; i++){

        if(parsedDatosDia[i].x.getTime() === dia.getTime()) {

          valores.push(parsedDatosDia[i].y);

        } else {

          if(valores.length > 0) {

            let suma = valores.reduce((total,amount) => total + amount)
            nuevaArrayAgrupada.push({x:dia, y:suma})
            dia = parsedDatosDia[i].x;
            suma = 0
            valores = []

          }
        }
      }

      if(valores.length > 0) {

        let suma = valores.reduce((total,amount) => total + amount)
        nuevaArrayAgrupada.push({x:dia, y:(Math.round(suma/valores.length))})

        dia = parsedDatosDia[parsedDatosDia.length-1].x;
      
        suma = 0
        valores = []

      }

      this.dataGraficoPasos.datasets[0].data = nuevaArrayAgrupada;
      this.initGraph(this.datos);
    })
  }

  showPasosSemana(){
    this.userService.getPasos(new Date(this.hoy.getTime() - 604800000),this.hoy).subscribe(datos => {
      
      let parsedDatosDia = [];
      let fechasref = [];

      datos.forEach(element => {
        let anyo = new Date(element.datetime).getUTCFullYear();
        let mes = new Date(element.datetime).getUTCMonth();
        let dia = new Date(element.datetime).getUTCDay();
        let hora = new Date(element.datetime).getUTCHours();
        let fecha = new Date(anyo + "/" + mes + "/" + dia + " " + "00:00:00")
        
        parsedDatosDia.push({x:fecha, y:element.stepAccumulated})

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
            nuevaArrayAgrupada.push({x:dia, y:suma})
            dia = parsedDatosDia[i].x;
            suma = 0
            valores = []
          }
        }
      }
      if(valores.length > 0){
        let suma = valores.reduce((total,amount) => total + amount)
        nuevaArrayAgrupada.push({x:dia, y:(Math.round(suma/valores.length))})
        dia = parsedDatosDia[-1].x;
        suma = 0
        valores = []
      }

      this.dataGraficoPasos.datasets[0].data = nuevaArrayAgrupada;
      this.initGraph(this.datos);
    })
  }

  
}