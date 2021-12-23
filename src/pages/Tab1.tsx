import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonAvatar, IonImg, IonLabel, IonList, IonPage, IonInput, IonRadioGroup, IonListHeader, IonButton, IonRadio, IonRow, IonCol, IonRouterOutlet } from '@ionic/react';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Redirect} from 'react-router';

const Tab1: React.FC = () => {
  
  //localStorage.clear()
  /*const [listItems, setListItems] = useState({id:0,title:''});

  React.useEffect(() => {
      sendRequest().then(data => {
          setListItems(data)
      });
  }, []);
  
  const sendRequest = () => {
      return axios
          .get('https://jsonplaceholder.typicode.com/todos/1',{
            headers:{
                     'Content-Type' : 'application/json'
            },
          })
          .then((response) => {
              return response.data;
          })
  };*/

  type FormValues = {
    login: string;
    password: string
  }

  let data = [
    {
      "id": 1,
      "name": "category 1",
      "title": "Test page",
      "image": "assets/icon/icon.png"
    },
    {
      "id": 2,
      "name": "category 2",
      "title": "Test page",
      "image": "assets/icon/icon.png"
    },
    {
      "id": 3,
      "name": "category 3",
      "title": "Test page",
      "image": "assets/icon/icon.png"
    }
  ];

  const [listItems, setListItems] = useState<any>([]);

  React.useEffect(() => {
    setListItems(data)
  }, []);

  /*const sendRequest = () => {
      return axios
          .get('https://jsonplaceholder.typicode.com/todos/1',{
            headers:{
                     'Content-Type' : 'application/json'
            },
          })
          .then((response) => {
              return response.data;
          })
  }*/

  console.log(listItems)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [results, setResults] = useState<any>({});

  React.useEffect(() => {
    handleSubmit().then(data => {
      setResults(data)
    });
  }, []);

  async function handleSubmit() {
    let response = {data:'', status:500};
    if (username && password) {
      response = await axios.get('https://jsonplaceholder.typicode.com/todos/1', {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if(response['status']===200)
      {
      localStorage.setItem('name','zakaria');
      localStorage.setItem('session','true');
      return setResults(response);
      }
    }
    else{
      return setResults(response);
    }
  }

  if((typeof results !== 'undefined' && results['status'] === 200) ||localStorage.getItem('session') === 'true'){
    return (
        <IonRouterOutlet>
            <Redirect exact to="/tab2" />
        </IonRouterOutlet>
      )
      
  }
  else{
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle> Api List </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList color="success">
          {
            listItems.map((item: any) => {

              return (
                <IonItem key={item['id']}><IonLabel>
                  <h3> {item['title']} {item['name']} </h3>
                </IonLabel>
                </IonItem>
              );
            })
          }
        </IonList>
          <IonItem lines="full">
            <IonLabel>Login</IonLabel>
            <IonInput
              type="email" onIonChange={(e: any) => setUsername(e.target.value)}
              required />
          </IonItem>

          <IonItem lines="full">
            <IonLabel>Password</IonLabel>
            <IonInput
              type='password' onIonChange={(e: any) => setPassword(e.target.value)} required
            />
          </IonItem>

          <IonRow>
            <IonCol>
              <IonButton type='submit' color="danger" expand="block" onClick={handleSubmit}>Submit</IonButton>
            </IonCol>
          </IonRow>
      </IonContent>

    </IonPage>);
  }
};

export default Tab1;

