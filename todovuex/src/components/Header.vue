<template>
  <div class="rapih">
    <b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">Todos Vuex</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">


    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item @click="signout">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>

  </div>
</template>

<script>
import router from '@/router'
export default {
  methods : {
    signout(){
      localStorage.clear()
      router.push({name : 'Login'})
    }
  }
}
</script>

<style>
.rapih{
  margin-bottom:10px ;
}
</style>
