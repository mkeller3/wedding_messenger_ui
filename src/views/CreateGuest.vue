<template>
<v-container fluid>
  <v-row>
      <v-col cols="12" md="6" class="mx-auto">
          <h2 class="text-center">New Guest</h2>
          <v-alert type="error" v-if="message">
                {{message}}
          </v-alert>
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
                :search-input.sync="search"
                color="white"
                hide-no-data
                hide-selected
                item-text="text"
                item-value="magicKey"
                label="Address (Optional)"
                return-object
            ></v-autocomplete>
            <v-btn
                color="success"
                @click="processForm"
            >
            Add Guest
            </v-btn>
          </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';


export default {
    name: 'CreateGuest',
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            addresses: [],            
            search: null,
            message: '',
            address: '',
            accountId: '',
            isLoading: false
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
        getAddress: async function(){
            axios.get(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?magicKey=${this.address.magicKey}&f=json&maxLocations=1`)
            .then((res) => {
                if(res.status === 200){   
                    return [res.data.candidates[0].location.y,res.data.candidates[0].location.x]
                }else{
                    return [undefined,undefined]
                }
            })
            .catch(() => {
                return [undefined,undefined]
            })
        },
        processForm: function() {
            let address = this.getAddress()    
            axios.post('http://192.168.1.196:8000/api/v1/guest/', {
                account_id: this.accountId,
                first_name: this.firstName,
                last_name: this.lastName,
                full_name: `${this.firstName} ${this.lastName}`,
                phone_number: this.phoneNumber,
                email_address: this.email,
                full_address: this.address.text,
                latitude: address[0],
                longitude: address[1],
                drive_distance: 0,
                rsvp_status: 'No Response',
                number_of_guests: 0,
                comments: 'None',
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
                this.message = this.$globalFunctions.errorResponse(error)
            })
             
        }
    },
    mounted(){
        this.getAccountInformation()
    },
    watch: {
        search(newQuery) {
            this.isLoading = true
            axios.get(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=json&text=${newQuery}&maxSuggestions=6`)
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
    },
}
</script>

<style>
.guest-form{
    background-color: #f5f0f0;
}
</style>