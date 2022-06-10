import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DrainDto } from 'src/models/DrainDto.model';
import { DrainLevelDto } from 'src/models/DrainLevelDto.model';
import { DrainPage } from 'src/models/DrainPage.model';

@Injectable({
  providedIn: 'root'
})
export class DrainServiceService {

  baseUrl: string = "https://localhost:44339/api/OpenDrains";
  constructor(private http: HttpClient) { }
  openDrainList: DrainDto[];
  openDrain: DrainDto;

  DrainPage: DrainPage
  GetAllDrains(page: number, pageSize: number) {
    this.http.get(`${this.baseUrl}/${page}/${pageSize}`).subscribe(
      res => {
        this.DrainPage = res as DrainPage
      },
      err => {

      }
    )
  }


  GetDrainWithLevels(id: any) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateDrainWithLevels(openDrain: DrainDto) {
    return this.http.put(`${this.baseUrl}/${openDrain.OdmId}`, openDrain)
  }

  FilterDrains(filter:any) {
    console.log(filter);

    return this.http.post(`${this.baseUrl}/Filter`,filter).subscribe(
      res => {
        this.DrainPage = res as DrainPage
        console.log( this.DrainPage)
      },
      err => {

      }
    );

  }

  DeleteLevels(MeasureDate:any , OdmId :number) {
    return this.http.delete(`${this.baseUrl}/${MeasureDate}/${OdmId}`);
  }


}
