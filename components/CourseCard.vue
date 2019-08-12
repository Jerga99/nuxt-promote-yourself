<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by2">
        <img :src="course.image" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{course.title | shortenText(45)}}</p>
          <p class="subtitle is-6"><i>by {{course.author.name}}</i></p>
        </div>
      </div>
      <div class="content">
        {{course.subtitle | shortenText(45)}}
        <br>
      </div>
      <div class="price-box">
        <span class="price">{{course.price}}$</span>
        <span class="disc-price">{{course.discountedPrice}}$</span>
      </div>
    </div>
    <footer class="card-footer">
      <nuxt-link :to="`/courses/${course.slug}`" class="card-footer-item">Learn More</nuxt-link>
      <a target="_" :href="course.productLink" class="card-footer-item">Enroll</a>
    </footer>
  </div>
</template>
<!-- create script, specify props of course -->
<script>
export default {
  props: {
    course: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .card-image:hover {
    cursor: pointer;
    opacity: 0.9;
  }
  .price-box {
    text-align: right;
    .price {
      color: gray;
      font-size: 16px;
      text-decoration: line-through;
    }
    .disc-price {
      font-size: 21px;
      font-weight: bold;
    }
  }
</style>
