import React, { useState, useRef, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'
import { AppStatDto, InstallmentData, UserData } from '../models'
import { installmentActions, userActions } from '../redux/actions'
import { ACTION_STATUS } from '../constants'

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonToggle  } from '@ionic/react';
import { IonIcon} from '@ionic/react';
import {  trash,  add } from 'ionicons/icons';
import './Tab3.css';
import { IonButtons, IonButton, IonModal} from '@ionic/react';
import {  IonItem, IonLabel } from '@ionic/react';
import { IonItemOption, IonItemOptions, IonItemSliding, IonInput } from '@ionic/react';
import { IonBadge, IonFab, IonFabButton, IonDatetime, IonDatetimeButton, } from '@ionic/react';
import { IonList, useIonAlert, useIonToast } from '@ionic/react';
import { IonListHeader } from '@ionic/react';
import generatePDF from "../reports/reportGeneratorInstallment";
import GridLoader from "react-spinners/ClipLoader";
import { OverlayEventDetail } from '@ionic/core/components';
import { IonSelect, IonSelectOption } from '@ionic/react';

const INITIAL_INSTALLMENT_FORM_STATE: InstallmentData = {
  _id: '',
  name: '',
  date: '',
  amount: 0,
  isCombined:true,
  installmentNo: 1,
  perPersonAmount: 0,
  paymentMethod:'',
  user: '',
  userName: ''
}

