import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonPage, IonRouterOutlet, IonButton, IonInput } from '@ionic/react';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { Redirect } from 'react-router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

const Tab2: React.FC = () => {

  const [state, setState] = useState<any>({
    stringEncoded: '',
    encodeResponse: 'Hello World',
    dataEncode: ''
  });

  const dataToScan = async () => {
    const data = await BarcodeScanner.scan();
    alert(JSON.stringify(data));
    setState({ stringEncoded: data.text })
  };

  const createCode = () => {
    BarcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE, state.encodeResponse)
      .then((data: any) => {
        console.log(state.encodeResponse);
      }, (error: string) => {
        console.log("Error : " + error);
      });
  };

  const [listItems, setListItems] = useState([]);
  const userName = localStorage.getItem('name');

  React.useEffect(() => {
    sendRequest().then(data => {
      setListItems(data.country)
    });
  }, []);
  
  const url = 'https://api.nationalize.io/?name=' + localStorage.getItem('name');
  
  const sendRequest = () => {
    return axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((response) => {
        return response.data;
      })
  };



  if (localStorage.getItem('session') === 'true') {







    console.log(listItems)

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>User {userName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 2</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ExploreContainer name="Tab 2 page" />
          <IonList color="success">
            {
              listItems.map((item: any) => {

                return (
                  <IonItem key={item['country_id']}><IonLabel>
                    <h3> {item['country_id']} {item['probability']} </h3>
                  </IonLabel>
                  </IonItem>
                );
              })
            }
          </IonList>
        </IonContent>
        <IonContent className="ion-padding">

          <strong>Scan Content</strong>

          <IonButton color="danger" expand="block" onClick={dataToScan}>
            Scan Data
          </IonButton>

          <strong>Generate QR code</strong>

          <IonItem>
            <IonInput type='text' name='dataEncode' value={state.encodeResponse} onIonChange={(e: any) => setState({ encodeResponse: e.target.value })}></IonInput>
          </IonItem>

          <IonButton color="primary" expand="block" onClick={createCode}>
            Generate QR
          </IonButton>

        </IonContent>
      </IonPage>
    );
  }
  else {
    return (
      <IonRouterOutlet>
        <Redirect to="/tab1" />
      </IonRouterOutlet>);
  }
};

export default Tab2;
