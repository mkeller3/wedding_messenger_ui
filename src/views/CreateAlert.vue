<template>
  <v-container fluid>
    <v-row>
      <v-col cols="10" class="mx-auto">
          <h2 class="text-center">New Alert</h2>
          <v-alert type="error" v-if="message">
                {{message}}
          </v-alert>
          <form @submit.prevent="processForm">
            <v-select
                v-model="alertType"
                :items="alertTypes"
                label="Alert Type"
                item-text="text"
                item-value="value"
                required
            ></v-select> 
            <div v-if="alertType === 'scheduled'">
                <v-datetime-picker label="Time" v-model="alertTime"> 
                  <template slot="dateIcon">
                    <v-icon>mdi-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>mdi-clock</v-icon>
                  </template> 
                </v-datetime-picker>
            </div>
            <v-select
                v-model="alertGroup"
                :items="alertGroups"
                item-text="text"
                item-value="value"
                label="Group Message"
                required
            ></v-select>
            <v-list v-if="alertGroup === true">
                 <v-list-item v-for="group in groups" v-bind:key="group.id">
                    <v-list-item-content class="pl-3">                
                        <v-switch v-if="selectedGroups.includes(group.id)"
                            v-on:click="toggleGroup(group.id)"
                            :label="`${group.group_name}`"
                            value="true"
                            color="error"
                        ></v-switch>
                        <v-switch v-else
                            v-on:click="toggleGroup(group.id)"
                            :label="`${group.group_name}`"
                            color="error"
                        ></v-switch>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-textarea
            outlined
            v-model="alertText"
            label="Alert Message"
            ></v-textarea>
            <v-btn
                color="success"
                @click="processForm"
            >
            Create Alert
            </v-btn>
          </form>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CreateAlert',
    data() {
        return {
            alertType: 'now',            
            alertTypes: [
                { text: 'Now', value: 'now'},
                { text: 'Scheduled', value: 'scheduled'}],
            alertTime: `${new Date().toISOString().slice(0,10)} ${new Date().toTimeString().slice(0,5)}`,
            alertGroup: false,
            alertGroups: [
                { text: 'Yes', value: true},
                { text: 'No', value: false}],
            alertText: '',            
            accountId: '',
            message: '',
            groups: [],
            selectedGroups: [],
            dateModal: false,
            timeModal: false
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
                this.message = this.$globalFunctions.errorResponse(error)
            })
        },
        processForm: function() {            
            axios.post('http://192.168.1.196:8000/api/v1/alert/', {
                account_id: this.accountId,
                message: this.alertText,
                group_message: this.alertGroup,
                group_ids: this.selectedGroups,
                alert_type: this.alertType,
                run_time:  this.alertTime,

            }, {
                headers: {
                    'Authorization': `Token f43c1ce6396e91936da9a7123909d0baf53651f1` 
                }
            })
            .then((res) => {
                if (res.status === 201){
                    this.message = `This alert has been added to you account!`
                    window.location.href = '/alerts/'
                }else{
                    this.message = `Sorry, we are having issues adding this alert.`                   
                }
            })
            .catch((error) => {
                this.message = this.$globalFunctions.errorResponse(error)
            })  
        },
        getGroupInformation : function() {
            axios.get('http://192.168.1.196:8000/api/v1/groups/', {
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
            .catch((error) => {
                this.message = this.$globalFunctions.errorResponse(error)
            })
        },
        toggleGroup: function(group){
            if(this.selectedGroups.includes(group)){
                this.selectedGroups.splice(this.selectedGroups.indexOf(group),1)
            }else{
                this.selectedGroups.push(group)
            }
        }
    },
    mounted(){
        this.getAccountInformation()
        this.getGroupInformation()
    },
}
</script>

<style>
.alert-form{
    background-color: #f5f0f0;
}
</style>