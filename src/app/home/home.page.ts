import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  @ViewChild('map') mapRef: ElementRef;

  map: google.maps.Map; // localização
  center = new google.maps.LatLng(-22.524722572647146, -48.560113055895634);
  coordinates: Position;

  constructor() {}

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: this.center,
      zoom: 15
    });

  }

  ngOnInit(): void {
    this.initMap();
    this.buscarPosicao();
  }

  async buscarPosicao(){ // Metodo =>  buscar posicao atual
    this.coordinates = await Geolocation.getCurrentPosition();
    this.irParaPosicao();
  }

  irParaPosicao(){ // metodo => depois de buscar a posicao ira mostrar o local
  this.center = new google.maps.LatLng(this.coordinates.coords.latitude, this.coordinates.coords.longitude);


  this.map.setCenter(this.center);
  this.map.setZoom(18);

  new google.maps.Marker({ // Marcador ícone
    position: this.center,
    map: this.map,
    title: 'Localização atual',
    animation:google.maps.Animation.BOUNCE // EVENTO DO MARCADOR

  });

  }

}