const Tab2: React.FC = () => {

  const modal = useRef<HTMLIonModalElement>(null);
  const dispatch = useDispatch()
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();
  const UserList = useSelector((state: AppStatDto) => state.user.userList)
  const InstallmentList = useSelector((state: AppStatDto) => state.installment.installmentList)
  const addInstallment = useSelector((state: AppStatDto) => state.installment.addInstallment)
  const deleteInstallment = useSelector((state: AppStatDto) => state.installment.deleteInstallment)
  const isExist = useSelector((state: AppStatDto) => state.installment.isExist)

  const [isLoad, setIsLoad] = useState(true);
  const [showMonth, setShowMonth] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [installmentFormData, setInstallmentFormData] = useState<InstallmentData>(INITIAL_INSTALLMENT_FORM_STATE)
  const [isCombined, setIsCombined] = useState(false);
  const [userAmount, setUserAmount] = useState([]);

  useEffect(() => {
    dispatch(installmentActions.getInstallments() )
    dispatch(userActions.getUsers() )
  }, [])

  React.useEffect(() => {
    if (InstallmentList.isLoading === true) {
      setIsLoad(true)
    }else if (InstallmentList.isLoading === false) {
      setIsLoad(false)
    }

    if (InstallmentList.status === ACTION_STATUS.SUCCESS) {
      setIsShow(false)
      setShowMonth('')
      closeModal()
      
    }
  }, [InstallmentList.status])

  React.useEffect(() => {
    if (UserList.isLoading === true) {
      setIsLoad(true)
    }else if (UserList.isLoading === false) {
      setIsLoad(false)
    } 

  }, [UserList.status])

  React.useEffect(() => {
    if (isExist.isLoading === true) {
      setIsLoad(true)
    }else if (isExist.isLoading === false) {
      setIsLoad(false)
    } 

    if (isExist.status === ACTION_STATUS.SUCCESS) {
      if( isExist.data === false){
        const payload: InstallmentData = {
          _id: installmentFormData._id,
          name: installmentFormData.name,
          date: installmentFormData.date,
          amount: installmentFormData.amount,
          perPersonAmount : !isCombined ? installmentFormData.amount/2 : installmentFormData.amount,
          isCombined: isCombined,
          installmentNo: installmentFormData.installmentNo,
          user: installmentFormData.user,
          userName: '' ,
          paymentMethod: installmentFormData.paymentMethod
        }
        dispatch(installmentActions.saveUpdateInstallment(payload))
      }
      else{
        presentToast('Name exists', 'top', 'danger')
      }
    }

  }, [isExist.status])

  React.useEffect(() => {
    if (addInstallment.status === ACTION_STATUS.SUCCESS) {
      dispatch(installmentActions.getInstallments() )
      presentToast('Saved Successfully', 'top', 'success')
      closeModal()
    }

    if (addInstallment.isLoading === true) {
      setIsLoad(true)
    }else if (addInstallment.isLoading === false) {
      setIsLoad(false)
    }
  }, [addInstallment.status])

  React.useEffect(() => {
    if (deleteInstallment.status === ACTION_STATUS.SUCCESS) {
      dispatch(installmentActions.getInstallments() )
      closeModal()
    }

    if (deleteInstallment.isLoading === true) {
      setIsLoad(true)
    }else if (deleteInstallment.isLoading === false) {
      setIsLoad(false)
    }
  }, [deleteInstallment.status])

  function onClickExpand(month: string){
    setShowMonth(month)
    calculations(month)
    if(showMonth === month && isShow){
      setIsShow(false)
    }else{
      setIsShow(true)
    }
  }

  function onInstallmentDeleteAccept(item:InstallmentData){
    dispatch(installmentActions.deleteInstallment(item._id))
    presentToast('Deleted Successfully', 'top', 'success')
  }

  const presentToast = (message:string, position: 'top' | 'middle' | 'bottom', theme: 'success' | 'danger') => {
    present({
      message: message,
      color: theme,
      duration: 1500,
      position: position
    });
  };

  function onAddClick(){
    setIsAddOpen(true)
  }

  function closeModal(){
    setIsAddOpen(false)
    setInstallmentFormData(INITIAL_INSTALLMENT_FORM_STATE)
    setIsCombined(false) 
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    // setIsDateModalOpen(false)
  }

  function combineChange(ev: CustomEvent<HTMLInputElement>) {
    var res = ev.detail.checked
    setIsCombined(res)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInstallmentFormData({
      ...installmentFormData,
      [e.target.name]: e.target.value
    });
  };

  function onAddAccept(e:any){
    if(installmentFormData.date === ''){
      const d = new Date().toISOString();
      installmentFormData.date = d.toString().split('.')[0]+ '.000Z';
    }
    else{
      if(installmentFormData.date.includes('+')){
        const res = installmentFormData.date.split('+')[0]
        installmentFormData.date = res + '.000Z'
      }
    }

    if(installmentFormData.name === '' || installmentFormData.amount <1 
      ||installmentFormData.paymentMethod === '' || (isCombined && installmentFormData.user === '')){
      presentToast('Invalid data','top', 'danger')
    }
    else{
      checkIsExists(installmentFormData.name)
    }
  }

  function checkIsExists(name:string){
    dispatch(installmentActions.isExist(name))
  }

  function calculations(selectedMonth:string){
    const unique:any = [];
    const userAmount:any = [];

    UserList.data.map((item:any) => {
      if(!unique.includes(item.name)){
        let tempItem = {userName:'', amount:0}
        tempItem.userName = item.name;
        tempItem.amount = 0;
        unique.push(item.name);
        userAmount.push(tempItem)
      }
    })

    let tempItem = {userName:'', amount:0}
    userAmount.push(tempItem)

    InstallmentList.data.map((item:any) => {
      if(item.month === selectedMonth){
        item.items.map((item1:any)=>{
          let tempItem = {userName:'', amount:0}
          var row = userAmount.filter((element:any) => element.userName === item1.userName)
            row[0].amount = row[0].amount + item1.perPersonAmount
          
        })
      }
    });

    let bothAmount = 0;
    userAmount.map((element:any) => {
      if(element.userName === ''){
        bothAmount = element.amount;
        // userAmount.remove(element);
      }
    })

    let arrayWithoutBoth = userAmount;
    arrayWithoutBoth = userAmount.filter((element:any) => element.userName !== '');

    arrayWithoutBoth.map((element:any) => {
      element.amount = element.amount + bothAmount;
    })

    setUserAmount(arrayWithoutBoth)
  }

  return (
    <IonPage>
      <IonHeader  >
        <IonToolbar>
          <IonTitle>Installments</IonTitle>
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
            InstallmentList.data.map((dateItem) => {
              return <IonList key = {dateItem.month} style={{marginLeft:'20px', marginRight:'20px', marginBottom:'10px'}} hidden={dateItem.items.length >0 ? false: true}>
              <IonListHeader lines="inset" onClick={()=> onClickExpand(dateItem.month)}>
                <IonLabel style={{marginTop:'auto', marginBottom:'auto'}} className="dateLabel">{dateItem.month}</IonLabel>
              </IonListHeader>
              {dateItem.items.map((item:any) => {
                if(showMonth === dateItem.month && isShow){
                  return <IonItemSliding  key = {item._id}>      
                  <IonItem>
                    <div style={{width:'15%'}}>
                    <IonBadge style={{background:item.paymentMethod==="K"?"rgb(117, 86, 91)":"#03034e"}} >{item.paymentMethod}</IonBadge>
                    </div> 
                    <div style={{width:'50%'}}>
                    <IonLabel style={{padding:"10px"}}>{item.name}</IonLabel>
                    </div>
                    <div style={{width:'10%' }}>
                    <IonBadge style={{background:'#083f38'}} slot="end"  >{item.userName[0]}</IonBadge>
                    </div>
                    <div style={{width:'25%', textAlign:'right'}}>
                    <IonLabel slot="end">{item.amount}</IonLabel>
                    </div>
                  </IonItem>
          
                  <IonItemOptions side="end"> 
                    <IonItemOption color="danger"
                      onClick={() =>
                        presentAlert({
                          header: 'Are you Sure ?',
                          buttons: [
                            {
                              text: 'Cancel',
                              role: 'cancel',
                              handler: () => {
                              },
                            },
                            {
                              text: 'OK',
                              role: 'confirm',
                              handler: () => {
                                onInstallmentDeleteAccept(item)
                              },
                            },
                          ],
                        })
                      }>
                      <IonIcon slot="icon-only" icon={trash} 
                      ></IonIcon>
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
                }
              })}
              {/* <IonGrid fixed={true} hidden={showMonth != dateItem.month || !isShow} >
                {userAmount.map((item:any) =>{
                  return <IonRow style={{marginTop:'10px'}} key={item.userName}>
                    <IonCol>{item.userName}</IonCol>
                    <IonCol>{item.amount}</IonCol>
                  </IonRow> 
                })}
              </IonGrid> */}
              <div className="d-flex justify-content-center"  >
                <IonButton 
                  className='DownloaduttonClr'
                  onClick={() => generatePDF(dateItem.items, userAmount, dateItem.month)}
                  hidden={showMonth !== dateItem.month || !isShow}
                > Download
                </IonButton>
              </div>

            </IonList>
            })
          }

      

          <IonFab hidden={isShow} style={{position:'fixed', bottom:'7vh', right:'30px'}}>
            <IonFabButton onClick={() => onAddClick()}>
              <IonIcon icon={add} ></IonIcon>
            </IonFabButton>
          </IonFab>
        {/* 
          <IonFab hidden={isShow}  style={{position:'fixed', bottom:'7vh', left:'30px'}}>
            <IonFabButton onClick={() => generatePDF(tripExpenseList.data, tripHeader['name'])}>
              <IonIcon icon={downloadSharp}></IonIcon>
            </IonFabButton>
          </IonFab> */}
 
          </>
      }

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
                  <IonLabel className="addLabel" position="stacked"  >Date</IonLabel>
                  <IonDatetimeButton    datetime="datetime2" style={{marginTop:'10px'}}></IonDatetimeButton>
        
                  <IonModal keepContentsMounted={true} ref={modal} onWillDismiss={(ev) => onWillDismiss(ev)}>
                    <IonDatetime value={installmentFormData.date} id="datetime2" name='date' onIonChange={(e: any) => handleChange(e)} ></IonDatetime>
                  </IonModal>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked" className="addLabel">Name</IonLabel>
                  <IonInput clearInput={true} name='name' onIonInput={(e: any) => handleChange(e)} value={installmentFormData.name} ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked" className="addLabel">Amount</IonLabel>
                  <IonInput clearInput={true} type="number"  name='amount' onIonInput={(e: any) => handleChange(e)} value={installmentFormData.amount} ></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked" className="addLabel">Payment Method</IonLabel>
                  <IonSelect name='paymentMethod' onIonChange={(ev:any) => handleChange(ev)} aria-label="paymentMethod" interface="popover" placeholder="Select user">
                    <IonSelectOption value="M">MINTPAY</IonSelectOption>
                    <IonSelectOption value="K">KOKO</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked" className="addLabel">Individual Purchase</IonLabel>
                  <IonToggle checked={isCombined} name='isCombined' enableOnOffLabels={true} style={{fontColor:'red'}} onIonChange={(ev:any) => combineChange(ev)}  >Enable Notifications</IonToggle>
                </IonItem>

                <IonItem hidden={!isCombined}>
                  <IonLabel position="stacked" className="addLabel">User</IonLabel>
                  <IonSelect aria-label="user" name='user' onIonChange={(ev:any) => handleChange(ev)} interface="popover" placeholder="Select user">
                    {
                      UserList.data.map((item:any) => {
                        return <IonSelectOption value={item._id} key={item._id}>{item.name}</IonSelectOption>
                      })
                    }
                  </IonSelect>
                </IonItem> 

              </IonList>
              <IonButton expand="block" className="footer" onClick={(e:any) => onAddAccept(e)}>Save</IonButton>
            </IonContent>
          </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
