let seconds = 0; 
let timerInterval; // Переменная для хранения идентификатора таймера
const timerDisplay = document.getElementById('timer');

function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const updSeconds = seconds % 60;

    // Форматирую время
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = updSeconds < 10 ? "0" + updSeconds : updSeconds;

    timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function startTimer() {
    timerInterval = setInterval(function () { // Сохраняем идентификатор интервала
        seconds++;
        updateTimerDisplay();
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval); // Останавливаем таймер
    seconds = 0; // Сбрасываем счетчик
    updateTimerDisplay(); // Обновляем отображение таймера
}

// Запускаем таймер
startTimer();