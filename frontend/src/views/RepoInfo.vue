<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonButtons slot="end">
          <IonButton @click="goToEditPage()">Edit user</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-text-center ion-padding">
      <div>
        <h1>GitHub Repositories</h1>
        <IonList>
          <IonItem v-for="(repo, index) in repos" :key="index" @click="selectRepo(repo)">
            <IonLabel>
              <p>
              <h2>{{ repo.name }}</h2>
              </p>
            </IonLabel>
            <div v-if="selectedRepo && selectedRepo.name === repo.name">
              <p>Created at: {{ new Date(selectedRepo.created_at).toLocaleDateString() }}</p>
              <IonButton @click="goToCommitsPage(selectedRepo.name)">Number of commits: {{ selectedRepo.commits }}</IonButton>
            </div>
          </IonItem>
        </IonList>
      </div>
    </IonContent>

  </IonPage>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonList, IonItem, IonBackButton, IonLabel } from '@ionic/vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

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
    const selectedRepo = ref(null);
    const router = useRouter();

    const goToEditPage = () => {
      router.push('/edituser'); 
    };

    const goToCommitsPage = (repoName) => {
      console.log('apretao')
      router.push(`/commits/${repoName}`);
    };


    const fetchRepos = async () => {
      try {
        const response = await axios.get('http://192.168.1.92:3000/api/github/user-repos');
        repos.value = response.data;
      } catch (error) {
        console.error('Error fetching repositories:', error.message);
      } 
    };

    const selectRepo = async (repo) => {
      selectedRepo.value = repo;
      try {
        const response = await axios.get(`http://192.168.1.92:3000/api/github/repos/${repo.name}`);
        console.log(response.data)
        console.log('aaaahhhhhh')
        selectedRepo.value = response.data;
      } catch (error) {
        console.error('Error fetching repository information:', error.message);
      }
    };
    
    

    onMounted(fetchRepos);

    return {
      repos,
      selectedRepo,
      selectRepo,
      goToCommitsPage,
      goToEditPage
    };
  }
};
</script>
