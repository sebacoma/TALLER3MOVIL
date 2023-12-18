<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>Signup</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <div style="text-align: center;">
        <img src="./MobileHub (1).png" alt="Imagen de bienvenida" style="width: 80%; max-width: 400px;">
      </div>
      <div class="ion-text-center">
        <h1>Signup</h1>
        <IonInput placeholder="Nombre Completo" v-model="name"></IonInput>
        <IonInput placeholder="Email" v-model="email"></IonInput>
        <IonInput placeholder="RUT" v-model="rut"></IonInput>
        <IonInput placeholder="Fecha de nacimiento" v-model="date"></IonInput>
        <IonInput placeholder="Contraseña" type="password" v-model="password"></IonInput>
        <IonButton @click="signup" class="custom-button">Signup</IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonButtons, IonBackButton } from '@ionic/vue';
import axios from 'axios';

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonButtons,
    IonBackButton
  },
  data() {
    return {
      name: '',
      email: '',
      rut: '',
      date: '',
      password: ''
    };
  },
  methods: {
    //metodo para registrarse, usando axios para consumir
    async signup() {
      try {
        const response = await axios.post('http://192.168.1.92:3000/api/user/register', {
          name: this.name,
          email: this.email,
          rut: this.rut,
          date: this.date,
          password: this.password,
        });

        if (response.data.error) {
          console.error('Error al registrarse:', response.data.error);
          
        } else {
          console.log('Usuario registrado:', response.data.data);
          //manda a la HomePage
          this.$router.push('/home');
        }
      } catch (error) {
        console.error('Error al registrarse:', error.response.data);
       
      }
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para la página de registro */

.custom-button {
  --background: black;
  --color: white;
}
</style>
