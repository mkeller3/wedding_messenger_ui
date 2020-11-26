<template>
<v-container>
    <v-row>
        <v-col cols="10" md="6" class="text-center mx-auto">
            <h2>Register</h2>
            <v-alert type="error" v-if="message">
                {{message}}
            </v-alert>
             <form>
                <v-text-field
                v-model="username"
                label="Username"
                required
                autofocus
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    label="Password"
                    @click:append="show = !show"
                    required
                ></v-text-field>
                <v-btn
                    class="mr-4"
                    color="success"
                    @click="processForm"
                    >
                    Register
                </v-btn>
             </form>
        </v-col>
    </v-row>
</v-container>
  
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    data() {
        return{
            username: '',
            password: '',
            message: '',
            show: false
        }
    },
    methods:{
        processForm: function() { 
            axios.post(`http://192.168.1.196:8000/accounts/register/`, {
                username: this.username,
                password: this.password,
                password_confirm: this.password
            })
            .then((res) => {
                if (res.status === 201){
                    axios.post(`http://192.168.1.196:8000/accounts/login/`, {
                        login: this.username,
                        password: this.password,
                    })
                    .then((res) => {
                        if (res.status === 200){
                            localStorage.setItem('token',res.data.token)
                            window.location.href = '/home/'
                        }else{
                            this.message = `Sorry, the following error occured (${res.data}).`
                        }
                    })  
                    .catch(() => {
                        this.message = `Sorry, you have entered the wrong username or password.`  
                    }) 
                }else{
                    this.message = `Sorry, the following error occured (${res.data}).`
                }
            })  
            .catch((error) => {
                this.message = this.$globalFunctions.errorResponse(error)
            })
        }
    }
}
</script>

<style>

</style>