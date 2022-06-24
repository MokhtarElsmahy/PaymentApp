import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DrainDto } from 'src/models/DrainDto.model';
import { DrainLevelDto } from 'src/models/DrainLevelDto.model';
import { DrainServiceService } from 'src/services/drain-service.service';

@Component({
  selector: 'app-drain-level',
  templateUrl: './drain-level.component.html',
  styleUrls: ['./drain-level.component.css']
})
export class DrainLevelComponent implements OnInit {

  constructor(public service: DrainServiceService, private route: ActivatedRoute) {
  }
  openDrain: DrainDto = new DrainDto();
  ngOnInit(): void {
    this.LoadDrainWithLevels();

  }

  LoadDrainWithLevels() {
    this.service.GetDrainWithLevels(this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        this.openDrain = res as DrainDto
      },
      err => {

      }
    );
  }

  onSubmit(form: NgForm) {
    // var xxx = this.service.openDrain.DrainLevels.filter(c=>c.OdmId==2)[1].Note;
    // alert(xxx);
    this.service.updateDrainWithLevels(this.openDrain).subscribe(res => {
      alert("success");
      this.service.GetAllDrains(1, 2);
    })

  }

  AddNewRow() {
    this.openDrain.DrainLevels[this.openDrain.DrainLevels.length] =
    {
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
      RowStatus:4
    };

  }


  CheckDirty(index: number) {
    this.openDrain.DrainLevels[index].isUpdated = true;
    console.log(this.openDrain.DrainLevels)

  }

  DeleteLevel(MeasureDate: any, OdmId: number, i :number) {
    if(OdmId==0){
      this.openDrain.DrainLevels.splice(i,1);
      return;
    }
    this.service.DeleteLevels(MeasureDate, OdmId).subscribe(
      res => {alert(res)
      this.openDrain.DrainLevels.splice(i,1);
      },
      err => alert(err)
    )
  }
}


