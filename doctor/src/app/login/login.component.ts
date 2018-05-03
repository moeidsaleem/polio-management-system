import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user={
    email:'arshad@gmail.com',
    password:'arshad123'
  }
error;  
correct={
  email:'moeidsaleem@gmail.com',
  password:'moeid123'
}


  constructor(private router:Router, private api:ApiService) { }

  ngOnInit() {
  }



  login(){
    this.api.loginDoctor(this.user.email, this.user.password).then(response=>{
      this.error ='';


      //now if the data is available
      this.api.getDoctorProfile(response.uid).subscribe(resp=>{
        if(resp){
          //now if the account is active or not 
          this.api.adminId = response.uid;
          console.log(this.api.adminId);
          this.api.admin = resp;
          localStorage.setItem('uid',response.uid);
          this.router.navigate(['dashboard']);

        }else{
          console.log('no data found');
          this.error ='ERROR: The following email is not a doctor ID';
          setTimeout(()=>{
            this.error;
          },5000)
        }
      
      },err=>{
        this.error ='ERROR: '+err;
        setTimeout(()=>{
          this.error;
        },5000)

      })


    }, err=>{
      this.error ='ERROR:'+err;
      setTimeout(()=>{
        this.error;
      },5000)

    })
    // if(this.user.email=='moeidsaleem@gmail.com' && this.user.password == 'moeid123' ){
    //   this.error=''
    //   console.log(this.user);
    //   this.router.navigate(['dashboard'])
    // }else{
    //   this.error='Incorrect Credentials.'
    //   setTimeout(()=>{
    //     this.error;
    //   },5000)

    // }

  }

  

}
