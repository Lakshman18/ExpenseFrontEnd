import React, {   } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { IonLabel } from '@ionic/react';
import { IonImg } from '@ionic/react';
import { useDispatch } from 'react-redux'
import { authenticationActions } from '../redux/actions'

const Login: React.FC = () => {
  
  const dispatch = useDispatch()

  function loginOnClick(){
    dispatch(authenticationActions.authenticateUser() )
  }

  return (
    <IonPage> 
      <IonContent fullscreen className="background">
      
      <div className="centerContent"  >
        <IonImg style={{width:'12em', height:'12em'}} src="assets/logo.svg" ></IonImg>
        <IonLabel className=" loginLabel d-flex justify-content-center">EXPENSO</IonLabel>
      </div>


      <div className="row d-flex justify-content-center" style={{bottom:'10vh', width:'100%', marginLeft:'auto', marginRight:'auto', position:'fixed'}}>
        <div className="col-md-3 d-flex justify-content-center"  >
          <a onClick={loginOnClick} className="btn btn-dark btn-outline-dark"   role="button" style={{textTransform:"none", marginLeft:'auto', marginRight:'auto', border:'2px solid grey'}}>
            <img width="20px" style={{marginBottom:"3px", marginRight:"5px"}} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
            Login with Google
          </a>
        </div>
      </div>

        
      </IonContent>
    </IonPage>
  );
};

export default Login;
