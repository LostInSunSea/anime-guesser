<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="https://bulma.io/images/bulma-logo.png" alt="logo" width="112" height="28" />
      </router-link>
      <router-link class="navbar-item" to="/about"> About </router-link>
      <!-- eslint-disable-next-line max-len -->
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  </nav>
  <div class="pageContent">
    <router-view />
  </div>
</template>

<style>
html,
body {
  height: 100vh;
  background-image: url("./assets/leaves.webp");
}
nav {
  margin-bottom: 2rem;
}
.pageContent {
  margin: 0 auto;
}
</style>
