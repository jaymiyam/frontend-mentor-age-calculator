// const dayInput = document.querySelector('#day-input');
// const monthInput = document.querySelector('#month-input');
// const yearInput = document.querySelector('#year-input');
// const dayOutput = document.querySelector('#day-output');
// const monthOutput = document.querySelector('#month-output');
// const yearOutput = document.querySelector('#year-output');
// const form = document.querySelector('form');

// form.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const currentDate = new Date();
//   const difference = currentDate - getBirthday();

//   calculateAgeOutput(difference);
// });

// function getBirthday() {
//   const day = dayInput.value;
//   const month = monthInput.value;
//   const year = yearInput.value;

//   const birthday = new Date(`${year}-${month}-${day}`);
//   return birthday;
// }

// function calculateAgeOutput(difference) {
//   let differenceInDay = Math.floor(difference / (1000 * 60 * 60 * 24));
//   const differenceInYear = Math.floor(differenceInDay / 365);
//   differenceInDay = differenceInDay % 365;
//   const differenceInMonth = Math.floor(differenceInDay / 30.5);
//   differenceInDay = differenceInDay % 30.5;

//   //   yearOutput.textContent = differenceInYear;
//   //   monthOutput.textContent = differenceInMonth;
//   //   dayOutput.textContent = differenceInDay;

//   numberAnimation(differenceInYear, yearOutput);
//   numberAnimation(differenceInMonth, monthOutput);
//   numberAnimation(differenceInDay, dayOutput);
// }

// function numberAnimation(target, output) {
//   for (let count = 0; count <= target; count++) {
//     setTimeout(() => {
//       console.log(count);
//       output.textContent = count;
//       if (count === target) {
//         output.textContent = target;
//       }
//     }, count * 10);
//   }
// }

const app = Vue.createApp({
  data() {
    return {
      yearOutput: '--',
      monthOutput: '--',
      dayOutput: '--',
      formIsValid: true,
      dayErrorMsg: null,
      monthErrorMsg: null,
      yearErrorMsg: null,
    };
  },
  computed: {},
  methods: {
    formValidation() {
      this.formIsValid = true;
      this.dayErrorMsg = this.monthErrorMsg = this.yearErrorMsg = null;

      const year = this.$refs.yearInput.value;
      const month = this.$refs.monthInput.value;
      const day = this.$refs.dayInput.value;

      if (!year) {
        this.formIsValid = false;
        this.yearErrorMsg = 'Cannot be empty!';
      }
      if (!month) {
        this.formIsValid = false;
        this.monthErrorMsg = 'Cannot be empty!';
      }

      if (!day) {
        this.formIsValid = false;
        this.dayErrorMsg = 'Cannot be empty!';
      }

      if (year > new Date().getFullYear()) {
        this.formIsValid = false;
        this.yearErrorMsg = 'Cannot be in the future!';
      }

      if (month < 1 || month > 12) {
        this.formIsValid = false;
        this.monthErrorMsg = 'Must be in range!';
      }

      if (day < 1 || day > 31) {
        this.formIsValid = false;
        this.dayErrorMsg = 'Must be in range!';
      }
    },
    submitBirthday() {
      this.formValidation();

      if (!this.formIsValid) {
        return;
      }
      const year = this.$refs.yearInput.value;
      const month = this.$refs.monthInput.value;
      const day = this.$refs.dayInput.value;

      const currentDate = new Date();
      const difference = currentDate - this.getBirthday(year, month, day);

      this.calculateAgeOutput(difference);
    },
    getBirthday(year, month, day) {
      return new Date(`${year}-${month}-${day}`);
    },
    calculateAgeOutput(difference) {
      let differenceInDay = Math.floor(difference / (1000 * 60 * 60 * 24));
      const differenceInYear = Math.floor(differenceInDay / 365);
      differenceInDay = differenceInDay % 365;
      const differenceInMonth = Math.floor(differenceInDay / 30.5);
      differenceInDay = differenceInDay % 30.5;

      for (let count = 0; count <= differenceInYear; count++) {
        setTimeout(() => {
          this.yearOutput = count;
          if (count === differenceInYear) {
            this.yearOutput = differenceInYear;
          }
        }, count * 10);
      }

      for (let count = 0; count <= differenceInMonth; count++) {
        setTimeout(() => {
          this.monthOutput = count;
          if (count === differenceInMonth) {
            this.monthOutput = differenceInMonth;
          }
        }, count * 10);
      }

      for (let count = 0; count <= differenceInDay; count++) {
        setTimeout(() => {
          this.dayOutput = count;
          if (count === differenceInDay) {
            this.dayOutput = differenceInDay;
          }
        }, count * 10);
      }
    },
  },
});

app.mount('#app');
