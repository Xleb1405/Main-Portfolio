$(document).ready(function(){

    const navButton = document.querySelector('.nav-menu__icon-middle'); //иконка кнопки
    const mobMenu = document.querySelector('.mobile-menu'); // мобильное меню
    const overlay = document.querySelector('#overlay'); // оверлей
    const bodyEl = document.body; // вся страничка

    // прослушивание события по кнопке
    navButton.addEventListener('click', function(){
        // добавляем, убираем класс active
        this.classList.toggle('active'); 
        mobMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        bodyEl = classList.toggle('noscroll');
    });

    // прослушивание клика по мобильному меню
    mobMenu.addEventListener('click', function(){
        // убираем класс active
        this.classList.remove('active');
        navButton.classList.remove('active');
        overlay.classList.remove('active');
        bodyEl = classList.remove('noscroll');
    });
    // скрипт ресайз для моб меню, чтобы при изменении ширины экрана пропадало моб меню
    window.addEventListener('resize', function(){
        mobMenu.classList.remove('active');
        navButton.classList.remove('active');
        overlay.classList.remove('active');
        bodyEl = classList.remove('noscroll');
    });

    // plagin pageNav
    $('#page-menu').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: 250,
        scrollTreshold: 0.5,
        filter: '',
        easing: 'swing',
    });

    // смена карточек в портфолио по нажатию какой-либо кнопки
    let containerEl = document.querySelector('#mix-cards');

    let mixer = mixitup(containerEl, {
        classNames: {
            block: ""
        }
    });

    // back top arrow icon
    const backTopBtn = document.querySelector('#backtop');

    backTopBtn.style.opacity = 0;

    document.addEventListener('scroll', function() {
        if(window.pageYOffset > 1000) {
            backTopBtn.style.opacity = 1;
        } else {
            backTopBtn.style.opacity = 0;
        }
    });

    // Переменные фейкплейсхолдера в фокусе и нет
    const formItems = document.querySelectorAll('.form-fild');

    for(let item of formItems) {
        const thisParent = item.closest('.form-item');
        const thisPlaceholder = thisParent.querySelector('.fake-placeholder');
        // Если инпут в фокусе
        item.addEventListener('focus', function(){
            thisPlaceholder.classList.add('active');
        });

        // Если инпут теряет фокус
        item.addEventListener('blur', function(){

            if(item.value.length > 0) {
                thisPlaceholder.classList.add('active');
            }else {
                thisPlaceholder.classList.remove('active');
            }
        });
    };

    // Form validate
    $('.contacts-form').validate({
        rules: {
            email: {
                required: true,
                email: true
            },

            message: {
                required: true
            }
        },  

        messages: {
            email: {
                required: 'Введите email',
                email: 'отсутствует символ @'
            },
                
            message: {
                required: 'Поле не должно быть пустым'
             }
        },
        submitHandler: function (form) {
            ajaxFormSubmit();  
        }
    });

    // Функция AJAX запроса на сервер

    function ajaxFormSubmit() {
        let string = $(".contacts-form").serialize(); // Сохраняем данные введенные в форму в строку

        // Формируем ajax запрос
        $.ajax({
            type: "POST", //Тип запроса - POST
            url: "php/mail.php", // Куда отправляем запрос
            data: string, //Какие данные отправляем, в данном случае отправляем переменную string

            // Функция если все прошло успешно
            success: function (html) {
                $('.contacts-form').slideUp(800);
                $('#answer').html(html);
            }
        });
        // Чтобы по Submit больше ничего не выполнялось - делаем false чтобы прервать цепочку срабатывания остальных функций
        return false;
    }
})