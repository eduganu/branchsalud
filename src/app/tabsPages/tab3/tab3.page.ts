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

  user: User = undefined;
  steps: StepInfo[] = undefined;
  fechas: Date[] = [];
  registroPaso:number[] = [];
  hoy:Date = environment.systemDate;

  datos:any = {
    type: "bar",
    data: {
      labels: [], //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "pasos",
          data: [], //[12, 19, 3, 5, 2, 3],
          
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
 
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    //Obtenemos los datos del usuario predefinido
    this.userService.getUserInfo().subscribe(datos => {
      console.log(datos);
    })

    this.userService.getPasos(new Date(this.hoy.getTime() - 86400000), new Date(this.hoy)).subscribe(pasos =>  {
       this.steps = pasos;
       console.log(this.steps)

       /*this.steps.forEach(element => {
          this.fechas.push(element.datetime);
          this.registroPaso.push(element.stepAccumulated)
          */
        this.porHoras();
    })

    this.initGraph(this.datos);
  }

  initGraph(datos){
    this.barChart = new Chart(this.barCanvas.nativeElement, datos);
  }

  prueba() {
      this.datos.data.labels =  ["rojo ", "Blue", "amarilo", "Green", "Purple", "Orange"]; //this.fechas,//
      this.datos.data.datasets[0].data = [100, 19, 3, 50, 90, 5];
      
      this.initGraph(this.datos);
  }

  

  datosSemana() {
    this.userService.getPasos(new Date(this.hoy.getTime() - (604800000 - 36000000)), new Date(this.hoy)).subscribe(pasos =>{ //
      this.steps = pasos;

      this.porDias()
    })

    
  }

  datosDia() {
    this.userService.getPasos(new Date(this.hoy.getTime() - 86400000), new Date(this.hoy)).subscribe(pasos =>{
      this.steps = pasos;

      this.porHoras()
    })

    
  }

  porDias(){

    let listaPorDias = [];
    let dias = [];
    let registros = [];

    console.log(this.steps)
    this.steps.forEach(element =>{
      let dia = new Date(element.datetime).getUTCDay();
      console.log("Dia " + dia);
      if (!listaPorDias[dia]) {
        listaPorDias[dia] = [];
      }
      listaPorDias[dia].push(element.stepAccumulated);
    })
 
    let diaIndice = 0
    

    listaPorDias.forEach(elemento => {
      dias.push(diaIndice);
      let total = 0;
      for (var i = 0; i < elemento.length; i++){
        total += elemento[i] 
      }
      //let average = Math.round(total / elemento.length);
      registros.push(total)
      diaIndice++;

    })
    
    console.log(dias)
    console.log(registros)
    this.datos.data.labels =  dias; //this.fechas,//
    this.datos.data.datasets[0].data = registros;
    
    this.initGraph(this.datos);

  }

  porHoras() {
    
    let listaPorHoras = [];
    let horas = [];
    let registros = [];
    /*
    const listado = this.steps.reduce((listado, registros) => {
      const horis = new Date(registros.datetime).toTimeString().substr(0,2);
      if (!listado[horis]) {
        listado[horis] = [];
      }
      listado[horis].push(registros.stepAccumulated);
      return listado;
    }, []);

    console.log(listado)
  */

    this.steps.forEach(element =>{
      let horas = new Date(element.datetime).getUTCHours();
      //console.log("Horas " + element.datetime);
      if (!listaPorHoras[horas]) {
        listaPorHoras[horas] = [];
      }
      listaPorHoras[horas].push(element.stepAccumulated);
    })
    

    let horaIndice = 0;
    listaPorHoras.forEach(elemento => {
      horas.push(horaIndice);
      let total = 0;
      for (var i = 0; i < elemento.length; i++){
        total += elemento[i] 
      }
      //let average = Math.round(total / elemento.length);
      registros.push(total)
      horaIndice++;

    })
    
    console.log(horas)
    console.log(registros)
    this.datos.data.labels =  horas; //this.fechas,//
    this.datos.data.datasets[0].data = registros;
    
    this.initGraph(this.datos);
  }
  
}