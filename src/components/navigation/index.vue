<template>
  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation" v-if="isLoggedIn">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="https://bryanrojasq.wordpress.com">
              <img src="http://placehold.it/200x50&text=LOGO" alt="LOGO">
          </a>
      </div>
      <!-- Top Menu Items -->
      <ul class="nav navbar-right top-nav">
          <li><a href="#" data-placement="bottom" data-toggle="tooltip" data-original-title="Stats"><i class="fa fa-bar-chart-o"></i>
              </a>
          </li>
          <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Admin User <b class="fa fa-angle-down"></b></a>
              <ul class="dropdown-menu">
                  <li><a href="#"><i class="fa fa-fw fa-user"></i> Edit Profile</a></li>
                  <li><a href="#"><i class="fa fa-fw fa-cog"></i> Change Password</a></li>
                  <li class="divider"></li>
                  <li><a href="#"><i class="fa fa-fw fa-power-off"></i> Logout</a></li>
              </ul>
          </li>
      </ul>
      <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
      <div class="collapse navbar-collapse navbar-ex1-collapse">
          <ul class="nav navbar-nav side-nav">
              <li>
                <router-link to="/">
                  <i class="bi bi-columns-gap" /><em>Home</em>
                </router-link>
              </li>
              <li>
                <router-link to="/propiedades">
                  <i class="bi bi-house-door" /><em>Propiedades</em>
                </router-link>
              </li>
              <li>
                <router-link to="/sucursales">
                  <i class="bi bi-shop-window" /><em>Sucursales</em>
                </router-link>
              </li>
              <li>
                <router-link to="/clientes">
                  <i class="bi bi-people" /><em>Clientes</em>
                </router-link>
              </li>
              <li v-if="isLoggedIn">
                <a @click="logout">
                  <i class="bi bi-power" /><em>Cerrar sesión</em>
                </a>
              </li>
          </ul>
      </div>
      <!-- /.navbar-collapse -->
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      loading: false
    }
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/login')
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.top-nav {
    padding: 0 15px;
}

.top-nav>li {
    display: inline-block;
    float: left;
}

.top-nav>li>a {
    padding-top: 20px;
    padding-bottom: 20px;
    line-height: 20px;
    color: #fff;
}

.top-nav>li>a:hover,
.top-nav>li>a:focus,
.top-nav>.open>a,
.top-nav>.open>a:hover,
.top-nav>.open>a:focus {
    color: #fff;
    background-color: #1a242f;
}

.top-nav>.open>.dropdown-menu {
    float: left;
    position: absolute;
    margin-top: 0;
    /*border: 1px solid rgba(0,0,0,.15);*/
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background-color: #fff;
    -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
}

.top-nav>.open>.dropdown-menu>li>a {
    white-space: normal;
}
@media(min-width:768px) {
    .side-nav {
        position: fixed;
        top: 60px;
        left: 225px;
        width: 225px;
        margin-left: -225px;
        border: none;
        border-radius: 0;
        border-top: 1px rgba(0,0,0,.5) solid;
        overflow-y: auto;
        background-color: #222;
        /*background-color: #5A6B7D;*/
        bottom: 0;
        overflow-x: hidden;
        padding-bottom: 40px;
    }

    .side-nav>li>a {
        width: 225px;
        border-bottom: 1px rgba(0,0,0,.3) solid;
    }

    .side-nav li a:hover,
    .side-nav li a:focus {
        outline: none;
        background-color: #1a242f !important;
    }
}

.side-nav>li>ul {
    padding: 0;
    border-bottom: 1px rgba(0,0,0,.3) solid;
}

.side-nav>li>ul>li>a {
    display: block;
    padding: 10px 15px 10px 38px;
    text-decoration: none;
    /*color: #999;*/
    color: #fff;
}

.side-nav>li>ul>li>a:hover {
    color: #fff;
}

.navbar .nav > li > a > .label {
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  position: absolute;
  top: 14px;
  right: 6px;
  font-size: 10px;
  font-weight: normal;
  min-width: 15px;
  min-height: 15px;
  line-height: 1.0em;
  text-align: center;
  padding: 2px;
}

.navbar .nav > li > a:hover > .label {
  top: 10px;
}

.navbar-brand {
    padding: 5px 15px;
}
</style>
