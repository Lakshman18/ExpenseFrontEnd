import React, { useState, useRef, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import { IonIcon} from '@ionic/react';
import { arrowForwardOutline, add, cashOutline } from 'ionicons/icons';
import './Tab1.css';
import { IonButtons, IonButton, IonModal} from '@ionic/react';
import { IonItem, IonLabel } from '@ionic/react';
import { IonInput } from '@ionic/react';
import { IonFab, IonFabButton, IonDatetime, IonDatetimeButton, } from '@ionic/react';
import { IonList, useIonToast } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom';
import { AppStatDto, TripSummaryData } from '../models'
import { tripActions } from '../redux/actions'
import { ACTION_STATUS } from '../constants'
import GridLoader from "react-spinners/ClipLoader";

const INITIAL_FORM_STATE: TripSummaryData = {
  _id: '',
  name: '',
  fromDate: '',
  toDate: '',
  budget: 0
}

const Tab1: React.FC = () => {

  const dispatch = useDispatch()
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [present] = useIonToast();
  const modal = useRef<HTMLIonModalElement>(null);
  const history = useHistory();
  const TripList = useSelector((state: AppStatDto) => state.trip.tripList)
  const addTrip = useSelector((state: AppStatDto) => state.trip.addTrip)
  const [isLoad, setIsLoad] = useState(true);

  const [tripFormData, setTripFormData] = useState<TripSummaryData>(INITIAL_FORM_STATE)


  useEffect(() => {
    dispatch(tripActions.getTrips() )
  }, [])
 
  React.useEffect(() => {
    if (TripList.isLoading === true) {
      setIsLoad(true)
    }else if (TripList.isLoading === false) {
      setIsLoad(false)
    }
  }, [TripList.status])

  React.useEffect(() => {
    if (addTrip.status === ACTION_STATUS.SUCCESS) {
      dispatch(tripActions.getTrips() )
      setIsAddOpen(false)
      presentToast('Saved Successfully','top', 'success')
    }

    if (addTrip.isLoading === true) {
      setIsLoad(true)
    }else if (addTrip.isLoading === false) {
      setIsLoad(false)
    }
  }, [addTrip.status])

  function closeModal(){
    setIsAddOpen(false)
  }

  function onAddClick(){
    setIsAddOpen(true)
  }

  function onAddAccept(e:any){
    e.preventDefault() 
    if(tripFormData.fromDate === ''){
      const d = new Date();
      tripFormData.fromDate = d.toString();
    }
    if(tripFormData.toDate === ''){
      const d = new Date();
      tripFormData.toDate = d.toString();
    }

    if(tripFormData.name === '' || tripFormData.budget <1  ){
      presentToast('Invalid data','top', 'danger')
    }
    else{
      const payload: TripSummaryData = {
        _id: tripFormData._id,
        name: tripFormData.name,
        fromDate: tripFormData.fromDate,
        toDate: tripFormData.toDate,
        budget: tripFormData.budget
      }
      dispatch(tripActions.saveUpdateTrip(payload))
    }
  }

  const presentToast = (message:string, position: 'top' | 'middle' | 'bottom', theme: 'success' | 'danger') => {
    present({
      message: message,
      color: theme,
      duration: 1500,
      position: position
    });
  };

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    setIsDateModalOpen(false)
  }

  function tripDetailView(id: string){
    var result = TripList.data.filter(item => item._id === id);
    history.push({pathname: "/tab3", state: result[0]  })
  } 
  
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTripFormData({
      ...tripFormData,
      [e.target.name]: e.target.value.trim()
    });
  };

  return (
    <IonPage>
      <IonHeader  >
        <IonToolbar>
          <IonTitle>Trips</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {
          isLoad
          ?
          <div className="loader">
              <GridLoader color="#52ffe4" />
          </div>
          :
          <>
            {
              TripList.data.map((item) => {
                return  <IonCard onClick={() =>  tripDetailView(item._id)} key={item._id}>
                    <IonCardHeader>
                      <IonCardTitle >{item.name}</IonCardTitle>
                      <IonCardSubtitle>
                        {item.fromDate.split("T")[0]}
                        <IonIcon icon={arrowForwardOutline} className="cardIconClr" size="small" style={{marginBottom:"-4px", marginLeft:"10px", marginRight:"10px"}}></IonIcon> 
                        {item.toDate.split("T")[0]}
                      </IonCardSubtitle> 
                    </IonCardHeader>

                    <IonCardContent>
                    <IonIcon icon={cashOutline} className="cardIconClr" size="small" style={{marginBottom:"-4px", marginLeft:"0px", marginRight:"0px"}}></IonIcon> 

                      <span className="cardBudget">  </span>{item.budget}
                    </IonCardContent>
                  </IonCard>
              })
            }

            <IonFab style={{position:'fixed', bottom:'05vh', right:'30px'}}>
              <IonFabButton onClick={() => onAddClick()}>
                <IonIcon icon={add} ></IonIcon>
              </IonFabButton>
            </IonFab>

            <IonModal isOpen={isAddOpen} className="modal-wrapper">
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Add</IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => closeModal()}>Close</IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <IonList>
                  <IonItem>
                    <IonLabel position="stacked" className="addLabel">Trip Name</IonLabel>
                    <IonInput clearInput={true} name='name' onIonInput={(e: any) => handleChange(e)} ></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonLabel className="addLabel" position="stacked" style={isDateModalOpen?{color:"#52ffe4"}:{}}>From Date</IonLabel>
                    <IonDatetimeButton  onClick={()=>setIsDateModalOpen(true)} datetime="datetime" style={{marginTop:'10px'}}></IonDatetimeButton>
          
                    <IonModal keepContentsMounted={true} ref={modal} onWillDismiss={(ev) => onWillDismiss(ev)}>
                      <IonDatetime id="datetime" name='fromDate' onIonChange={(e: any) => handleChange(e)} ></IonDatetime>
                    </IonModal>
                  </IonItem>

                  <IonItem>
                    <IonLabel className="addLabel" position="stacked" style={isDateModalOpen?{color:"#52ffe4"}:{}}>To Date</IonLabel>
                    <IonDatetimeButton  onClick={()=>setIsDateModalOpen(true)} datetime="datetime1" style={{marginTop:'10px'}}></IonDatetimeButton>
          
                    <IonModal keepContentsMounted={true} ref={modal} onWillDismiss={(ev) => onWillDismiss(ev)}>
                      <IonDatetime id="datetime1" name='toDate' onIonChange={(e: any) => handleChange(e)} ></IonDatetime>
                    </IonModal>
                  </IonItem>              
                  <IonItem>
                    <IonLabel position="stacked" className="addLabel">Budget</IonLabel>
                    <IonInput clearInput={true} type="number" name='budget' onIonInput={(e: any) => handleChange(e)} ></IonInput>
                  </IonItem>
                </IonList>
                <IonButton expand="block" className="footer" onClick={onAddAccept}>Save</IonButton>
              </IonContent>
            </IonModal>
          </>
        }

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
