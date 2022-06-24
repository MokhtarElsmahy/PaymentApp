import { Component, OnInit } from '@angular/core';
import { DrainPage } from 'src/models/DrainPage.model';
import { OpenDrainService } from 'src/services/open-drain.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DrainLevelDto } from 'src/models/DrainLevelDto.model';
import { DrainDto } from 'src/models/DrainDto.model';
import { SearchFilter } from 'src/models/SearchFilter.model';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-open-drain',
  templateUrl: './open-drain.component.html',
  styleUrls: ['./open-drain.component.css']
})
export class OpenDrainComponent implements OnInit {


  constructor(public Service: OpenDrainService,private toastr: ToastrService) { }

  page = 1;
  pageSize = 1;
  openDrain: DrainDto = new DrainDto
  Drain: DrainPage = new DrainPage();

  DeletedOdmId :number = -1;
  DeletedMeasureDate : Date = new Date();
  DeltedIndex :number

  PagedSearchFilter = {
    OdmId: 0,
    Odmid1: "",
    OdmIdParent: "",
    StartRank: 0,
    AOdmName: "",
    EOdmName: "",
    StartLength: 0,
    StartArea: 0,
    StartYear: new Date(),

    EndLength: 0,
    EndArea: 0,
    EndYear: new Date(),
    RowStatus: 1,
    isActive :1
  }


  SearchFilter = {
    OdmId: 0,
    Odmid1: "",
    OdmIdParent: "",
    StartRank: 0,
    AOdmName: "",
    EOdmName: "",
    StartLength: 0,
    StartArea: 0,
    StartYear:new Date (),

    EndLength: 0,
    EndArea: 0,
    EndYear: new Date(),
    RowStatus: 1,
    isActive :1



  }
  ngOnInit(): void {
  }


  Search(form :NgForm) {

    this.Service.Search(this.SearchFilter, "DrainLevels", this.page).subscribe(

      res => {
        this.Drain = res as DrainPage;
        form.form.markAsPristine();
        console.log(this.Drain)
        this.SearchFilter.AOdmName = this.Drain?.OpenDrain[0]?.AOdmName;
        this.SearchFilter.StartYear = this.Drain?.OpenDrain[0]?.Year;
        this.SearchFilter.EOdmName = this.Drain?.OpenDrain[0]?.EOdmName;
        this.SearchFilter.StartLength = this.Drain?.OpenDrain[0]?.Length;
        this.SearchFilter.StartArea = this.Drain?.OpenDrain[0]?.Area;
        this.SearchFilter.StartRank = this.Drain?.OpenDrain[0]?.Rank;
        this.SearchFilter.OdmIdParent = this.Drain?.OpenDrain[0]?.OdmIdParent;
        this.SearchFilter.OdmId = this.Drain?.OpenDrain[0]?.OdmId;
        this.SearchFilter.RowStatus = 1;
      
      },
      err => {this.toastr.error("Error")}
    );


    this.PagedSearchFilter = Object.assign({}, this.SearchFilter);
    

    //this.SearchFilter.AOdmName = this.Drain.OpenDrain[0].AOdmName;

  }
  GoToPage(event: number,form :NgForm) {
   
    //  console.log("PagedSearchFilter",this.PagedSearchFilter);
    if (form.dirty) {
      this.toastr.error("Press (Save) to save the Changes you made")
       console.log(event ,  this.page ,event)
      
      return;
    }
    if (this.PagedSearchFilter.isActive == 0) {
      this.toastr.error("You must Filter first");
      return;
    }

    this.page = event;
    this.Service.Search(this.PagedSearchFilter, "DrainLevels", this.page).subscribe(

      res => {
        this.Drain = res as DrainPage;
        this.SearchFilter.AOdmName = this.Drain?.OpenDrain[0]?.AOdmName;
        this.SearchFilter.StartYear = this.Drain?.OpenDrain[0]?.Year;
        this.SearchFilter.EOdmName = this.Drain?.OpenDrain[0]?.EOdmName;
        this.SearchFilter.StartLength = this.Drain?.OpenDrain[0]?.Length;
        this.SearchFilter.StartArea = this.Drain?.OpenDrain[0]?.Area;
        this.SearchFilter.StartRank = this.Drain?.OpenDrain[0]?.Rank;
        this.SearchFilter.OdmId = this.Drain?.OpenDrain[0]?.OdmId;
        this.SearchFilter.RowStatus = 1;
        

      },
      err => {this.toastr.error("Error")}
    );

   
    //this.SearchFilter.AOdmName = this.Drain.OpenDrain[0].AOdmName;


  }

