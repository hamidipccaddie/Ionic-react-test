import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonAvatar, IonImg, IonLabel, IonList, IonPage } from '@ionic/react';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const [listItems, setListItems] = useState<any>([]);



React.useEffect(() => {
    sendRequest().then(data => {
        setListItems(data.data)
    });
}, []);



const sendRequest = () => {
    return axios
        .get('https://dummyapi.io/data/v1/user', {
            headers: {
                'app-id': '<YOUR_APP_ID>',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            console.log(response);
            return response.data;
        })
};

const ApiTest: React.FC = () => {
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Tab 1</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Tab 1</IonTitle>
              </IonToolbar>
            </IonHeader>
            <ExploreContainer name="Tab 1 page" />
          </IonContent>
        </IonPage>
      );
    };
    
/*return (
<IonPage>
  <IonHeader>
    <IonToolbar color="primary">
    <IonTitle> List </IonTitle>
    </IonToolbar>
  </IonHeader>
<IonContent>
     <IonList color="primary">
         {
           listItems.map((item :any) => {
 
            return (
            <IonItem key={ item['id'] }>
             <IonAvatar slot="start">
               <IonImg src={ item['picture'] } </IonImg>
              </IonAvatar>
              <IonLabel>
                   <h3> { item['firstName'] } { item['lastName'] } </h3>
              </IonLabel>
            </IonItem>
             );
         })
      }
 </IonList>
</IonContent>
</IonPage>
);
};*/

export default ApiTest;