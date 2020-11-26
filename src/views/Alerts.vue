<template>
  <v-container fluid>
    <v-row>
        <v-col cols="12" class="p-5 mx-auto">
            <h2 class="text-center">Alerts</h2>
             <transition name="fade">
                <h6 v-if="message" class="pt-5">{{message}}</h6>
            </transition>
            <div class="text-center">
                <v-btn
                color="success"
                href="/create_alert/"
                >
                Create Alert
                </v-btn>
            </div>
            <v-row>
                <v-col cols="12" v-for="alert in alerts" v-bind:key="alert.id">
                    <AlertCard :alert="alert" :alerts="alerts"/>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import AlertCard from '@/components/AlertCard';

export default {
    name: 'Alerts',
    components:{
        AlertCard
    },
    data() {
        return {
            alerts: [],
            accountId: '',
            message: '',
        }
    },
    methods:{
        getAccountInformation: function() {
            axios.get('http://192.168.1.196:8000/api/v1/account/', {
                headers: {
                    'Authorization': `Token f43c1ce6396e91936da9a7123909d0baf53651f1` 
                }
            })
            .then((res) => {
                if (res.status === 200){
                    this.accountId = res.data[0].account_id
                }else{
                    this.message = 'Sorry, we are having issues getting your account information.'                    
                }
            })
            .catch((error) => {
                if(error.response.status === 401){
                    window.location.href = '/login/'
                }
                if (error.response) {
                    let message = ''
                    for (let errorMessage in error.response.data){
                        if(errorMessage === 'error'){
                            message+= `${error.response.data[errorMessage]}`
                        }
                        else{
                            message+= `${errorMessage}: ${error.response.data[errorMessage][0]}`
                        }
                    }               
                    this.message = `${message}`
                } else if (error.request) {
                    this.message = `Sorry, the following error occured (${error.request}).`
                } else {                
                    this.message = `Sorry, the following error occured (${error.message}).`
                }
            })
        },
        getAlertInformation : function() {
            axios.get('http://192.168.1.196:8000/api/v1/alerts/', {
                headers: {
                    'Authorization': `Token f43c1ce6396e91936da9a7123909d0baf53651f1` 
                }
            })
            .then((res) => {
                if (res.status === 200){
                    this.alerts = res.data
                }else{
                    this.message = 'Sorry, we are having issues getting your account information.'                    
                }
            })
            .catch((error) => {
                this.message = this.$globalFunctions.errorResponse(error)
            })
        }
        
      
    },
    mounted(){
        this.getAccountInformation()
        this.getAlertInformation()
    },

}
</script>

<style>
.alert-form{
    background-color: #f5f0f0;
}
</style>