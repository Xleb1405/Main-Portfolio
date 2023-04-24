const requests = loadRequests();

class Request {
    constructor(id, name, phone, email, product){
        this.id = id,
        this.name = name,
        this.phone = phone,
        this.email = email,
        this.product = product,
        this.date = new Date().toISOString(),
        this.status = 'new'
    }
}

const products = {
    'course-html': 'Курс по верстке',
    'course-js': 'Курс по JavaScript',
    'course-vue': 'Курс по Vue JS',
    'course-php': 'Курс по PHP',
    'course-wordpress': 'Курс по Wordpress'
}

const statuses = {
    'new': 'Новая',
    'inwork': 'В работе',
    'complete': 'Завершена',
}

const filter = loadFilter()

function loadFilter(){
    let filter = {
        products: 'all',
        status: 'all'
    }

    if(localStorage.getItem('filter')){
        filter = JSON.parse(localStorage.getItem('filter'))
    }

    return filter
}

function changeFilter(prop, value){
    filter[prop] = value
    localStorage.setItem('filter', JSON.stringify(filter))
    return filter
}

function filterRequests(filter){
    let filteredRequests
    if(filter.products !== 'all'){
        filteredRequests = requests.filter((request)=> request.product === filter.products )
    } else {
        filteredRequests = [...requests]
    }

    if(filter.status !== 'all'){
        filteredRequests = filteredRequests.filter((request)=> request.status === filter.status)
    }

    return prepareRequests(filteredRequests)
}

function countNewRequests(){
    const newRequests = requests.filter((el)=> el.status === 'new')
    return  newRequests.length
}

function addRequest(formData){
    const id = requests.length > 0 ? requests[requests.length - 1]['id'] + 1 : 1;
    const request = new Request(id, formData.get('name'), formData.get('phone'), formData.get('email'), formData.get('product'))
    requests.push(request)
    saveRequests();
}

function saveRequests(){
    localStorage.setItem('requests', JSON.stringify(requests))
}

function loadRequests(){
    return localStorage.getItem('requests') ? JSON.parse(localStorage.getItem('requests')) : [];
}

function getRequests(){
    return filterRequests(filter)
}

function prepareRequests(requests){
    return requests.map((item)=> {
        return {
            ...item,
            dateToDisplay: new Date (item.date).toLocaleDateString(),
            productName: products[item.product],
            statusName: statuses[item.status]
        }
    })
}

function getRequestById(id){
    const request = requests.find((item) => item.id == id)

    request.dateDate = new Date(request.date).toLocaleDateString()
    request.dateTime = new Date(request.date).toLocaleTimeString()

    return request
}

function updateRequest(formData){
    const request = getRequestById(formData.get('id'))
    request.name = formData.get('name')
    request.email = formData.get('email')
    request.phone = formData.get('phone')
    request.product = formData.get('product')
    request.status = formData.get('status')
    saveRequests()
}

function getFilter(){
    return {...filter}
}

export { addRequest, getRequests, getRequestById, updateRequest, changeFilter, filterRequests, countNewRequests, getFilter }