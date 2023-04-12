import React, { useState, useRef, useEffect } from 'react';
import { IonContent, IonPage, IonToolbar } from '@ionic/react';
import { IonLabel } from '@ionic/react';
import { IonImg } from '@ionic/react';
import { signInWithGoogle } from "../Firebase";

const Tab2: React.FC = () => {
   
  return (
    <IonPage> 
      <IonContent fullscreen className="background">
      
      <div className="d-flex justify-content-center" style={{marginTop:'25vh'}}>
        <IonImg style={{width:'12em', height:'12em'}} src="assets/logo.svg" ></IonImg>
      </div>

      <IonLabel className="loginLabel d-flex justify-content-center">EXPENSO</IonLabel>

      <div className="row" style={{bottom:'10vh', width:'100%', marginLeft:'auto', marginRight:'auto', position:'fixed'}}>
        <div className="col-md-3 d-flex justify-content-center"  >
          <a onClick={signInWithGoogle} className="btn btn-dark btn-outline-dark"   role="button" style={{textTransform:"none", marginLeft:'auto', marginRight:'auto', border:'2px solid grey'}}>
            <img width="20px" style={{marginBottom:"3px", marginRight:"5px"}} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
            Login with Google
          </a>
        </div>
      </div>

        
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
