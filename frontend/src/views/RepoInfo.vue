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
      <div>
        <h1>GitHub Repositories</h1>
        <IonList>
          <IonItem v-for="(repo, index) in repos" :key="index">
            <IonLabel>{{ repo.name }}</IonLabel>
          </IonItem>
        </IonList>
      </div>

    </IonContent>

  </IonPage>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonList, IonItem, IonBackButton } from '@ionic/vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButton,
    IonList,
    IonItem,
    IonBackButton
  },
  setup() {
    const repos = ref([]);

    const fetchRepos = async () => {
      try {
        const response = await axios.get('http://192.168.86.63:3000/api/github/user-repos');
        repos.value = response.data;
      } catch (error) {
        console.error('Error fetching repositories:', error.message);
      }
    };

    onMounted(fetchRepos);

    return {
      repos
    };
  }
};
</script>
