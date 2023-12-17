<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div style="text-align: center;">
        <img src="./MobileHub (1).png" alt="Imagen de bienvenida" style="width: 80%; max-width: 400px;">
      </div>
      <div class="ion-text-center">
        <h1>WELCOME</h1>
        <IonButton @click="goToLogin" class="custom-button">Login</IonButton>
        <IonButton @click="goToSignup" class="custom-button">Signup</IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>

<script>
import { IonPage, IonContent, IonButton } from '@ionic/vue';

export default {
  components: {
    IonPage,
    IonContent,
    IonButton,
  },
  methods: {
    goToLogin() {
      this.$router.push('/login'); // Redirige a la ruta '/login'
    },
    goToSignup() {
      this.$router.push('/signup'); // Redirige a la ruta '/signup'
    },
  },
};
</script>

<style scoped>


.custom-button {
  --background: black;
  --color: white;
}
</style>
