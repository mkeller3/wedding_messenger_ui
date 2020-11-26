<template>
<v-card>
    <v-card-text>
        <a class="mx-5" :href="'/update_guest/' + guest.id"><h3>{{guest.full_name}}</h3></a>
        <div class="guest-info" v-if="guest.full_address"><v-icon>mdi-home-map-marker</v-icon> <a :href="'http://maps.google.com/?q='+guest.full_address">{{guest.full_address}}</a></div>
        <div class="guest-info"><v-icon>mdi-phone</v-icon>  <a :href="'tel:'+guest.phone_number">{{guest.phone_number}}</a></div>
        <div class="guest-info" v-if="guest.email_address"><v-icon>mdi-email</v-icon>  <a :href="'mailto:'+guest.email_address">{{guest.email_address}}</a></div>
        <div class="guest-info" v-if="guest.drive_distance"><v-icon>mdi-car</v-icon> {{guest.drive_distance}} mins</div>
        <div class="guest-info" v-on:click="deleteGuest(guest)"><v-icon>mdi-trash-can</v-icon> Delete Guest</div>
    </v-card-text>
</v-card>
  
</template>

<script>
import axios from 'axios';

export default {
    name: 'GuestCard',
    props: {
        guest: {
            type: Object
        },
        guests: {
            type: Array
        }
    },
    methods: {
        deleteGuest: function(guest){
            axios.delete(`http://192.168.1.196:8000/api/v1/guest/?id=${guest.id}`, {
                headers: {
                    'Authorization': `Token f43c1ce6396e91936da9a7123909d0baf53651f1` 
                }
            })
            .then((res) => {
                if (res.status === 204){
                    let index = this.guests.map(function (guestInformation) { return guestInformation.id; }).indexOf(guest.id);
                    this.guests.splice(index,1)
                    this.message = `${guest.first_name} information has been deleted!`
                }else{
                    this.message = `Sorry, we are having issues deleting ${guest.first_name} from your account.`                   
                }
            })
            .catch(() => {
                this.message = `Sorry, we are having issues deleting ${guest.first_name} from your account.`
            })
        }
    }
}
</script>

<style scoped>
.guest-info{
    padding-bottom: .5rem;
}
</style>