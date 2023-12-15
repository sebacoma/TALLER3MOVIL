<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Login</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-text-center ion-padding">
      <IonImg src="./MobileHub (1).png"></IonImg>
      <IonList class="ion-padding">
        <IonItem>
          <IonInput label="Email" v-model="email"></IonInput>
        </IonItem>
        <IonItem>
          <IonInput label="Contraseña" type="password" v-model="password"></IonInput>
        </IonItem>
        <IonButton expand="block" @click="login" class="custom-button">Iniciar sesión</IonButton>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonList, IonItem, IonInput, IonButton } from '@ionic/vue';
import axios from 'axios';

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonImg,
    IonList,
    IonItem,
    IonInput,
    IonButton,
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
        const response = await axios.post('http://192.168.1.92:3000/api/user/login', {
          email: this.email,
          password: this.password
        });
        
        // Manejar la respuesta del servidor
        if (response.data.error) {
          console.error('Error al iniciar sesión:', response.data.error);
          // Manejar el error, por ejemplo, mostrar un mensaje al usuario
        } else {
          console.log('Token recibido:', response.data.data.token);
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
