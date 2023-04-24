$(document).ready(function () {
  // Находим блок с слайдами
  const owl = $("#clients-slider");
  // Запускаем карусель
  owl.owlCarousel({
    items: 1,
    loop: true
  });
  // Находим кастомные кнопки Вперед/Назад
  const prev = $("#sliderPrev");
  const next = $("#sliderNext");
  // Клик на кнопку назад и прокрутка карусели
  prev.click(function () {
    owl.trigger("prev.owl.carousel");
  });
  // Клик на кнопку вперед и прокрутка карусели
  next.click(function () {
    owl.trigger("next.owl.carousel");
  });
});
