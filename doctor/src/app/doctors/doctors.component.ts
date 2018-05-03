import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit{



  doctors;
  selectedDoctor;


  xxx=''
  order: string = 'name';



  
  constructor(private api: ApiService) {
   }

  ngOnInit() {    
    this.api.getDoctors().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })

    }).subscribe(resp=>{
      this.doctors =resp;
    })

  }


  submit(val){
    $('#exampleModal').modal('hide')

    console.log(val);
    val.joinDate = new Date().getUTCDate();
    this.api.addDoctor(val).then(res=>{

    },err=>{
      console.log(err);
    })

  }

  delete(vaccine){
    $('#deleteModal').modal('hide');
    this.selectedDoctor ={};
    //now removing the vaccine
    this.api.deleteDoctor(vaccine.id).then(res=>{

    }, err=>{})
  }

  update(data){
    $('#editModal').modal('hide');
    this.api.updateDoctor(data.id, data).then(res=>{

      this.selectedDoctor ={};


    })
  }



  orderBy(value){
    this.order = value;
  }

}
