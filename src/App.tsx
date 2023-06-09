import { Redirect, Route } from 'react-router-dom';
import React, { useState } from 'react';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {  square } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Login from './pages/Login';

import {  useSelector } from 'react-redux'
import { AppStatDto } from './models'
import { ACTION_STATUS } from './constants'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const authData = useSelector((state: AppStatDto) => state.authentication.authData)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  React.useEffect(() => {
  }, [])

  React.useEffect(() => {
    if (authData.status === ACTION_STATUS.SUCCESS) {
      setIsAuthenticated(authData.data.isAuthenticated)
    } 
  }, [authData.status])

  return(
  <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              
              {
                isAuthenticated
                ?
                <>
                  <Route exact path="/tab1">
                    <Tab1 />
                  </Route>
                  <Route exact path="/tab2">
                    <Tab2 />
                  </Route>
                  <Route path="/tab3">
                    <Tab3 />
                  </Route> 
                </>
                :
                <Route exact path="/login">
                <Login />
                </Route>
              }
              {
                isAuthenticated
                ?
                <Route exact path="/">
                <Redirect to="/tab1" />
                </Route>
                :
                <Route exact path="/">
                <Redirect to="/login" />
                </Route>
              }
              {
                isAuthenticated
                ?
                <Route exact path="/login">
                <Redirect to="/tab1" />
                </Route>
                :
                <Route exact path="/">
                <Redirect to="/login" />
                </Route>
              }
            </IonRouterOutlet>
            <IonTabBar slot="bottom" hidden={!isAuthenticated}>
              <IonTabButton tab="tab1" href="/tab1" >
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel >Trips</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2" >
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Installments </IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab4" disabled>
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel> </IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
  </IonApp>
)};

export default App;
