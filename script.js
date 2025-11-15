(() => {
  const table = {
    small:  [0,15,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80],
    medium: [0,15,24,28,32,36,42,47,51,56,60,65,69,74,78,83,87],
    large:  [0,15,24,28,32,36,45,50,55,61,66,72,77,82,88,93,120]
  };

  const form = document.getElementById('ageForm');
  const resultEl = document.getElementById('result');

  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  function getSelectedSize() {
    return form.querySelector('input[name="size"]:checked').value;
  }

  function calcDogAge(birthDate) {
    const now = new Date();
    const ms = now - birthDate;
    const days = ms / (1000 * 60 * 60 * 24);
    return days / 365.25;
  }

  function dogToHuman(age, sizeKey) {
    const arr = table[sizeKey];

    if (age <= 0) return 0;

    if (age < 1) {
      return age * arr[1];
    }

    const lower = Math.floor(age);
    const upper = Math.ceil(age);
    const frac = age - lower;

    const maxIdx = arr.length - 1;

    if (upper <= maxIdx) {
      return arr[lower] + (arr[upper] - arr[lower]) * frac;
    }

    const delta = arr[maxIdx] - arr[maxIdx - 1];
    return arr[maxIdx] + delta * (age - maxIdx);
  }

  function formatResult(dogAge, humanAge) {
    return `
      狗狗現在為 <strong>${round2(dogAge)}</strong> 歲狗年齡，<br>
      換算成人類年齡大概是 <strong>${round2(humanAge)}</strong> 歲
    `;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const birthdayStr = document.getElementById('birthday').value;
    if (!birthdayStr) {
      resultEl.innerHTML = `<div class="msg msg--error">請先選擇狗狗生日！</div>`;
      return;
    }

    const birthday = new Date(birthdayStr);
    const size = getSelectedSize();

    const dogAge = calcDogAge(birthday);
    const humanAge = dogToHuman(dogAge, size);

    resultEl.innerHTML = `<div class="msg msg--ok">${formatResult(dogAge, humanAge)}</div>`;
  });
})();
