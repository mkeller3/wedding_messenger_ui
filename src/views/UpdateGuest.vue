<template>
<v-container fluid>
  <v-row>
      <v-col cols="12" md="6" class="mx-auto">
          <h2 class="text-center">Update Guest</h2>
          <transition name="fade">
                <h6 v-if="message" class="pt-5">{{message}}</h6>
            </transition>
          <form @submit.prevent="processForm">
            <v-text-field
                v-model="firstName"
                label="First Name"
                required
            ></v-text-field>
            <v-text-field
                v-model="lastName"
                label="Last Name"
                required
            ></v-text-field>
            <v-text-field
                v-model="phoneNumber"
                label="Phone Number"
                type="tel"
                required
            ></v-text-field>
            <v-text-field
                v-model="email"
                label="Email (Optional)"
                type="email"
            ></v-text-field>
            <v-autocomplete
                v-model="address"
                :items="addresses"
                :loading="isLoading"
                @keypress="search"
                hide-no-data
                hide-selected
                item-text="text"
                item-value="magicKey"
                label="Address"
                return-object
            ></v-autocomplete>
            <v-btn
                color="success"
                @click="processForm"
            >
            Update Guest
            </v-btn>
          </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';


export default {
    name: 'UpdateGuest',
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            addresses: [],
            message: '',
            address: '',
            accountId: '',
            isLoading: false
        }
    },
    methods:{
        getAccountInformation: function() {
            axios.get('http://192.168.50.31:8000/api/v1/account/', {
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
                if (error.response) {
                    let message = ''
                    for (let errorMessage in error.response.data){
                        message+= error.response.data[errorMessage]
                    }               
                    this.message = `${message}`
                } else if (error.request) {
                    this.message = `Sorry, the following error occured (${error.request}).`
                } else {                
                    this.message = `Sorry, the following error occured (${error.message}).`
                }
            })
        },
        getGuestInformation: function () {               
            axios.get(`http://192.168.50.31:8000/api/v1/guest/?id=${this.$route.params.id}`,{
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}` 
                }                
            })
            .then((res) => {
                if (res.status === 200){
                    this.firstName = res.data[0].first_name
                    this.lastName = res.data[0].last_name
                    this.phoneNumber = res.data[0].phone_number
                    this.email = res.data[0].email_address
                    this.address = {text:res.data[0].full_address}
                    this.addresses = [{text:res.data[0].full_address}]
                }else{
                    this.message = 'Sorry, we are having issues getting your account information.'                    
                }
            })
            .catch((error) => {
                if (error.response) {
                    let message = ''
                    for (let errorMessage in error.response.data){
                        message+= error.response.data[errorMessage]
                    }               
                    this.message = `${message}`
                } else if (error.request) {
                    this.message = `Sorry, the following error occured (${error.request}).`
                } else {                
                    this.message = `Sorry, the following error occured (${error.message}).`
                }
            })
        },
        processForm: function() {
            return axios.get(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?magicKey=${this.address.magicKey}&f=json&maxLocations=1`)
            .then((res) => {
                if(res.status === 200){     
                    axios.put('http://192.168.50.31:8000/api/v1/guest/', {
                        account_id: this.accountId,
                        first_name: this.firstName,
                        last_name: this.lastName,
                        full_name: `${this.firstName} ${this.lastName}`,
                        phone_number: this.phoneNumber,
                        email_address: this.email,
                        full_address: this.address.text,
                        latitude: res.data.candidates[0].location.y,
                        longitude: res.data.candidates[0].location.x,
                        drive_distance: 0,
                        rsvp_status: 'No Response',
                        number_of_guests: 0,
                        comments: 'None',
                        id: this.$route.params.id,
                    }, {
                        headers: {
                            'Authorization': `Token ${localStorage.getItem('token')}` 
                        }
                    })
                    .then((res) => {
                        if (res.status === 201){
                            this.message = `${this.firstName} has been added to you account!`
                            window.location.href = '/guests/'
                        }else{
                            this.message = `Sorry, we are having issues adding ${this.firstName} to your account.`                   
                        }
                    })
                    .catch((error) => {
                        if (error.response) {
                            let message = ''
                            for (let errorMessage in error.response.data){
                                message+= error.response.data[errorMessage]
                            }               
                            this.message = `${message}`
                        } else if (error.request) {
                            this.message = `Sorry, the following error occured (${error.request}).`
                        } else {                
                            this.message = `Sorry, the following error occured (${error.message}).`
                        }
                    })
                }
            })
        },
        search: function(newQuery) {
            if(newQuery.target.value.length > 3){
                this.isLoading = true
                axios.get(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=json&text=${newQuery.target.value}&maxSuggestions=6`)
                .then((res) => {
                    if (res.status === 200){
                        this.addresses = res.data.suggestions
                    }else{
                        this.message = 'Sorry, we are having issues searching for addresses.'                  
                    }
                    this.isLoading = false
                })
                .catch(() => {
                    this.message = 'Sorry, we are having issues searching for addresses.'
                    this.isLoading = false
                })
            }
        }
    },
    mounted(){
        this.getAccountInformation()
        this.getGuestInformation()
    }
}
</script>

<style>
.guest-form{
    background-color: #f5f0f0;
}
</style>