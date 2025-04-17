// Массив существующих ID карточек (замените на реальные ID)
const existingCards = ["1", "3", "4", "5", "11", "12", "13", "14", "15", "17", "19", "20", "22", "24", "29", "30", "35"];

// Функция для проверки существования карточки
function cardExists(id) {
    return existingCards.includes(id);
}

// Функция для получения случайной карточки
function getRandomCard() {
    const randomIndex = Math.floor(Math.random() * existingCards.length);
    return existingCards[randomIndex];
}

// Показать карточку
function showCard(cardId) {
    // Скрыть интерфейс ввода
    document.getElementById("input-interface").classList.add("hidden");

    // Показать карточку
    const cardImage = document.getElementById("card-image");
    cardImage.src = `cards/${cardId}.png`; // Предполагается, что карточки хранятся в папке cards/
    cardImage.alt = `Карточка ${cardId}`;

    cardImage.onerror = function () {
        document.getElementById("error-message").classList.remove("hidden");
    };

    document.getElementById("card-display").classList.remove("hidden");
    document.getElementById("error-message").classList.add("hidden");
	document.getElementById("input-interface").classList.add("hidden");

    // Добавляем эффект наклона карточки
    addTiltEffect();
}

// Добавляем эффект наклона карточки
function addTiltEffect() {
    const card = document.querySelector('.card');
    const innerCard = document.querySelector('.inner-card');

    card.addEventListener('mousemove', (e) => {
        const rect = innerCard.getBoundingClientRect();
        const halfWidth = rect.width / 2;
        const halfHeight = rect.height / 2;

        const x = e.clientX - rect.left - halfWidth;
        const y = e.clientY - rect.top - halfHeight;

        const calcAngleX = (x / halfWidth) * 20;
        const calcAngleY = -(y / halfHeight) * 20;

        innerCard.style.transform = `rotateY(${calcAngleX}deg) rotateX(${calcAngleY}deg) scale(1.04)`;

        const gX = (1 - (e.clientX - rect.left) / rect.width) * 100;
        const gY = (1 - (e.clientY - rect.top) / rect.height) * 100;
        innerCard.querySelector('.glare').style.background = `radial-gradient(circle at ${gX}% ${gY}%, rgba(255, 255, 255, 0.2), transparent)`;
    });

    card.addEventListener('mouseleave', () => {
        innerCard.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
        innerCard.querySelector('.glare').style.background = 'transparent';
    });
}

// Обработчик кнопки GO
document.getElementById("goButton").addEventListener("click", function () {
    const cardId = document.getElementById("card-id").value.trim();

    if (cardExists(cardId)) {
        showCard(cardId);
    } else {
        document.getElementById("error-message").classList.remove("hidden");
    }
});

// Обработчик кнопки ROLL
document.getElementById("rollButton").addEventListener("click", function () {
    const randomCardId = getRandomCard();
    showCard(randomCardId);
});

// Обработчик кнопки Назад
document.getElementById("backButton").addEventListener("click", function () {
    // Скрыть карточку
    document.getElementById("card-display").classList.add("hidden");

    // Показать интерфейс ввода
    document.getElementById("input-interface").classList.remove("hidden");

    // Очистить поле ввода
    document.getElementById("card-id").value = "";
});