  Clear() {
    this.SearchFilter.AOdmName = "";
    this.SearchFilter.StartYear = new Date();
    this.SearchFilter.EOdmName = "";
    this.SearchFilter.StartLength = 0;
    this.SearchFilter.StartArea = 0;
    this.SearchFilter.StartRank = 0;
    this.SearchFilter.OdmIdParent = "";
    this.Drain.OpenDrain[0].DrainLevels = [];

    this.PagedSearchFilter.OdmId=0,
    this.PagedSearchFilter.Odmid1= "",
    this.PagedSearchFilter.OdmIdParent= "",
    this.PagedSearchFilter.StartRank= 0,
    this.PagedSearchFilter.AOdmName= "",
    this.PagedSearchFilter.EOdmName= "",
    this.PagedSearchFilter.StartLength= 0,
    this.PagedSearchFilter.StartArea= 0,
    this.PagedSearchFilter.StartYear= new Date(),
    this.PagedSearchFilter.EndLength= 0,
    this.PagedSearchFilter.EndArea= 0,
    this.PagedSearchFilter.EndYear= new Date(),
    this.PagedSearchFilter.RowStatus= 1
    this.PagedSearchFilter.isActive= 0
   // this.PagedSearchFilter = {};
  }

  AddLevel() {
    this.Drain?.OpenDrain[0].DrainLevels.push({
      OdmId: 0,
      MeasureDate: new Date(),
      DcdId: 0,
      DdgId: 0,
      SinkId: 0,
      UsualLevel: 0,
      ActualLevel: 0,
      Note: "",
      isUpdated: false,
      isAdded: true,
      RowStatus: 4
    })
  }

  LevelChangeStatus(DrainLevel: DrainLevelDto) {
    if (DrainLevel.OdmId != 0)
      DrainLevel.RowStatus = 3;
    else
      DrainLevel.RowStatus = 4;

  }

  DrainChangeStatus() {
    this.SearchFilter.RowStatus = 3;
  }


  Save(form :NgForm) {
    //console.log(this.SearchFilter);

    if (this.Drain?.OpenDrain[0]) {
      
      this.Drain.OpenDrain[0].AOdmName = this.SearchFilter.AOdmName
      this.Drain.OpenDrain[0].Year = this.SearchFilter.StartYear
      this.Drain.OpenDrain[0].EOdmName = this.SearchFilter.EOdmName
      this.Drain.OpenDrain[0].Length = this.SearchFilter.StartLength
      this.Drain.OpenDrain[0].Area = this.SearchFilter.StartArea
      this.Drain.OpenDrain[0].Rank = this.SearchFilter.StartRank
      this.Drain.OpenDrain[0].OdmId = this.SearchFilter.OdmId
      this.Drain.OpenDrain[0].RowStatus = this.SearchFilter.RowStatus;
      this.Drain.OpenDrain[0].DrainLevels.forEach(element => {
        if (element.RowStatus==4) {
          element.MeasureDate.setDate(element.MeasureDate.getDate()+1)
        }
      });
    }
    //console.log(this.Drain?.OpenDrain[0]);

    this.Service.Save(this.Drain.OpenDrain[0]).subscribe(
      res=>{this.toastr.success("Saved Successfully"); form.form.markAsPristine();},
      err => {this.toastr.error("Error")}
    )
    //this.Drain?.OpenDrain[0].DrainLevels
  }

  GetLevel(OdmId: number, MeasureDate: any, i: number) {
   // alert(OdmId)
   this.DeletedOdmId = OdmId;
   this.DeletedMeasureDate = MeasureDate;
   this.DeltedIndex = i;
   $("#row_" + i).css("background-color", "red").siblings().css("background-color", "white")
   console.log(this.DeletedOdmId ,this.DeletedMeasureDate,this.DeltedIndex )
  }

  Delete(){


    if(this.DeletedOdmId==-1){
      this.toastr.error("please choose level")
      return;
    }

    let level = this.Drain.OpenDrain[0]?.DrainLevels?.find(c => c.OdmId == this.DeletedOdmId && c.MeasureDate == this.DeletedMeasureDate);
    if (level != null || level != undefined) {
      level.RowStatus = 2  //deleted;
      this.toastr.info("Press (Save) to Confirm Delete")

    }

   
    if(this.DeletedOdmId==0){
     this.Drain.OpenDrain[0]?.DrainLevels?.splice(this.DeltedIndex,1);
     this.toastr.success("Deleted Successfully")
      return;
    }else{
      
    }   
  }

  UnDeletedLevels(DrainLevels : DrainLevelDto[]){
       return DrainLevels.filter(c=>c.RowStatus !=2);
  }

  preventpro(event :any){
    event.stopPropagation();
    return;
  }

}
