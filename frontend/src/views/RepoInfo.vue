<template>
    <div>
      <h1>Información del Repositorio de GitHub</h1>
      <button @click="obtenerInfoRepo">Obtener información</button>
      <div v-if="repoInfo">
        <p><strong>Nombre:</strong> {{ repoInfo.name }}</p>
        <p><strong>Descripción:</strong> {{ repoInfo.description }}</p>
        <!-- Agrega más campos según la información que quieras mostrar -->
      </div>
    </div>
  </template>
  <script>
  import { IonPage, IonHeader, IonToolbar, IonContent, IonButton } from '@ionic/vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router'; // Importa useRouter de Vue Router
  
  export default {
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonContent,
      IonButton
    },
    data() {
      return {
        repoInfo: null,
      };
    },
    methods: {
      async obtenerInfoRepo() {
        try {
          const response = await axios.get('http://192.168.86.63:3000/api/github/repo-info'); // Cambia la URL si es necesario
          this.repoInfo = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      redirigirARepoInfo() {
        const router = useRouter(); // Obtiene la instancia del enrutador
        router.push({ name: 'RepoInfo' }); // Redirige al usuario a la página 'RepoInfo'
      }
    }
  };
  </script>