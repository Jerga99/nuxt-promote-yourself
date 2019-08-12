<template>
  <section
    class="hero is-black">
    <div class="hero-body">
      <div class="hero-img">
      </div>
      <div class="container">
        <div class="columns">
          <div class="column is-9">
            <h1 class="title">
              {{title}}
            </h1>
            <h2 class="subtitle">
              {{subtitle}}
            </h2>
            <div class="sub-subtitle">
              <user-tile
                :name="author.name"
                :avatar="author.avatar" />
            </div>
          </div>
          <div class="column is-3">
            <div class="column-right">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import UserTile from '~/components/shared/UserTile'
export default {
  components: {
    UserTile
  },
  props: {
    title: {
      type: String,
      default: 'Some Default Catchy Title'
    },
    subtitle: {
      type: String,
      default: 'Some Default Catchy Subtitle'
    },
    author: {
      type: Object,
      default: null
    }
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
    filter: sepia(.1) grayscale(.1) saturate(.8);
  }
  .column-right {
    position: absolute;
  }
   @media screen and (max-width: 770px) {
    .column-right {
      position: inherit;
    }
  }
  .user-avatar {
    display: inline-block;
  }
  .is-black {
    background-color: black;
    background: linear-gradient(#29303B,#29303B,#29303B);
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
