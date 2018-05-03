import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class ApiService {
admin;
adminId;
  constructor(private afs:AngularFirestore,private fbAuth:AngularFireAuth) { 
    console.log(localStorage.getItem('uid'));
    this.adminId =localStorage.getItem('uid')
    
  
  }



  /* """"""""""""""""""""""""""""""""""""""""""""   AUTHENTICATION   """""""""""""""""""""""""""""""""""""""""""""""""""*/

  //~ LOGIN 
  loginAdmin(email, pass){
    return this.fbAuth.auth.signInWithEmailAndPassword(email,pass)
  }
  loginDoctor(email, pass){
    return this.fbAuth.auth.signInWithEmailAndPassword(email,pass)
  }



  //~ SIGNUP
  signupAdmin(email, pass){
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, pass);
  }
  signupDoctor(email, pass){
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, pass);
  }
  signupGuardian(email, pass){
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, pass);
  }
  signupWorker(email, pass){
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, pass);
  }


  // FETCH Functiosn
  getDoctorProfile(adminId){
    return this.afs.doc('doctors/'+adminId).valueChanges();
  }
  updateDoctorProfile(adminId,data){
    return this.afs.doc('doctors/'+adminId).update(data);
  }

  


/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: VACCINES  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
 
//~ CREATE 
addVaccine(data){
  return this.afs.collection('vaccines').add(data)
}
//~ READ 
getVaccines(){
  return this.afs.collection('vaccines').snapshotChanges();
}
//~ UPDATE 
updateVaccine(id, data){
  return this.afs.doc('vaccines/'+id).update(data);
}
//~ DELETE 
deleteVaccine(id){
  return this.afs.doc('vaccines/'+id).delete();

}

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: DOCTORS  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
 
//~ CREATE 
addDoctor(data){
  return this.afs.collection('doctors').add(data)
}
//~ READ 
getDoctors(){
  return this.afs.collection('doctors').snapshotChanges();
}
//~ READ Single 
getDoctor(id){
  return this.afs.doc('doctors/'+id).snapshotChanges();
}
//~ UPDATE 
updateDoctor(id, data){
  return this.afs.doc('doctors/'+id).update(data);
}
//~ DELETE 
deleteDoctor(id){
  return this.afs.doc('doctors/'+id).delete();
}


/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: GUARDIAN  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
 
//~ CREATE 
addGuardian(data){
  return this.afs.collection('guardians').add(data)

}
//~ READ 
getGuardians(workerId){
  return this.afs.collection('guardians', ref=> ref.where('workerId','==',workerId)).snapshotChanges();

}
//~ UPDATE 
updateGuardian(id, data){
  return this.afs.doc('guardians/'+id).update(data);

}
//~ DELETE 
deleteGuardian(id){
  return this.afs.doc('guardians/'+id).delete();

}



/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: WORKERS  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
 
//~ CREATE 
addWorker(data){
  return this.afs.collection('workers').add(data)

}
//~ GET A WORKER 
getWorker(workerId){
  return this.afs.doc('workers/'+workerId).snapshotChanges();
}


//~ READ 
getWorkers(){
  return this.afs.collection('workers', ref=> ref.where('doctorId','==',this.adminId)).snapshotChanges();
}
//~ UPDATE 
updateWorker(id, data){
  return this.afs.doc('workers/'+id).update(data);

}
//~ DELETE 
deleteWorker(id){
  return this.afs.doc('workers/'+id).delete();
}


/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: CHILDRENS  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

//~CREATE 
addChildren(data){
  return this.afs.collection('children').add(data);
}
//~READ 
getAllChildren(){
  return this.afs.collection('children').snapshotChanges();
}
getChildren(parentId){
  return this.afs.collection('children', ref=> ref.where('guardianId','==',parentId)).snapshotChanges();
}
//~UPDATE
updateChildren(id,data){
  return this.afs.doc('children/'+id).update(data);
}
deleteChildren(id){
  return this.afs.doc('children/'+id).delete();
}



/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: NOTFICATIONS  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */


// ~ CREATE
generateNotification(not){ /* type,message,date, priority(low,medium, high),  */
  return this.afs.collection('notifications').add(not);
}

// ~ READ
getAllNotifications(){
  return this.afs.collection('notifications').snapshotChanges();
}
getNotificationsById(id){
  return this.afs.collection('notifications', ref=>ref.where('userId','==',id)).snapshotChanges();
}
getNotificationsByType(type){  /* type==> | 'specific' | 'global' | */
  return this.afs.collection('notifications', ref=>ref.where('type','==',type)).snapshotChanges();
}

// ~ DELETE
deleteNotification(notificationId){
  return this.afs.doc('notifications/'+notificationId).delete();
}




      /* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: CHAT  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

      //chat with your doctor 
   getMessages(){
     return this.afs.collection('messages/', ref=> ref.where('doctorId','==',this.adminId)).snapshotChanges();
   }

   sendMessage(conversation){ 
     console.log(conversation);
     if(conversation.started == false){
       conversation.started = true;
      return this.afs.doc('messages/'+conversation.userId+'-'+conversation.doctorId).set(conversation).then(()=> console.log(`convo created! message sent`))
     }else {
      return this.afs.doc('messages/'+conversation.userId+'-'+conversation.doctorId).update({
        messages: conversation.messages
      }).then(r=>{ console.log('message sent!')})
     }

   }

   getChat(chatId){
     return this.afs.doc('messages/'+chatId).valueChanges();
   }

   /* 
   CHAT: 
        Chats: 
          -- 23aksd23asmsd23maasa2
              -- doctorId      
              -- userType   ( | worker | doctor |)   
              -- userId      
              -- messages:[{
                senderName:
                senderId:
                senderPhoto:
                message:
              }];
              
   
   chat.where('userType','==','worker').where('userId','==','')
   
   */


}
