class ExampleItem {
    constructor (name, phone, email, product){
        this.name = name
        this.phone = phone
        this.email = email
        this.product = product
    }
}

const testData = [
    new ExampleItem("Николай Тихонов", "+7924998149", "nikolastih@mqil.ru", "course-html"),
    new ExampleItem("Евгений Ганьжин", "89781768151", "gaijin@gmail.com", "course-js"),
    new ExampleItem("Татьяна Новикова", "09877984712", "newtatyana@rambler.ru", "course-vue"),
    new ExampleItem("Вовк Валентина", "898786168154", "vovan@yandex.ru", "course-php"),
    new ExampleItem("Игорь Смелый", "9518716814", "iiiiiiigor@mail.com", "course-wordpress")
]

function getRandomIndex(max) {
    return Math.floor(Math.random() * max)
}

export default function getRandomData () {
    const index = getRandomIndex(testData.length)
    return testData[index]
}