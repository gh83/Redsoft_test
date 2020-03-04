import { menuList } from '../../data/menu'

const menuWrapper = document.getElementById('footer__menu')

let innerHTML = '';
for (let menuElement in menuList) {
    innerHTML += `<a href='${menuList[menuElement]}'>${menuElement}</a>`
}
menuWrapper.innerHTML = innerHTML