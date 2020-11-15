<template>
  <v-container fluid class="px-0 mt-0 pt-0">
    <v-row  class="px-0 mt-0 pt-0">
      <v-col cols="12" class="p-0 pt-0">
        <v-carousel 
        :show-arrows="false"  
        hide-delimiters
        cycle
        height="400"
        class="image-caraousel">
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row class="px-5 information mx-auto">
      <v-col cols="12" class="text-center px-5" v-scroll-reveal.reset="{ delay: 250, duration: 3000 }">
        <h2 class="py-4 px-1">Wedding Messenger: Messaging for Your Wedding</h2>
        <v-btn 
          color="error" 
          block
          x-large
          class="py-5"
          href="/register/">
          Sign Up
        </v-btn>        
        <h5 class="py-5">Already a member? <a href="/login/">Log In</a></h5>
        <h2 class="py-5">What is Wedding Messenger?</h2>
        <p>Enter your number to try our service.</p>
        <v-text-field
          label="Phone Number"
          class="py-5 px-5"
          type="tel"
        ></v-text-field>
        <div v-scroll-reveal.reset="{ delay: 250, duration: 3000 }">
        <p class="px-5">Wedding Messenger is a state of the art platform that takes your wedding to the next level.</p>
        <p class="px-5">Wedding Messenger keeps all your guest in the loop about your wedding by sending text messages, phone calls, and even emails. Using Wedding Messenger is easy, you set up your alerts for your guests and we take care of the rest for you.</p>
        </div>
      </v-col>
     
      <v-col cols=12 class="px-5">
         <v-divider></v-divider>
        <v-row class="text-center">
          <v-col cols="12" md="6" v-scroll-reveal.reset="{ delay: 250, duration: 2000 }">
            <v-icon
              large
              color="error"
            >
              mdi-message-text-clock-outline
            </v-icon>
            <h2>Unlimited Scheduled Alerts</h2>
            <p>Wedding Messenger allows you to schedule as many or as little alerts to your wedding guest.</p>
          </v-col>
          <v-col cols="12" md="6" v-scroll-reveal.reset="{ delay: 250, duration: 2000 }">
            <v-icon
              large
              color="error"
            >
            mdi-message-alert-outline
            </v-icon>
            <h2>Unlimited Live Alerts</h2>
            <p>Wedding Messenger allows you to schedule as many or as little LIVE alerts to your wedding guest..</p>
          </v-col>
          <v-col cols="12" md="6" v-scroll-reveal.reset="{ delay: 250, duration: 2000 }">
            <v-icon
              large
              color="error"
            >
              mdi-account-group-outline
            </v-icon>
            <h2>Unlimited Groups</h2>
            <p>Wedding Messenger allows you to create as many or as little groups for you guest list.</p>
          </v-col>
          <v-col cols="12" md="6" v-scroll-reveal.reset="{ delay: 250, duration: 3000 }">
            <v-icon
              large
              color="error"
            >
              mdi-account-plus-outline
            </v-icon>
            <h2>Unlimited Guest Enhancement</h2>
            <p>Each time you import a guest into the Wedding Messenger platform we will provide you with free guest enhancement software. This calculates the driving time as well as weather information about your wedding for each guests. .</p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols=12>
         <v-divider></v-divider>
        <v-row class="text-center">
          <v-col cols="12">
            <h1 v-scroll-reveal.reset="{ delay: 250, duration: 3000 }">How does our platform work?</h1>
          </v-col>
          <v-col cols="12" md="6" v-scroll-reveal.reset="{ delay: 250, duration: 3000 }">
            <v-avatar
              color="error"
              size="62"
            >
            <span class="white--text headline">1</span>
            </v-avatar>
            <h2>Import Wedding List</h2>
            <p>The first step in using Wedding Messenger is to import your guest into our platform.</p>
          </v-col>
          <v-col cols="12" md="6" v-scroll-reveal.reset="{ delay: 250, duration: 3000 }">
            <v-avatar
              color="error"
              size="62"
            >
            <span class="white--text headline">2</span>
            </v-avatar>
            <h2>Create Groups</h2>
            <p>After you have imported your guest list, we can split them into groups for alerts like bridemaids, groomsmen, etc.</p>
          </v-col>
          <v-col cols="12" md="6" v-scroll-reveal.reset="{ delay: 250, duration: 3000 }">
             <v-avatar
              color="error"
              size="62"
            >
            <span class="white--text headline">3</span>
            </v-avatar>
            <h2>Schedule Alerts</h2>
            <p>Once you have imported your guests into Wedding Messenger you can now setup personalized alerts via text messages, phone calls, and emails.</p>
          </v-col>
          <v-col cols="12" md="6" v-scroll-reveal.reset="{ delay: 250, duration: 3000 }">
            <v-avatar
              color="error"
              size="62"
            >
            <span class="white--text headline">4</span>
            </v-avatar>
            <h2>Live Alerts </h2>
            <p>Wedding Messenger has you covered when in comes to alerts that you forgot to schedule. With realtime alerts you can keep everyone up to speed with was is happening on your special day. </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols=12>
         <v-divider></v-divider>
        <v-row class="text-center">
          <v-col cols="12">
            <h1 v-scroll-reveal.reset="{ delay: 250, duration: 3000 }">What are we about?</h1>
            <p v-scroll-reveal.reset="{ delay: 250, duration: 3000 }">Our platform was created for the same reason that you are here. We wanted a solution to reach out to all of our guests at one time. Standard group message you to 10 people. This means you would be creating a bunch of groups to message for your wedding. They also do not allow you to schedule messages in advance. </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'Home',
   data () {
      return {
        items: [
          {
            src: '/images/header_1.jpg',
          },
          {
            src: '/images/header_2.jpg',
          },
          {
            src: '/images/header_3.jpg',
          },
          {
            src: '/images/header_4.jpg',
          },
        ],
      }
    },
}
</script>

<style scoped>
.v-carousel{
  clip-path: circle(100% at 40% -15%);
}

.information{
  max-width: 60%;
}

</style>