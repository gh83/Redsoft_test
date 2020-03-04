import { menuList } from '../../data/menu'

const menuWrapper = document.getElementById('header__menu')

let innerHTML = '';
for (let menuElement in menuList) {
    innerHTML += `<a href='${menuList[menuElement]}'>${menuElement}</a>`
}
menuWrapper.innerHTML = innerHTML