<template>
    <v-card>
        <v-card-text>
            <a :href="'/update_group/' + group.id"><h4>{{group.group_name}} ({{group.guests.length}} Guests)</h4></a>
           <div class="guest-info" v-on:click="deleteGroup(group)"><v-icon>mdi-trash-can</v-icon>Delete Group</div>
        </v-card-text>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    name: 'GroupCard',
    props: {
        group: {
            type: Object
        },
        groups: {
            type: Array
        }
    },
    data() {
        return {
            message: '',
        }
    },
    methods: {
        deleteGroup: function(group){
            axios.delete(`http://192.168.1.196:8000/api/v1/group/?id=${group.id}`, {
                headers: {
                    'Authorization': `Token f43c1ce6396e91936da9a7123909d0baf53651f1` 
                }
            })
            .then((res) => {
                if (res.status === 204){
                    let index = this.groups.map(function (groupInformation) { return groupInformation.id; }).indexOf(group.id);
                    this.groups.splice(index,1)
                    this.message = `${group.group_name} information has been deleted!`
                }else{
                    this.message = `Sorry, we are having issues deleting ${group.group_name} from your account.`                   
                }
            })
            .catch(() => {
                this.message = `Sorry, we are having issues deleting ${group.group_name} from your account.`
            })
        }
    }
}
</script>

<style>

</style>