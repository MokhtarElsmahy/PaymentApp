import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DrainDto } from 'src/models/DrainDto.model';
import { SearchFilter } from 'src/models/SearchFilter.model';

@Injectable({
  providedIn: 'root'
})
export class OpenDrainService {

  constructor(private http: HttpClient) { }
  baseUrl = "https://localhost:7251/api/OpenDrains";

  Search(Search: any , include : string,Page : number)
  {
    return this.http.put(`${this.baseUrl}/${include}/${Page}`, Search)
  }

  Save(DrainDto :DrainDto){
    return this.http.put(`${this.baseUrl}/${DrainDto.OdmId}`, DrainDto)
  }

  DeleteLevels(MeasureDate:any , OdmId :number) {
    return this.http.delete(`${this.baseUrl}/${MeasureDate}/${OdmId}`);
  }
}
