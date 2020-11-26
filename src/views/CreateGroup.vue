<template>
  <v-container fluid>
    <v-row>
        <v-col cols="10" class="mx-auto">
          <h2 class="text-center">Create Group</h2>
          <v-alert type="error" v-if="message">
                {{message}}
          </v-alert>
          <form @submit.prevent="processForm">
            <v-text-field
                v-model="groupName"
                label="Group Name"
                required
            ></v-text-field>
            <h4>Guest List</h4>
            <v-list class="px-5 my-5">
                <v-list-item v-for="guest in guests" v-bind:key="guest.id">
                    <v-list-item-content class="pl-3">                
                        <v-switch v-if="selectedGuests.includes(guest.id)"
                            v-on:click="toggleGuest(guest.id)"
                            :label="`${guest.full_name}`"
                            value="true"
                            color="error"
                        ></v-switch>
                        <v-switch v-else
                            v-on:click="toggleGuest(guest.id)"
                            :label="`${guest.full_name}`"
                            color="error"
                        ></v-switch>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-btn
                color="success"
                @click="processForm"
            >
            Create Group
            </v-btn>
          </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CreateGroup',
    data() {
        return {
            groupName: '',
            guests: [],
            selectedGuests: [],
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
                if (error.response) {
                    let message = ''
                    for (let errorMessage in error.response.data){
                        message+= error.response.data[errorMessage][0]
                    }               
                    this.message = `${message}`
                } else if (error.request) {
                    this.message = `Sorry, the following error occured (${error.request}).`
                } else {                
                    this.message = `Sorry, the following error occured (${error.message}).`
                }
            })
        },
        getGuestsInformation: function() {
            axios.get('http://192.168.1.196:8000/api/v1/guests/', {
                headers: {
                    'Authorization': `Token f43c1ce6396e91936da9a7123909d0baf53651f1` 
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
        },
        processForm: function() {             
            axios.post(`http://192.168.1.196:8000/api/v1/group/`, {
                account_id: this.accountId,
                group_name: this.groupName,
                guests: this.selectedGuests,
            }, {
                headers: {
                    'Authorization': `Token f43c1ce6396e91936da9a7123909d0baf53651f1` 
                }
            })
            .then((res) => {
                if (res.status === 201){
                    this.message = `${this.groupName} group has been created!`
                    window.location.href = '/groups/'
                }else{
                    this.message = `Sorry, we are having issues creating ${this.groupName}.`                   
                }
            })
            .catch((error) => {
                this.message = this.$globalFunctions.errorResponse(error)
            })       
        },
        toggleGuest: function(guest){
            if(this.selectedGuests.includes(guest)){
                this.selectedGuests.splice(this.selectedGuests.indexOf(guest),1)
            }else{
                this.selectedGuests.push(guest)
            }
        }
    },
    mounted(){
        this.getAccountInformation()
        this.getGuestsInformation()
    },    
}
</script>

<style>
.v-list{
    background-color: #f5f0f0 !important;
}
</style>