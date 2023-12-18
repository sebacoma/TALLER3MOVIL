<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/" />
                </IonButtons>
                <IonTitle>Edit Profile</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonList>
                <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput v-model="user.name" type="text"></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput v-model="user.email" type="email"></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">rut</IonLabel>
                    <IonInput v-model="user.rut" type="rut"></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">date</IonLabel>
                    <IonInput v-model="user.Date" type="date"></IonInput>
                </IonItem>
            </IonList>
            <IonButton expand="full" @click="editUser">Save</IonButton>
        </IonContent>
    </IonPage>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonButtons, IonBackButton, IonList, IonItem, IonLabel } from '@ionic/vue';
import { ref } from 'vue';
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
        IonBackButton,
        IonList,
        IonItem,
        IonLabel
    },
    setup() {
        const user = ref({
            name: '',
            email: '',
            rut: '',
            date: ''
        });

        const editUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const decoded = jwt_decode(token);
                const userId = decoded.id;
                // Envía los datos del usuario al servidor para actualizar
                userId = this.$store.state.userId; // Replace with actual user ID
                const response = await axios.put(`http://192.168.1.92:3000/api/user/edit/${userId}`, user.value);
                console.log('Usuario editado:', response.data);
                // Maneja la respuesta del servidor, como redirigir a otra página o mostrar un mensaje de éxito
            } catch (error) {
                console.error('Error al editar usuario:', error.message);
                // Maneja errores, muestra un mensaje al usuario, etc.
            }
        };

        return {
            user,
            editUser
        };
    }
};
</script>