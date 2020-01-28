<template>
  <div class="loading-container" :class="{'animated-colored-logo': value, 'hidden': hidden}">
    <template v-if="value">
      <div class="logo-container">
        <div class="svg-container">
          <svg width="0" height="0">
            <defs>
              <clipPath id="oktium-svg-logo">
                <path d="M119.404,148.88c-31.306-1.249-58.917-12.217-82.873-32.325C23.016,105.21,12.272,91.572,3.925,76.028
                  c-0.575-1.07-0.101-1.767,0.341-2.59c7.972-14.86,18.285-27.857,31.022-38.915C52.065,19.958,71.25,10.041,92.836,4.766
                  c11.003-2.689,22.169-3.908,33.485-3.752c8.879,0.122,17.16,2.495,24.91,6.786c0.245,0.136,0.465,0.318,0.777,0.534
                  c-6.662,7.869-4.478,16.72-0.321,21.351c5.426,6.045,12.53,6.765,21.571,2.011c7.154,13.448,9.003,37.8-7.235,57.164
                  c-16.251,19.38-44.858,25.53-68.591,11.561c13.271,14.277,40.365,26.28,69.581,17.841c17.433-5.036,31.075-15.302,40.786-30.614
                  c9.697-15.289,12.757-32.022,10.055-50.286c0.663,0.593,1.035,0.907,1.387,1.243c10.821,10.322,19.749,22.078,26.764,35.289
                  c0.417,0.786,0.465,1.384,0.024,2.207c-10.27,19.192-24.163,35.215-41.964,47.762C178.686,141.749,150.422,150.118,119.404,148.88" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </template>
    <template v-else>
      <svg width="100%" height="100%" id="main-mask-container">
        <defs>
          <mask id="oktium-mask-logo" x="0" y="0" width="100%" height="100%">
            <rect width="100%" height="100%" x="0" y="0" fill="#fff" />
            <svg overflow="visible" id="mask-logo-container">
              <path id="mask-logo" d="M119.404,148.88c-31.306-1.249-58.917-12.217-82.873-32.325C23.016,105.21,12.272,91.572,3.925,76.028
                c-0.575-1.07-0.101-1.767,0.341-2.59c7.972-14.86,18.285-27.857,31.022-38.915C52.065,19.958,71.25,10.041,92.836,4.766
                c11.003-2.689,22.169-3.908,33.485-3.752c8.879,0.122,17.16,2.495,24.91,6.786c0.245,0.136,0.465,0.318,0.777,0.534
                c-6.662,7.869-4.478,16.72-0.321,21.351c5.426,6.045,12.53,6.765,21.571,2.011c7.154,13.448,9.003,37.8-7.235,57.164
                c-16.251,19.38-44.858,25.53-68.591,11.561c13.271,14.277,40.365,26.28,69.581,17.841c17.433-5.036,31.075-15.302,40.786-30.614
                c9.697-15.289,12.757-32.022,10.055-50.286c0.663,0.593,1.035,0.907,1.387,1.243c10.821,10.322,19.749,22.078,26.764,35.289
                c0.417,0.786,0.465,1.384,0.024,2.207c-10.27,19.192-24.163,35.215-41.964,47.762C178.686,141.749,150.422,150.118,119.404,148.88" />
            </svg>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="#fff" mask="url(#oktium-mask-logo)" />
      </svg>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AppLoading',
  props: {
    value: {
      type: Boolean
    }
  },
  data: () => ({
    hidden: false,
    logoWidth: 250,
    logoHeight: 150,
    scaleInterval: null,
    defaultLogoWidth: 250,
    defaultLogoHeight: 150
  }),
  methods: {
    updateMaskSvgPositions () {
      const mainMaskContainer = document.getElementById('main-mask-container')
      if (mainMaskContainer && !this.loading) {
        const maskLogoContainer = document.getElementById('mask-logo-container')
        const mainMaskContainerBounds = mainMaskContainer.getBoundingClientRect()

        mainMaskContainer.setAttribute('width', window.innerWidth)
        mainMaskContainer.setAttribute('height', window.innerHeight)

        maskLogoContainer.setAttribute('x', (mainMaskContainerBounds.width - this.logoWidth) / 2)
        maskLogoContainer.setAttribute('y', (mainMaskContainerBounds.height - this.logoHeight) / 2)
      }
    },
    fadeOutLogo() {
      if (!this.scaleInterval) {
        const maskLogo = document.getElementById('mask-logo')
        const mainMaskContainer = document.getElementById('main-mask-container')
        const maskLogoContainer = document.getElementById('mask-logo-container')

        let currentScale = 1
        let targetScale = (window.innerHeight * 4) / 150

        this.scaleInterval = setInterval(() => {
          this.logoWidth = currentScale * this.defaultLogoWidth
          this.logoHeight = currentScale * this.defaultLogoHeight

          const mainMaskContainerBounds = mainMaskContainer.getBoundingClientRect()

          maskLogo.setAttribute('transform', `scale(${currentScale})`)
          maskLogoContainer.setAttribute('x', (mainMaskContainerBounds.width - this.logoWidth) / 2)
          maskLogoContainer.setAttribute('y', (mainMaskContainerBounds.height - this.logoHeight) / 2)

          currentScale += 0.07
          if (currentScale > targetScale) {
            clearInterval(this.scaleInterval)
            this.hidden = true
            this.scaleInterval = null
            this.logoWidth = this.defaultLogoWidth
            this.logoHeight = this.defaultLogoHeight
          }
        }, 2)
      }
    }
  },
  mounted() {
    this.updateMaskSvgPositions()
    window.addEventListener('resize', () => {
      this.updateMaskSvgPositions()
    })
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          this.hidden = false
        } else {
          this.$nextTick(() => {
            this.updateMaskSvgPositions()
            this.fadeOutLogo()
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-container {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  &.animated-colored-logo {
    display: flex;
    background: #fff;
    align-items: center;
    justify-content: center;
    .logo-container {
      width: 250px;
      height: 150px;
      transition: all .3s;
      .svg-container {
        width: 100%;
        height: 100%;
        background: linear-gradient(318deg, #3e23ff, #3cff3c, #ff2362, #2dafe6, #ff00ff, #ff8000);
        background-size: 1000% 1000%;
        animation: loadColors 8s ease infinite;
        transition: background-position 0.8s ease;
        clip-path: url(#oktium-svg-logo);
        @keyframes loadColors {
          0% {
            background-position: 45% 0%;
          }
          50% {
            background-position: 56% 100%;
          }
          100% {
            background-position: 45% 0%;
          }
        }
      }
    }
  }
  &.hidden {
    display: none;
  }
}
</style>
