<template>
  <v-container fluid>
      <v-row>
        <v-col cols="12">
            <h2 class="text-center">Groups</h2>
            <v-alert type="error" v-if="message">
                {{message}}
          </v-alert>
            <div class="text-center">
                <v-btn
                color="success"
                href="/create_group/"
                >
                Create Group
                </v-btn>
            </div>
            <v-row>
                <v-col cols="12" v-for="group in groups" v-bind:key="group.id">
                    <GroupCard :group="group" :groups="groups"/>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import GroupCard from '@/components/GroupCard';

export default {
    name: 'Groups',
    components:{
        GroupCard
    },
    data() {
        return {
            groups: [],
            accountId: '',
            message: ''
        }
    },
    methods:{
        getAccountInformation: function() {
            axios.get('http://192.168.50.31:8000/api/v1/account/', {
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
            .catch(() => {
                this.message = 'Sorry, we are having issues getting your account information.'  
            })
        },
        getGroupInformation : function() {
            axios.get('http://192.168.50.31:8000/api/v1/groups/', {
                headers: {
                    'Authorization': `Token f43c1ce6396e91936da9a7123909d0baf53651f1` 
                }
            })
            .then((res) => {
                if (res.status === 200){
                    this.groups = res.data
                }else{
                    this.message = 'Sorry, we are having issues getting your account information.'                    
                }
            })
            .catch(() => {
                this.message = 'Sorry, we are having issues getting your account information.'  
            })
        }
        
      
    },
    mounted(){
        this.getAccountInformation()
        this.getGroupInformation()
    },

}
</script>

<style>
</style>