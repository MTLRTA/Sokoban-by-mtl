let seconds = 0; 
const timerDisplay = document.getElementById('timer');

function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const updSeconds = seconds % 60;

    // Форматируем время
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = updSeconds < 10 ? "0" + updSeconds : updSeconds;

    timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function startTimer() {
    setInterval(function () {
        seconds++;
        updateTimerDisplay(); // Обновляем отображение таймера
    }, 1000);
}


startTimer();