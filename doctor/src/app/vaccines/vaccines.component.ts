import { Component, OnInit,  } from '@angular/core';
import { ApiService } from '../api.service';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.css']
})
export class VaccinesComponent implements OnInit {



  vaccines;
  selectedVaccine;


  xxx=''
  order: string = 'name';



  
  constructor(private api: ApiService) {
   }

  ngOnInit() {    
    this.api.getVaccines().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })

    }).subscribe(resp=>{
      this.vaccines =resp;
    })

  }


  submit(val){
    $('#exampleModal').modal('hide')

    console.log(val);
    this.api.addVaccine(val).then(res=>{

    },err=>{
      console.log(err);
    })

  }

  delete(vaccine){
    $('#deleteModal').modal('hide');
    this.selectedVaccine ={};
    //now removing the vaccine
    this.api.deleteVaccine(vaccine.id).then(res=>{

    }, err=>{})
  }

  update(data){
    $('#editModal').modal('hide');
    this.api.updateVaccine(data.id, data).then(res=>{

      this.selectedVaccine ={};


    })
  }



  orderBy(value){
    this.order = value;
  }

}
