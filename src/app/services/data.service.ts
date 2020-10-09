import { Injectable } from '@angular/core';
import {PersonaService} from './apiService/persona.service'
import {RegionService} from './apiService/region.service'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private regionData;
  private personaData;
  
  constructor(private regionService:RegionService,private personaService:PersonaService) { 
    this.regionData = [];
    this.personaData = [];
    this.loadRegionData(() => console.log("Persona data loaded"));
    this.loadPersonaData(() => console.log("Region data loaded"));
    
  }
  private loadRegionData(cb:Function){
      return this.regionService.getFromApi().subscribe((res=>{
      this.regionData= res;
      cb();
    }));
  }
  private loadPersonaData(cb:Function){
    return this.personaService.getFromApi().subscribe((res=>{
    this.personaData= res;
    cb();
    }));
  }
  public getData(){
    return {personas:this.personaData,regiones:this.regionData}
  }
}
