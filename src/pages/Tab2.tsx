import React, { useRef, useMemo } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { IonIcon, IonCol, IonGrid, IonRow } from '@ionic/react';
import { createOutline, trashOutline, arrowForwardOutline } from 'ionicons/icons';
import './Tab2.css';
import { IonButtons, IonButton, IonModal} from '@ionic/react';
import { IonItemGroup, IonItem, IonLabel, IonItemDivider } from '@ionic/react';
import { IonItemOption, IonItemOptions, IonItemSliding } from '@ionic/react';
import { IonAccordion, IonAccordionGroup } from '@ionic/react';
import _ from "lodash";


const Tab2: React.FC = () => {
  type TripData = {
    id: string;
    date: string;
    description: string;
    amount: string;
  }; 

  type TripDate = {
    date: string;
    noOfItems: number;
  }; 

  type SummarizedTripDate = {
    date: string;
    items: TripData[];
  }; 
  
  const data: TripData[] = [
    {
      id: 'a',
      date: '2018-10-31',
      description: 'test1',
      amount: 'a'
    },
    {
      id: 'b',
      date: '2018-10-31',
      description: 'test2',
      amount: 'e'
    },
    {
      id: 'a',
      date: '2018-05-30',
      description: 'test1',
      amount: 'a'
    },

  ]; 
  // const uniqueDates = [...new Set(data.map(item => item.date))];
  // let groups: Array<SummarizedTripDate> = _.groupBy(data, 'date')
  // console.log(groups)

  var uniqueNames = [];
  for(let i = 0; i< data.length; i++){    
      if(uniqueNames.indexOf(data[i].date) === -1){
          uniqueNames.push(data[i].date);        
      }        
  }
  // console.log(uniqueNames)

  const json : TripDate[] = [];
  for(let i = 0; i< data.length; i++) {
    // if(json.indexOf(data[i].date) === -1){
    //   // json.push({"date":data[i].date, "noOfItems":0})
    //   json.push(data[i].date);  
    // } 
    var result = json.some(x => x.date === data[i].date);
    if(result){
      var result1 = json.filter(x => x.date === data[i].date);
      result1[0].noOfItems = 1
    } else{
      json.push({"date":data[i].date, "noOfItems":0})
    }
  }
  // console.log(json)

  let result2: TripData[] = [];
  function filterItems(date: string){
    result2 = data.filter(x => x.date === date);
    console.log(result2)
  }
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>

        
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
