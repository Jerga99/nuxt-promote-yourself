
export default {
  data() {
    return {
      activeStep: 1,
      steps: []
    }
  },
  computed: {
    stepsLength() {
      return this.steps.length
    },
    isLastStep() {
      return this.activeStep === this.stepsLength
    },
    isFirstStep() {
      return this.activeStep === 1
    },
    progress() {
      return `${100 / this.stepsLength * this.activeStep}%`
    },
    activeComponent() {
      return this.steps[this.activeStep - 1]
    }
  },
  methods: {
    nextStep() {
      this.activeStep++
    },
    previousStep() {
      this.activeStep--
    },
    navigateTo(step) {
      this.activeStep = step
    },
    activeComponentClass(step) {
      return this.activeStep === step ? 'is-active' : ''
    }
  }
}
