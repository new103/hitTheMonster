const randomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100
    }
  },
  computed: {
    monsterStyleBars() {
      return { width: this.monsterHealth + '%' }
    },
    playerStyleBars() {
      return { width: this.playerHealth + '%' }
    }
  },
  methods: {
    attackMonster() {
      const attackValue = randomNumber(12, 5);
      console.log(attackValue)
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = randomNumber(8, 15);
      this.playerHealth -= attackValue;
    }
  }
})
app.mount('#game')