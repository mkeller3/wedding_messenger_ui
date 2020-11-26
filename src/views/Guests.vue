<template>
  <v-container fluid>
      <v-row>
          <v-col cols="12" class="mx-auto">
            <h2 class="text-center">Guests</h2>
            <v-alert type="error" v-if="message">
                    {{message}}
            </v-alert>
            <div class="text-center">
            <v-btn
            color="success"
            href="/create_guest/"
            >
            Create Guest
            </v-btn>
            </div>
            <v-row>
                <v-col cols="12" v-for="guest in guests" v-bind:key="guest.id">
                    <GuestCard :guest="guest" :guests="guests"/>
                </v-col>
            </v-row>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import GuestCard from '@/components/GuestCard';

export default {
    name: 'Guests',
    components:{
        GuestCard
    },
    data() {
        return {
            guests: [],
            accountId: '',
            message: ''
        }
    },
    methods:{
        getAccountInformation: function() {
            axios.get('http://192.168.1.196:8000/api/v1/account/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}` 
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
                this.message = this.$globalFunctions.errorResponse(error)
            })
        },
        getGuestInformation : function() {
            axios.get('http://192.168.1.196:8000/api/v1/guests/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}` 
                }
            })
            .then((res) => {
                if (res.status === 200){
                    this.guests = res.data
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
        this.getGuestInformation()
    },
}
</script>

<style>

</style>