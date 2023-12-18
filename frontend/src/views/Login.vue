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
        <IonButton @click="login" class="custom-button">Log in</IonButton>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonButton, IonButtons, IonBackButton, IonLabel } from '@ionic/vue';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');

    const login = async () => {
      try {
        const response = await axios.post('http://192.168.1.92:3000/api/user/login', {
          email: email.value,
          password: password.value
        });

        // Handle server response
        if (response.data.error) {
          console.error('Error al iniciar sesión:', response.data.error);
          // Handle error, e.g., show a message to the user
        } else {
          console.log('Token recibido:', response.data.data.token);
          router.push('/repo-info');
          // Redirect to the next page or perform other actions after successful login
        }
      } catch (error) {
        if (error.response) {
          console.error('Error al iniciar sesión:', error.response.data);
        } else {
          console.error('Error al iniciar sesión:', error.message);
        }
      }
    };

    return {
      email,
      password,
      login
    };
  }
};
</script>

<style scoped>
.custom-button {
  --background: black;
  --color: white;
}
</style>
