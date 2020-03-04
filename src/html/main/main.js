import axios from 'axios'

import { Items } from '../../data/content'

//берем данные из локали или из данных
const Content = JSON.parse(localStorage.getItem('key')) || Items

document.addEventListener("DOMContentLoaded", () => {
    const listItems = document.querySelector('.main__content')
    let innerHtml = ''

    //собираем основной контент    
    function createMainContent() {
        for (let i = 0; i < Content.length; i++) {
            innerHtml += `
    <div class='item'>
            <div class='item__avaliable' style="display:${Content[i].isAvaliable ? 'none' : 'block'}"></div>
            <div class="item__img" style="background-image: url(${Content[i].img})"></div>
        <div class='item__title'>
            <div class='title__name'><h2>${Content[i].title}</h2></div>
            <div class='title__autor'><h2>${Content[i].author}</h2></div>
        </div>
        <div class='item__cost'>
            ${!Content[i].isAvaliable ? '<h3>Продана на аукционе</h3>' :
                    `
                <div class="cost__numeral">
                    <div class="cost__old-cost"><h6>${Content[i].oldCost}</h6></div>
                    <div class="cost__relevant"><h3>${Content[i].cost}</h3></div>
                </div>
                <div id='${Content[i].id}' class='button_wrapper'>
                    <div class='button_loader' style="display:${(Content[i].inCart || Content[i].isAvaliable) ? 'none' : 'block'}">
                        <span>Обработка..</span>
                        <i class="fa fa-spinner fa-spin"></i>
                    </div>
                    <button id=${Content[i].id} class="button ${Content[i].inCart ? 'button_in-cart' : null}">                        
                        ${!Content[i].inCart ? 'купить' : 'B корзине'}
                    </button>
                </div>
            `}
        </div>
    </div>
    `
        }
        listItems.innerHTML = innerHtml
    }
    createMainContent()

//добавляет слушателя на доступные элементы не в корзине 
    function checkCart() {
        for (let i = 0; i < Content.length; i++) {
            if (Content[i].isAvaliable && !Content[i].inCart) {
                const elem = Content[i].id
                document.getElementById(elem).addEventListener('click', () => addCart(elem, i))
            }
        }
    }
    checkCart()

//добавляет элемент в локал и меняет кнопку на "в корзине"
    function addCart(id, number) {
        const elem = document.getElementById(id).querySelector('.button')

        elem.classList.add('button_in-cart')
        elem.innerHTML = ('В корзине')
        Content[number].inCart = true
        localStorage.setItem('key', JSON.stringify(Content))
        getData(id)
    }

//запрос по адресу, во время запроса показывает лоадер
//в случае ошибки первого адреса делает запрос на второй адрес
    async function getData(id) {
        showLoader(id, true)

        await axios.get('https://jsonplaceholder.typicode.com/posts/1')
            .then(() => {
                showLoader(id, false)
            })
            .catch(async error => {
                console.log(error)
                await axios.get('https://reqres.in/api/products/3')
                    .then(() => {
                        showLoader(id, false)
                    })
                    .catch(error => {
                        console.log(error)
                        return
                    })
            })
    }

//показывает или прячет лоадер
    function showLoader(id, param) {
        const elem = document.getElementById(id).querySelector('.button_loader')
        elem.style.display = param === true ? 'block' : 'none'
    }

//слушатель на кнопку в хедере, удаляющий локал по ключу. для удобства
    document.getElementById('clear-localStorage').onclick = function () { localStorage.removeItem('key'); }
})