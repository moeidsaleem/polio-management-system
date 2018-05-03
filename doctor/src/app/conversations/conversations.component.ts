import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit {

  @ViewChild('content') private content: ElementRef
  conversations;
  doctor;
  selectedConversation;
  user;
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.api.getMessages().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }).subscribe(convos=>{
      this.conversations = convos;
      console.log(this.conversations);
    })
  }

  getWorker(workerId){
    return this.api.getWorker(workerId).subscribe(worker=>{
       this.user = worker;
     });
   }

   getDoctor(doctorId){
     this.api.getDoctorProfile(doctorId).subscribe(resp=>{
       this.user = resp;
       console.log(this.doctor);
     })
   }

   admin;
   getAdmin(){
     this.api.getDoctorProfile(this.api.adminId).subscribe(r=>{
       this.admin  = r;
     })
   }



   getChat(chatId){
     this.api.getChat(chatId).subscribe(convo=>{
       this.selectedConversation = convo;
       setTimeout(() => {
        this.scrollToBottom();

       }, 1200); 
     });
   }


   load(con){
     this.getChat(con.id);
     
    this.getAdmin();
     console.log('loading')
     if(con.userType== 'worker'){
       console.log('user type is worker')
         this.getWorker(con.userId);
     }else if(con.userType == 'doctor'){
      console.log('user type is doctor')
       this.getDoctor(con.userId);
     }


   }


  newmessage ='';
  sendMessage(){
    console.log(this.admin);
    let message = this.newmessage;
    this.newmessage ='';

    //now in order to send the message we must have the loaded the conversation... 
    this.selectedConversation.messages.push({
      message:message,
      senderName: this.admin.name,
      senderId: this.api.adminId,
      photo: this.admin.photo
    });


    this.api.sendMessage(this.selectedConversation).then(r=>{
      console.log(`message sent done!`)
      this.scrollToBottom();

    })

       
    
  }

  


 scrollToBottom(): void {
  try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
  } catch(err) { }                 
}
  

}
