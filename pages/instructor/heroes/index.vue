
<template>
  <div class="heroes-page">
    <div class="container">
      <h1 class="title">Course Heroes</h1>
      <portal-target
        v-for="hero in heroes"
        :key="hero._id"
        :name="`modal-view-${hero._id}`" />
      <table class="heroes-table table is-responsive">
        <thead>
          <tr class="main-table-row">
            <th>Image</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="hero in heroes"
            :key="hero._id"
            @click="openModal(hero._id)"
            :class="{'isActive': activeHero._id === hero._id}"
            class="table-row"
          >
            <td>{{hero.image || 'Not Set'}}</td>
            <td>{{hero.title || 'Not Set'}}</td>
            <td>{{hero.subtitle || 'Not Set'}}</td>
            <td>{{activeHero._id === hero._id ? 'Active' : 'Inactive'}}</td>
            <td class="modal-td" v-show="false">
            <portal :to="`modal-view-${hero._id}`">
              <Modal
                @submitted="activateHero($event, hero._id)"
                :ref="`modal-${hero._id}`"
                :showButton="false"
                actionTitle="Make Active"
                openTitle="Favorite"
                title="Make Course Hero">
                <div>
                  <div class="subtitle">
                    Title: {{hero.title || 'Not Set'}}
                  </div>
                  <div class="subtitle">
                    Subtitle: {{hero.subtitle || 'Not Set'}}
                  </div>
                  <figure class="image is-3by1">
                    <img :src="hero.image">
                  </figure>
                </div>
              </Modal>
            </portal>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Modal from '~/components/shared/Modal'
export default {
  middleware: 'admin',
  components: {
    Modal
  },
  computed: {
    heroes() {
      return this.$store.state.instructor.heroes
    },
    activeHero() {
      return this.$store.state.hero.item
    }
  },
  async fetch({store}) {
    await store.dispatch('instructor/fetchHeroes')
  },
  methods: {
    openModal(modalId) {
      const modal = this.$refs[`modal-${modalId}`][0]
      modal.openModal()
    },
    activateHero({ closeModal },heroId) {
      this.$store.dispatch('instructor/activateHero', heroId)
        .then(_ => {
          this.$toasted.success('Hero was succesfuly activated!', {duration: 2000})
          closeModal()
        })
    }
  }
}
</script>
<style scoped lang="scss">
  .heroes-page {
    max-width: 1000px;
    margin: 0 auto 5rem auto;
    margin-top: 40px;
  }
  .title {
    font-size: 45px;
    font-weight: bold;
  }
  .table-row {
    margin: 20px;
    &.isActive {
      background-color: #dfffe1
    }
    &:hover {
      cursor: pointer;
      background-color: #e4e4e4;
    }
  }
</style>
