import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {



  workers;
  doctors;
  selectedWorker;
  selectedDoctor


  xxx=''
  order: string = 'name';


  goGuardian(worker){
    console.log(worker);
    this.router.navigate(['dashboard/guardians', {id:worker.id, name:worker.name}])
 //   this.router.navigate(['/guardians'])
  }
  
  constructor(private router:Router,private api: ApiService) {
   }

  ngOnInit() {    
    this.api.getWorkers().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }).subscribe(resp=>{
      this.workers =resp;
    });
    this.api.getDoctors().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }).subscribe(doctorx=>{
      this.doctors =doctorx;
    })

  }


  submit(val){
    $('#exampleModal').modal('hide')
    console.log(this.selectedDoctor);
    val.joinDate = new Date().getUTCDate();
    if(this.selectedDoctor){
      val.doctor =this.selectedDoctor;
      val.doctorId =this.selectedDoctor.id;

    }
    console.log(val);

    this.api.addWorker(val).then(res=>{


    },err=>{
      console.log(err);
    })

  }

  delete(vaccine){
    $('#deleteModal').modal('hide');
    this.selectedWorker ={};
    //now removing the vaccine
    this.api.deleteWorker(vaccine.id).then(res=>{

    }, err=>{})
  }

  update(data){
    $('#editModal').modal('hide');
    this.api.updateWorker(data.id, data).then(res=>{

      this.selectedWorker ={};
      this.selectedDoctor ={};


    })
  }

  updateDoctor(data){
    if(this.selectedDoctor){
      data.doctorName =this.selectedDoctor.name;
      data.doctorId =this.selectedDoctor.id;

    
    $('#updateDoctorModal').modal('hide');
    this.api.updateWorker(data.id, data).then(res=>{
      this.selectedWorker ={};
      this.selectedDoctor ={};
    });
  }else{
    console.log('no change');
    $('#updateDoctorModal').modal('hide');

  }
  

  }



  onChange(e){
    let obj=JSON.parse(e)
    this.selectedDoctor = { name:obj.name, id:obj.id }
          console.log(this.selectedDoctor);
  }



  orderBy(value){
    this.order = value;
  }

}
