import React, { useState, useRef, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { IonIcon} from '@ionic/react';
import { createOutline, arrowForwardOutline, trash, settings, downloadSharp, add } from 'ionicons/icons';
import './Tab3.css';
import { IonButtons, IonButton, IonModal} from '@ionic/react';
import { IonBackButton, IonItem, IonLabel } from '@ionic/react';
import { IonItemOption, IonItemOptions, IonItemSliding, IonInput } from '@ionic/react';
import { IonBadge, IonFab, IonFabButton, IonDatetime, IonDatetimeButton, } from '@ionic/react';
import { IonList, useIonAlert, useIonToast } from '@ionic/react';
import { IonListHeader } from '@ionic/react';
import generatePDF from "./reportGenerator";
import { OverlayEventDetail } from '@ionic/core/components';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";
import { AppStatDto, TripSummaryData, TripExpenseDataSet, TripExpenseData } from '../models'
import {useHistory} from 'react-router-dom';
import { ACTION_STATUS } from '../constants'
import { tripActions } from '../redux/actions/trip.action';
import GridLoader from "react-spinners/ClipLoader";

const Tab3: React.FC = () => {
  
  type TripDataDateWise = {
    date: string;
    items: TripExpenseData1[];
  }; 

  type TripExpenseData1 = {
    id: string;
    date: string;
    description: string;
    amount: number;
  };  

  const data: TripDataDateWise[] = [
    {
      date:'2018-10-31',
      items: [
        {
          id: '1',
          date: '2018-10-31',
          description: 'test1',
          amount: 1000
        },
        {
          id: '2',
          date: '2018-10-31',
          description: 'test2',
          amount: 500
        }
      ]
    },
    {
      date:'2018-11-31',
      items: [{
        id: '3',
        date: '2018-05-30',
        description: 'test3test3test3test3test3',
        amount: 300
      }]
    }
    
  ]; 

  const INITIAL_TripHeader: TripSummaryData = {
    _id: '',
    name: '',
    fromDate: '',
    toDate: '',
    budget: 0,
  }

  const INITIAL_EXPENSE_FORM_STATE: TripExpenseData = {
    _id: '',
    description: '',
    date: '',
    amount: 0,
    trip:''
  }

  const [showDate, setShowDate] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isExpenseEditOpen, setIsExpensEditOpen] = useState(false);
  const [tripHeader, setTripHeader] = useState<TripSummaryData>(INITIAL_TripHeader);
  const [balance, setBalance] = useState(0);
  const deleteTrip = useSelector((state: AppStatDto) => state.trip.deleteTrip)
  const addTrip = useSelector((state: AppStatDto) => state.trip.addTrip)
  const tripExpenseList = useSelector((state: AppStatDto) => state.trip.tripExpenseList)
  const [tripExpenseFormData, setTripExpenseFormData] = useState<TripExpenseData>(INITIAL_EXPENSE_FORM_STATE)
  const addTripExpense = useSelector((state: AppStatDto) => state.trip.addTripExpense)
  const [selectedExpense, setSelectedExpense] = useState<TripExpenseData>(INITIAL_EXPENSE_FORM_STATE)
  const deleteTripExpense = useSelector((state: AppStatDto) => state.trip.deleteTripExpense)
  const [isLoad, setIsLoad] = useState(true);

  const INITIAL_FORM_STATE: TripSummaryData = {
    _id: tripHeader._id,
    name: tripHeader.name,
    fromDate: tripHeader.fromDate,
    toDate: tripHeader.toDate,
    budget: tripHeader.budget
  }

  const modal = useRef<HTMLIonModalElement>(null);
  const [presentAlert] = useIonAlert();
  const [present] = useIonToast();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch()
  const [tripFormData, setTripFormData] = useState<TripSummaryData>(INITIAL_FORM_STATE)

  useEffect(() => {
    const _validatedData = location.state as TripSummaryData ;
    if(location.pathname === '/tab3'){
      dispatch(tripActions.getTripExpenses(_validatedData._id) )
      const INITIAL_FORM_STATE1: TripSummaryData = {
        _id: _validatedData._id,
        name: _validatedData.name,
        fromDate: _validatedData.fromDate,
        toDate: _validatedData.toDate,
        budget: _validatedData.budget
      }
      setTripFormData(INITIAL_FORM_STATE1)
      let balanceTemp = _validatedData.budget;
      setTripHeader(_validatedData)
      tripExpenseList.data.forEach((item) => item.items.forEach((item1:any) => balanceTemp -= item1.amount))
      setBalance(balanceTemp)
    }
    else{
      setBalance(0)
    }

  }, [location]);

  React.useEffect(() => {
    if (deleteTrip.status === ACTION_STATUS.SUCCESS) {
      dispatch(tripActions.getTrips() )
      closeModal()
      history.push({pathname: "/tab1" })
    }

    if (deleteTrip.isLoading === true) {
      setIsLoad(true)
    }else if (deleteTrip.isLoading === false) {
      setIsLoad(false)
    }
  }, [deleteTrip.status])

  React.useEffect(() => {
    if (addTrip.status === ACTION_STATUS.SUCCESS) {
      dispatch(tripActions.getTrips() )
      setTripHeader(tripFormData)
      setIsEditOpen(false)

      let balanceTemp = tripFormData.budget;
      tripExpenseList.data.forEach((item) => item.items.forEach((item1:any) => balanceTemp -= item1.amount))
      setBalance(balanceTemp)
    }

    if (addTrip.isLoading === true) {
      setIsLoad(true)
    }else if (addTrip.isLoading === false) {
      setIsLoad(false)
    }
  }, [addTrip.status])

  React.useEffect(() => {
    if (addTripExpense.status === ACTION_STATUS.SUCCESS) {
      dispatch(tripActions.getTripExpenses(tripHeader._id) )
      setIsAddOpen(false)
      setIsExpensEditOpen(false)
      presentToast('Saved Successfully','top', 'success')
    }

    if (addTripExpense.isLoading === true) {
      setIsLoad(true)
    }else if (addTripExpense.isLoading === false) {
      setIsLoad(false)
    }
  }, [addTripExpense.status])

  React.useEffect(() => {
    if (tripExpenseList.status === ACTION_STATUS.SUCCESS) {
      let balanceTemp = tripHeader.budget;
      tripExpenseList.data.forEach((item) => item.items.forEach((item1:any) => balanceTemp -= item1.amount))
      setBalance(balanceTemp)
    }

    if (tripExpenseList.isLoading === true) {
      setIsLoad(true)
    }else if (tripExpenseList.isLoading === false) {
      setIsLoad(false)
    }
  }, [tripExpenseList.status])

  React.useEffect(() => {
    if (deleteTripExpense.status === ACTION_STATUS.SUCCESS) {
      dispatch(tripActions.getTripExpenses(tripHeader._id) )
      setIsAddOpen(false)
      setIsExpensEditOpen(false)
    }

    if (deleteTripExpense.isLoading === true) {
      setIsLoad(true)
    }else if (deleteTripExpense.isLoading === false) {
      setIsLoad(false)
    }
  }, [deleteTripExpense.status])

  function onClickExpand(date: string){
    setShowDate(date)
    if(showDate === date && isShow){
      setIsShow(false)
    }else{
      setIsShow(true)
    }
  }

  function closeModal(){
    setIsAddOpen(false)
    setIsEditOpen(false)
    setIsExpensEditOpen(false)
  }

  function onAddClick(){
    setIsAddOpen(true)
  }

  function onEditClick(){
    setIsEditOpen(true)
  }

  function onAddAccept(e:any){
    if(tripExpenseFormData.date === ''){
      const d = new Date();
      tripExpenseFormData.date = d.toString();
    }
    if(tripExpenseFormData.description === '' || tripExpenseFormData.amount <1  ){
      presentToast('Invalid data','top', 'danger')
    }
    else{
      e.preventDefault()
      const payload: TripExpenseData = {
        _id: tripExpenseFormData._id,
        description: tripExpenseFormData.description,
        date: tripExpenseFormData.date,
        amount: tripExpenseFormData.amount,
        trip: tripHeader._id
      }
      dispatch(tripActions.saveUpdateTripExpense(payload))
    }
  }

  function onEditAccept(e:any){ 
    e.preventDefault()
    const payload: TripSummaryData = {
      _id: tripFormData._id,
      name: tripFormData.name,
      fromDate: tripFormData.fromDate,
      toDate: tripFormData.toDate,
      budget: tripFormData.budget
    }           
    dispatch(tripActions.saveUpdateTrip(payload))
    presentToast('Saved Successfully','top', 'success')
  }

  function onDeleteAccept(){
    dispatch(tripActions.deleteTrip(tripHeader._id))
    presentToast('Deleted Successfully', 'top', 'success')
  }
  
  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    setIsDateModalOpen(false)
  }

  const presentToast = (message:string, position: 'top' | 'middle' | 'bottom', theme: 'success' | 'danger') => {
    present({
      message: message,
      color: theme,
      duration: 1500,
      position: position
    });
  };

  const settingsHandleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTripFormData({
      ...tripFormData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTripExpenseFormData({
      ...tripExpenseFormData,
      [e.target.name]: e.target.value
    });
  };

  const expenseHandleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSelectedExpense({
      ...selectedExpense,
      [e.target.name]: e.target.value.trim()
    });
  };

  function onExpenseEditClick(item:TripExpenseData){
    setIsExpensEditOpen(true)
    setSelectedExpense(item)
  }

  function onExpenseEditAcceptk( e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>){
    e.preventDefault()
    const payload: TripExpenseData = {
      _id: selectedExpense._id,
      description: selectedExpense.description,
      date: selectedExpense.date,
      amount: selectedExpense.amount,
      trip: selectedExpense.trip
    }
    dispatch(tripActions.saveUpdateTripExpense(payload))
  }

  function onExpenseDeleteAccept(item:TripExpenseData){
    dispatch(tripActions.deleteTripExpense(item._id))
    presentToast('Deleted Successfully', 'top', 'success')
  }

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
          <IonCard>
            <IonCardHeader className="ion-text-center">
              <IonCardTitle>{tripHeader['name']} Trip</IonCardTitle>
              <IonCardSubtitle>
                    {tripHeader['fromDate'].split("T")[0]}
                    <IonIcon icon={arrowForwardOutline} className="cardIconClr" size="small" style={{marginBottom:"-4px", marginLeft:"10px", marginRight:"10px"}}></IonIcon> 
                    {tripHeader['toDate'].split("T")[0]}
                  </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent style={{marginTop:'15px', marginBottom:'15px'}}>
              <IonBadge style={{position:'absolute', bottom:'5px', left:'5x'}}><span className="cardBudget">Budget: </span>{tripHeader['budget']}</IonBadge>
              <IonBadge  style={{position:'absolute', bottom:'5px', right:'5px'}}><span className="cardBudget">Balance: </span>{balance}</IonBadge>
            </IonCardContent>

            <IonButton onClick={() => onEditClick()} style={{position:'absolute', top:'5px', right:'0px'}} fill="clear" className="buttonClr"><IonIcon slot="icon-only" icon={settings}></IonIcon></IonButton>
          </IonCard>

          {
            tripExpenseList.data.map((dateItem) => {
              return <IonList key = {dateItem.date} style={{marginLeft:'20px', marginRight:'20px', marginBottom:'10px'}}>
              <IonListHeader lines="inset" onClick={()=> onClickExpand(dateItem.date)}>
                <IonLabel>{dateItem.date}</IonLabel>
              </IonListHeader>
              {dateItem.items.map((item) => {
                if(showDate === dateItem.date && isShow){
                  return <IonItemSliding  key = {item._id}>      
                  <IonItem>
                    <IonLabel>{item.description}</IonLabel>
                    <IonLabel slot="end">{item.amount}</IonLabel>
                  </IonItem>
          
                  <IonItemOptions side="end">
                    <IonItemOption onClick={() => onExpenseEditClick(item)}>
                      <IonIcon slot="icon-only" icon={createOutline} ></IonIcon>
                    </IonItemOption>
                    <IonItemOption color="danger"
                      onClick={() =>
                        presentAlert({
                          header: 'Are you Sure ?',
                          buttons: [
                            {
                              text: 'Cancel',
                              role: 'cancel',
                              handler: () => {
                                // setHandlerMessage('Alert canceled');
                              },
                            },
                            {
                              text: 'OK',
                              role: 'confirm',
                              handler: () => {
                                onExpenseDeleteAccept(item)
                                // setHandlerMessage('Alert confirmed');
                              },
                            },
                          ],
                          // onDidDismiss: (e: CustomEvent) => setRoleMessage(`Dismissed with role: ${e.detail.role}`),
                        })
                      }>
                      <IonIcon slot="icon-only" icon={trash} 
                      ></IonIcon>
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
                }
              })}
            </IonList>
            })
          }

          <IonFab hidden={isShow} style={{position:'fixed', bottom:'50px', right:'30px'}}>
            <IonFabButton onClick={() => onAddClick()}>
              <IonIcon icon={add} ></IonIcon>
            </IonFabButton>
          </IonFab>

          <IonFab hidden={isShow}  style={{position:'fixed', bottom:'50px', left:'30px'}}>
            <IonFabButton onClick={() => generatePDF(tripExpenseList.data, tripHeader['name'])}>
              <IonIcon icon={downloadSharp}></IonIcon>
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
                  <IonLabel className="addLabel" position="stacked" style={isDateModalOpen?{color:"#52ffe4"}:{}}>Date</IonLabel>
                  <IonDatetimeButton  onClick={()=>setIsDateModalOpen(true)} datetime="datetime2" style={{marginTop:'10px'}}></IonDatetimeButton>
        
                  <IonModal keepContentsMounted={true} ref={modal} onWillDismiss={(ev) => onWillDismiss(ev)}>
                    <IonDatetime value={tripExpenseFormData.date} id="datetime2" name='date' onIonChange={(e: any) => handleChange(e)} ></IonDatetime>
                  </IonModal>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked" className="addLabel">Description</IonLabel>
                  <IonInput clearInput={true} name='description' onIonInput={(e: any) => handleChange(e)} value={tripExpenseFormData.description} ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked" className="addLabel">Amount</IonLabel>
                  <IonInput clearInput={true} type="number"  name='amount' onIonInput={(e: any) => handleChange(e)} value={tripExpenseFormData.amount} ></IonInput>
                </IonItem>
              </IonList>
              <IonButton expand="block" className="footer" onClick={(e:any) => onAddAccept(e)}>Save</IonButton>
            </IonContent>
          </IonModal>

          <IonModal isOpen={isEditOpen} className="modal-wrapper">
            <IonHeader>
              <IonToolbar>
                <IonTitle>Settings</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => closeModal()}>Close</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonList>
                <IonItem>
                  <IonLabel position="stacked" className="addLabel">Trip Name</IonLabel>
                  <IonInput clearInput={true} name='name' onIonInput={(e: any) => settingsHandleChange(e)} value={tripFormData.name}></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel className="addLabel" position="stacked" style={isDateModalOpen?{color:"#52ffe4"}:{}}>From Date</IonLabel>
                  <IonDatetimeButton datetime="datetime" style={{marginTop:'10px'}}></IonDatetimeButton>
        
                  <IonModal keepContentsMounted={true} ref={modal} onWillDismiss={(ev) => onWillDismiss(ev)}>
                    <IonDatetime value={tripFormData.fromDate} id="datetime" name='fromDate' onIonChange={(e: any) => settingsHandleChange(e)} ></IonDatetime>
                  </IonModal>
                </IonItem>
                <IonItem>
                  <IonLabel className="addLabel" position="stacked" style={isDateModalOpen?{color:"#52ffe4"}:{}}>To Date</IonLabel>
                  <IonDatetimeButton  onClick={()=>setIsDateModalOpen(true)} datetime="datetime1" style={{marginTop:'10px'}}></IonDatetimeButton>
        
                  <IonModal keepContentsMounted={true} ref={modal} onWillDismiss={(ev) => onWillDismiss(ev)}>
                    <IonDatetime value={tripFormData.toDate} id="datetime1" name='toDate' onIonChange={(e: any) => settingsHandleChange(e)}></IonDatetime>
                  </IonModal>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked" className="addLabel">Budget</IonLabel>
                  <IonInput clearInput={true} type="number" name='budget' onIonInput={(e: any) => settingsHandleChange(e)} value={tripFormData.budget} ></IonInput>
                </IonItem>
              </IonList>
              <IonButton expand="block" className="footer" onClick={(e:any)=>onEditAccept(e)}>Edit</IonButton>
              {/* <IonButton expand="block" color="danger" >Delete</IonButton> */}
              <IonButton expand="block" color="danger"
                onClick={() =>
                  presentAlert({
                    header: 'Are you Sure ?',
                    buttons: [
                      {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                          // setHandlerMessage('Alert canceled');
                        },
                      },
                      {
                        text: 'OK',
                        role: 'confirm',
                        handler: () => {
                          onDeleteAccept()
                          // setHandlerMessage('Alert confirmed');
                        },
                      },
                    ],
                    // onDidDismiss: (e: CustomEvent) => setRoleMessage(`Dismissed with role: ${e.detail.role}`),
                  })
                }
              >
                Delete
              </IonButton>
            </IonContent>

          </IonModal>

          <IonModal isOpen={isExpenseEditOpen} className="modal-wrapper">
            <IonHeader>
              <IonToolbar>
                <IonTitle>Edit</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => closeModal()}>Close</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonList> 
                <IonItem>
                  <IonLabel position="stacked" className="addLabel">Description</IonLabel>
                  <IonInput clearInput={true} name="description" value={selectedExpense.description}  onIonInput={(e: any) => expenseHandleChange(e)}></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked" className="addLabel">Amount</IonLabel>
                  <IonInput clearInput={true} type="number" name="amount" value={selectedExpense.amount}  onIonInput={(e: any) => expenseHandleChange(e)}></IonInput>
                </IonItem>
              </IonList>
              <IonButton expand="block" className="footer" onClick={(e:any) => onExpenseEditAcceptk(e)}>Save</IonButton>
            </IonContent>
          </IonModal>
          </>
      }
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
