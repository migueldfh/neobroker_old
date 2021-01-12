<template>
  <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
       <form class="login100-form validate-form" @submit.prevent="login">
         <img src="../../assets/Neorama_Web_logo.png" alt="">
         <span class="login100-form-title p-b-43">
           Inicia Sesión
         </span>


         <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
           <input class="input100" type="text" name="email" v-model="email" >
           <span class="focus-input100"></span>
           <span class="label-input100">Email</span>
         </div>


         <div class="wrap-input100 validate-input" data-validate="Password is required">
           <input class="input100" type="password" name="password" v-model="password">
           <span class="focus-input100"></span>
           <span class="label-input100">Contraseña</span>
         </div>

         <div class="flex-sb-m w-full p-t-3 p-b-32">
           <div class="contact100-form-checkbox">
             <input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
             <label class="label-checkbox100" for="ckb1">
               Recordarme
             </label>
           </div>

           <!-- <div>
             <a href="#" class="txt1">
               Olvidaste tu contraseña?
             </a>
           </div> -->
         </div>


         <div class="container-login100-form-btn">
           <button class="login100-form-btn">
             Entrar
           </button>
         </div>
       </form>
       <div class="login100-more">
       </div>
      </div>
    </div>
 </div>
</template>

<script>
  export default {
    data(){
      return {
        email : "",
        password : ""
      }
    },
    methods: {
      login: function () {
        let email = this.email
        let password = this.password
        this.$store.dispatch('login', { email, password })
       .then(() => this.$router.push('/dashboard'))
       .catch(err => console.log(err))
      }
    }
  }
</script>
