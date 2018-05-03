import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-guardians',
  templateUrl: './guardians.component.html',
  styleUrls: ['./guardians.component.css']
})
export class GuardiansComponent implements OnInit {


 guardians;
  workers;
  doctors;
  selectedGuardian;
  selectedWorker;
  children;
  childAddToggle=true;
  selectedChild;

  xxx=''
  order: string = 'name';



  workerName:any='';
  
  constructor(private api: ApiService, private router:Router, private route:ActivatedRoute) {
   }

  ngOnInit() {  
    //
    this.route.params.subscribe(w=>{
      console.log(w);
      if(!w){
        w.id =this.api.adminId;
        w.name ='null';
      }

      
      this.workerName = w.name;
     

      
    this.api.getGuardians(w.id).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }).subscribe(guard=>{
      this.guardians =guard;
    });
    this.api.getWorkers().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }).subscribe(worker=>{
      this.workers =worker;
    })




  });

  }


  submit(val){
    $('#exampleModal').modal('hide')
    console.log(this.selectedWorker);
    val.joinDate = new Date().getUTCDate();
    val.totalChildren =0;
    if(this.selectedWorker){
      val.workerName =this.selectedWorker.name;
      val.workerId =this.selectedWorker.id;
    }
    console.log(val);

    this.api.addGuardian(val).then(res=>{


    },err=>{
      console.log(err);
    })

  }

  delete(vaccine){
    $('#deleteModal').modal('hide');
    this.selectedWorker ={};
    //now removing the vaccine
    this.api.deleteGuardian(vaccine.id).then(res=>{

    }, err=>{})
  }

  update(data){
    $('#editModal').modal('hide');
    this.api.updateGuardian(data.id, data).then(res=>{

      this.selectedWorker ={};
      this.selectedGuardian ={};


    })
  }


  updateWorker(data){
    if(this.selectedWorker){
      data.workerName =this.selectedWorker.name;
      data.workerId =this.selectedWorker.id;
    $('#updateDoctorModal').modal('hide');
    this.api.updateGuardian(data.id, data).then(res=>{
      this.selectedGuardian ={};
      this.selectedWorker ={};
    });
  }else{
    console.log('no change');
    $('#updateDoctorModal').modal('hide');

  }
  

  }
  loadChildren(id){
    //load children of a certain guardian meaning this guardian 
    this.api.getChildren(id).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }).subscribe(childrenx=>{
      this.children = childrenx;
    })
  }

  addChild(data){
    data.guardianName = this.selectedGuardian.name;
    data.guardianId = this.selectedGuardian.id;
    console.log(data);
    this.childAddToggle= !this.childAddToggle;

    this.api.addChildren(data).then(res=>{
      this.api.updateGuardian(this.selectedGuardian.id, { totalChildren:this.selectedGuardian.totalChildren+1}).then(resp=>{
        console.log('guardian child updated');
      })
    });

  }
  deleteChild(id){
    return this.api.deleteChildren(id).then(rex=>{
      console.log('child removed');
      this.api.updateGuardian(this.selectedGuardian.id, { totalChildren:this.selectedGuardian.totalChildren-1}).then(resp=>{
        console.log('guardian child updated');
      })
      
    })
  }
  updateChild(data){
    this.api.updateChildren(data.id, data).then(resp=>{
      $('#updateChildModal').modal('hide');


    })
  }

  onChange(e){
    let obj=JSON.parse(e)
    this.selectedWorker = { name:obj.name, id:obj.id }
          console.log(this.selectedWorker);
  }



  orderBy(value){
    this.order = value;
  }

}
