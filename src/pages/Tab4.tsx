import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import {HTTP} from '@ionic-native/http';

const Tab3: React.FC = () => {
  const [listItems, setListItems] = useState({token: ''});
  

  const userName = 'SwissGolfApp';
  const password = 'QJj4V3YwyzEzz49u';

  const url = 'https://asg-api-union.golfbox.io/myswissgolf/v1/Profiles/Authorization';
  const testUrl = 'https://test-asg-api-union.golfbox.io/myswissgolf/v1/Profiles/Authorization';
  
  const basicAuth = Buffer.from(userName + ":" + password).toString('base64');

  console.log(basicAuth)

  React.useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        //mode: 'no-cors' as RequestMode,   // by pass the cors
        headers: { 'Content-Type' : 'application/json',
          "Accept": "application/json",
          "Authorization" : "Basic "+basicAuth,
           },
        body: JSON.stringify({ 
          "TimeStamp": "20211223T000000",
          "Username": userName,
          "Password": password,
          "LifeTimeID": "1234",
          "PinCode": "1234",
       })
    };

    const headers = { 'Content-Type' : 'application/json',
          "Accept": "application/json",
          "Authorization" : "Basic "+basicAuth,
           }
  
    const parameters = { 
      "TimeStamp": "20211223T000000",
      "Username": userName,
      "Password": password,
      "LifeTimeID": "1234",
      "PinCode": "1234",
   } ;
    //const myRequest = new Request(testUrl,requestOptions);
    //const myMode = myRequest.mode; 

    //fetch(testUrl,requestOptions)
       // .then(response => response.json())
        //.then(data => setListItems(data));

        // cordova http call
        HTTP.post(testUrl,parameters,headers)
        .then(response => setListItems(response.data))

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);

console.log(listItems); 

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>User {userName}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonList color="success">
      <IonItem>
                <IonLabel>
                <h3> {listItems['token']}</h3>
                </IonLabel>
              </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
  );
};

export default Tab3;
