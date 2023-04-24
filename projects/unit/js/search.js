// Работа с формой поиска
const searchForm = document.querySelector('.search');
const searchButton = document.querySelector('.search__button');

// Клик по кнопке поиск
searchButton.addEventListener('click', function (e) {
    if (!searchForm.classList.contains('search--visible')) {
		// отменяем по умолчанию действие поиска
        e.preventDefault();
		// меняем класс у формы поиска
        searchForm.classList.toggle('search--visible');
    }
})