<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-text-center ion-padding">
      <div style="text-align: center;">
        <img src="./MobileHub (1).png" alt="Imagen de bienvenida" style="width: 80%; max-width: 400px;">
      </div>

      <IonList class="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput v-model="email"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput type="password" v-model="password"></IonInput>
        </IonItem>
        <IonButton expand="block" @click="login" class="custom-button">Iniciar sesión</IonButton>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonButton, IonButtons, IonBackButton, IonLabel } from '@ionic/vue';
import axios from 'axios';

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonButtons,
    IonBackButton,
    IonLabel
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://192.168.86.63:3000/api/user/login', {
          email: this.email,
          password: this.password
        });
        
        // Manejar la respuesta del servidor
        if (response.data.error) {
          console.error('Error al iniciar sesión:', response.data.error);
          // Manejar el error, por ejemplo, mostrar un mensaje al usuario
        } else {
          console.log('Token recibido:', response.data.data.token);
          router.push('./')
          // Redirigir a la siguiente página o realizar otras acciones después del inicio de sesión exitoso
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error.response.data);
        // Manejar los errores, por ejemplo, mostrar un mensaje al usuario
      }
    }
  }
};
</script>

<style scoped>
.custom-button {
  --background: black;
  --color: white;
}
</style>
