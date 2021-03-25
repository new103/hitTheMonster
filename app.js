
const randomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      battleLog: [],
    }
  },
  computed: {
    monsterStyleBars() {
      if (this.monsterHealth < 0) {
        return { width: '0%' }
      }
      return { width: this.monsterHealth + '%' }
    },
    playerStyleBars() {
      if (this.playerHealth < 0) {
        return { width: '0%' }
      }
      return { width: this.playerHealth + '%' }
    },
    iUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    }
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.winner = 'draw'
      } else if (value <= 0) {
        // Player lost
        this.winner = 'monster'
      }
    },
    monsterHealth(value) {
      if (value <= 0 & this.playerHealth <= 0) {
        // A draw
        this.winner = 'draw'
      } else if (value <= 0) {
        // Player lost
        this.winner = 'player'
      }
    }
  },

  methods: {
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.battleLog = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = randomNumber(12, 5);
      console.log(attackValue)
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = randomNumber(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage('monster', 'attack', attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = randomNumber(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = randomNumber(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage('player', 'heal', healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = 'monster';
    },
    addLogMessage(who, what, value) {
      this.battleLog.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      })
    }
  }
})
app.mount('#game')