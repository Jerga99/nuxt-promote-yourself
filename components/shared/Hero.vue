<template>
  <section
    class="hero is-black is-medium">
    <div class="hero-body">
      <div
        class="hero-img"
        :style="{ background : `url(${image}) no-repeat center center`}">
      </div>
      <div class="container">
        <h1 class="title">
          {{title}}
        </h1>
        <h2 class="subtitle">
          {{subtitle}}
        </h2>
        <a target="_" :href="promoLink" class="button is-danger">Learn More!</a>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: 'Super Amazing Promo'
      },
      subtitle: {
        type: String,
        default: 'Super Amazing Promo Subtitle'
      },
      image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1631&q=80'
      },
      promoLink: {
        type: String,
        default: '#'
      },
    }
  }
</script>

<style scoped lang="scss">
  .hero-body {
    position: relative;
  }
  .hero-img {
    opacity: 0.8;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  .user-avatar {
    display: inline-block;
  }
  .is-black {
    background-color: black;
  }
  .title {
    font-weight: bold;
    font-size: 45px;
  }
  .subtitle {
    /*font-weight: bold;*/
    font-size: 25px;
  }
  .author-name {
    font-size: 20px;
    font-weight: bold;
  }
</style>
