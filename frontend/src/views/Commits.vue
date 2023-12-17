<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/" />
                </IonButtons>
                <IonTitle>commits</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonList>
                <IonItem v-for="(commit, index) in commits" :key="index">
                    <IonLabel>
                        <h2>{{ commit.sha }}</h2>
                        <p>{{ commit.commit.message }}</p>
                    </IonLabel>
                </IonItem>
            </IonList>
        </IonContent>
    </IonPage>
</template>

<script>
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonButtons, IonBackButton } from '@ionic/vue';

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

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
            commits: [],
        };
    },
    async created() {
        const repoName = this.$route.params.repoName;
        const response = await axios.get(`http://192.168.86.63:3000/api/github/repos/details/${repoName}`);
        this.commits = response.data;
    },
};
</script>