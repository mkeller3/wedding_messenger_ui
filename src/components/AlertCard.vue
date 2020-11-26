<template>
<v-card>
    <v-card-text>
        <a :href="'/update_alert/' + alert.id"><h2>Alert</h2></a>
        <div class="alert-information"><v-icon>mdi-calendar</v-icon> {{alert.run_time}}</div>
        <div class="alert-information"><v-icon>mdi-message-bulleted</v-icon> {{alert.message}}</div>
        <div class="alert-information" v-if="alert.group_message === false"><v-icon>mdi-account-multiple</v-icon> All Guest</div>
        <div class="alert-information" v-else><v-icon>mdi-account-multiple</v-icon> Group Alert</div>
        <div class="alert-information" v-on:click="deleteAlert(alert)"><v-icon>mdi-trash-can</v-icon> Delete Alert</div>
    </v-card-text>
</v-card>
  
</template>

<script>
import axios from 'axios';

export default {
    name: 'AlertCard',
    props: {
        alert: {
            type: Object
        },
        alerts: {
            type: Array
        }
    },
    methods: {
        deleteAlert: function(alert){
            axios.delete(`http://192.168.1.196:8000/api/v1/alert/?id=${alert.id}`, {
                headers: {
                    'Authorization': `Token f43c1ce6396e91936da9a7123909d0baf53651f1` 
                }
            })
            .then((res) => {
                if (res.status === 204){
                    let index = this.alerts.map(function (alertInformation) { return alertInformation.id; }).indexOf(alert.id);
                    this.alerts.splice(index,1)
                    this.message = `${alert.first_name} information has been deleted!`
                }else{
                    this.message = `Sorry, we are having issues deleting ${alert.first_name} from your account.`                   
                }
            })
            .catch(() => {
                this.message = `Sorry, we are having issues deleting ${alert.first_name} from your account.`
            })
        }
    }
}
</script>

<style scoped>
.alert-information{
    padding-bottom: .5rem;
}
</style>