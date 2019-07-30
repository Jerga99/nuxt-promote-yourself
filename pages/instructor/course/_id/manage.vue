<template>
  <div class="manage-page">
    <Header
      title="Some very nice course name"
      exitLink="/instructor/courses">
      <template #actionMenu>
        <div class="full-page-takeover-header-button">
          <button
            @click="() => {}"
            class="button is-primary is-inverted is-medium is-outlined">
            Save
          </button>
        </div>
      </template>
    </Header>
    <div class="course-manage">
      <div class="container">
        <div class="columns">
          <div class="column is-3 p-lg">
            <!-- <aside class="menu is-hidden-mobile"> -->
            <aside class="menu">
              <p class="menu-label">
                Course Editing
              </p>
              <ul class="menu-list">
                <li>
                  <!-- display TargetStudents -->
                  <a @click.prevent="() => {}"
                     :class="'active'">Target Your Students
                  </a>
                </li>
                <li>
                  <!-- display LandingPage -->
                  <a @click.prevent="() => {}">
                    Course Landing Page
                  </a>
                </li>
              </ul>
              <p class="menu-label">
                Course Managment
              </p>
              <ul class="menu-list">
                <li>
                  <!-- display Price -->
                  <a @click.prevent="() => {}">
                    Price
                  </a>
                </li>
                <li>
                  <!-- display Status -->
                  <a @click.prevent="() => {}">
                    Status
                  </a>
                </li>
              </ul>
            </aside>
          </div>
          <div class="column">
            <target-students />
            <landing-page />
            <price />
            <status />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/shared/Header'
import LandingPage from '~/components/instructor/LandingPage'
import TargetStudents from '~/components/instructor/TargetStudents'
import Price from '~/components/instructor/Price'
import Status from '~/components/instructor/Status'
export default {
  layout: 'instructor',
  components: {
    Header,
    LandingPage,
    TargetStudents,
    Price,
    Status
  }
}
</script>

<style lang="scss">
  .manage-page {
    .label-info {
      font-size: 13px;
      color: gray;
      font-style: italic;
    }
    .course-manage {
      padding-top: 40px;
      .menu {
        padding-top: 30px;
        &-label {
          font-size: 20px;
          color: black;
        }
        &-list {
          >li {
            font-size: 18px;
            margin-top: 10px;
            > a {
              &.is-active {
                background-color: transparent;
                color: inherit;
              }
            }
          }
        }
      }
      .card {
        &-section {
          padding: 40px;
        }
        &-header {
          &-title {
            padding: 0;
            color: #8F99A3;
            font-weight: 400;
            font-size: 25px;
          }
        }
      }
    }
  }
</style>
