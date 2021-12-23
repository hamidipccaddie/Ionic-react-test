import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import { Redirect } from 'react-router';
import './Tab3.css';

const Tab3: React.FC = () => {
  window.localStorage.clear()
  return (
    <IonRouterOutlet>
      <Redirect to="/tab1" />
    </IonRouterOutlet>
  );
};

export default Tab3;
