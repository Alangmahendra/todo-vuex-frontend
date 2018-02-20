<template>
  <div class="container">
    <b-form-group align="center">
      <b-form-input type="email" placeholder="email" v-model="email" required></b-form-input>
      <br>
      <b-form-input type="password" placeholder="password" v-model="password" required></b-form-input>
    </b-form-group>
    <b-form-group>
      <b-button variant="primary" v-if="show" @click="signup">Sign Up</b-button>
      <b-button variant="success" v-else @click="login">Sign In</b-button>
       <fb-signin-button
    :params="fbSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Facebook
  </fb-signin-button>
    </b-form-group>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name : 'Login',
  data(){
    return{
      show : true,
      email:'',
      password:'',
      fbSignInParams: {
        scope: 'email,user_likes',
        return_scopes: true
      }
    }
  },
  methods : {
     onSignInSuccess (response)  {
       let local = this
      // console.log(response.authResponse.accessToken)
      let token = response.authResponse.accessToken
      axios.post('http://neoal.xyz:3001/api/facebooklogin',{accessToken:token})
      .then(response=>{
        console.log(response.data.data)
        let token = response.data.data
        localStorage.setItem('token',token)
        console.log('this is local ', local)
        local.$router.push({name:'Home'})
      })
      .catch(err=>{
        console.log(err)
      })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },
    signup : function(){
    
      let user = this.email;
      let pass  = this.password;
     
      axios.post('http://neoal.xyz:3001/api/signup',{email:user,password:pass})
      .then(response=>{
        console.log(response.data.data)
         return this.show=!this.show
      })
    },

    login : function(){
 
      let user = this.email;
      let pass = this.password;
      console.log('sudah masuk')
      axios.post('http://neoal.xyz:3001/api/signin',{email:user,password:pass})
      .then(response=>{
        console.log(response.data.token)
        let token = response.data.token
        localStorage.setItem('token',token)
        localStorage.setItem('name',name)
        this.$router.push({name:'Home'})
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style>
*{
  margin : 0%
}
.input{
margin:0px 150px 10px 150px
}
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
  cursor: pointer;
}
</style>
