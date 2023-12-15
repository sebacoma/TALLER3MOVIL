<template>
    <IonPage>
      <IonContent class="ion-padding">
        <div class="ion-text-center">
          <h1>Signup</h1>
          <IonInput placeholder="Nombre" v-model="name"></IonInput>
          <IonInput placeholder="Correo electrónico" v-model="email"></IonInput>
          <IonInput placeholder="RUT" v-model="rut"></IonInput>
          <IonInput placeholder="Fecha de nacimiento" v-model="date"></IonInput>
          <IonInput placeholder="Contraseña" type="password" v-model="password"></IonInput>
          <IonButton @click="signup" class="custom-button">Registrarse</IonButton>
        </div>
      </IonContent>
    </IonPage>
  </template>
  
  <script>
  import { IonPage, IonContent, IonButton, IonInput } from '@ionic/vue';
  import axios from 'axios';
  
  export default {
    components: {
      IonPage,
      IonContent,
      IonButton,
      IonInput,
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
      async signup() {
        try {
          const response = await axios.post('http://192.168.1.92:3000/api/user/register', {
            name: this.name,
            email: this.email,
            rut: this.rut,
            date: this.date,
            password: this.password
          });
  
          if (response.data.error) {
            console.error('Error al registrarse:', response.data.error);
            // Manejar el error, por ejemplo, mostrar un mensaje al usuario
          } else {
            console.log('Usuario registrado:', response.data.data);
            // Redirigir a la siguiente página o realizar otras acciones después del registro exitoso
          }
        } catch (error) {
          console.error('Error al registrarse:', error.response.data);
          // Manejar los errores, por ejemplo, mostrar un mensaje al usuario
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
  