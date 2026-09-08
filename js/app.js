document.addEventListener('DOMContentLoaded', () => {
  const STEPS = [
    { digit: '0', text: '0: ¡El inicio de algo hermoso! ✨', img: 'Doc/snoopy1.png' },
    { digit: '2', text: '2: Te deseo un Feliz Cumpleaños! 🎂', img: 'Doc/snoopy2.png' },
    { digit: '1', text: '1: Eres una persona favorita increible 💖', img: 'Doc/snoopy3.png' },
    { digit: '0', text: '0: ¡Acceso concedido! 💌', img: 'Doc/snoopy4.png' }
  ];

  const ERROR_FEEDBACK = {
    text: 'Código incorrecto. Snoopy dice: ¡inténtalo otra vez! 🐾',
    img: 'Doc/snoopyenojado.png'
  };

  const pinBoxes = [...document.querySelectorAll('.pin-box')];
  const keypad = document.querySelector('.keypad');
  const lockCard = document.querySelector('.lock-card');
  const feedbackModal = document.getElementById('feedback-modal');
  const feedbackText = document.getElementById('feedback-text');
  const feedbackImg = document.getElementById('feedback-img');

  let currentInput = '';
  let isShowingModal = false;

  keypad?.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button || isShowingModal) return;

    if (button.dataset.val !== undefined) {
      handleDigit(button.dataset.val);
    } else if (button.id === 'btn-clear') {
      clearInput();
    } else if (button.id === 'btn-back') {
      removeLastDigit();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (isShowingModal) return;

    if (/^[0-9]$/.test(event.key)) {
      handleDigit(event.key);
    } else if (event.key === 'Backspace') {
      removeLastDigit();
    } else if (event.key === 'Escape' || event.key === 'Delete') {
      clearInput();
    }
  });

  function handleDigit(pressedDigit) {
    const currentIndex = currentInput.length;
    if (currentIndex >= STEPS.length) return;

    const expectedStep = STEPS[currentIndex];

    if (pressedDigit === expectedStep.digit) {
      currentInput += pressedDigit;
      updateDisplay();
      isShowingModal = true;
      showFeedback(expectedStep.text, expectedStep.img);

      const completed = currentInput.length === STEPS.length;
      window.setTimeout(() => {
        hideFeedback();
        isShowingModal = false;

        if (completed) {
          window.location.href = 'inicio.html';
        }
      }, completed ? 1500 : 1150);
    } else {
      isShowingModal = true;
      lockCard?.classList.add('shake');
      showFeedback(ERROR_FEEDBACK.text, ERROR_FEEDBACK.img);

      window.setTimeout(() => {
        lockCard?.classList.remove('shake');
        hideFeedback();
        clearInput();
        isShowingModal = false;
      }, 1200);
    }
  }

  function updateDisplay() {
    pinBoxes.forEach((box, index) => {
      box.textContent = currentInput[index] || '';
    });
  }

  function removeLastDigit() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  }

  function clearInput() {
    currentInput = '';
    updateDisplay();
  }

  function showFeedback(text, imgSrc) {
    if (!feedbackModal || !feedbackText || !feedbackImg) return;
    feedbackText.textContent = text;
    feedbackImg.src = imgSrc;
    feedbackModal.classList.remove('hidden');
  }

  function hideFeedback() {
    feedbackModal?.classList.add('hidden');
  }
});
