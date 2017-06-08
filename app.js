const app = {
 max: 0,
 init(selectors) {
    this.dino =[]
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    document.querySelector(selectors.formSelector).addEventListener('submit', this.addDino.bind(this))
 },   

 addDino(ev) {
    ev.preventDefault()

    const dino = {
      id: this.max + 1,
      name: ev.target.dinoName.value, 
    }

    const listItem = this.renderListItem(dino)
    this.list.appendChild(listItem)
    this.dino.push(dino)
    console.log(this.dino)

    ++ this.max
 },

 renderListItem(dino) {
    const item = document.createElement('li')
    item.textContent = dino.name

    const remove = document.createElement('button')
    remove.textContent = 'remove'
    remove.id="removeDino"
    item.appendChild(remove)
    remove.addEventListener('click', this.removeDino)

    const promote = document.createElement('button')
    promote.id = "promoteDino"    
    promote.textContent = 'promote'
    item.appendChild(promote)
    promote.addEventListener('click', this.promoteDino)

    return item
 },

  removeDino(ev) {
    const btn = ev.target
    btn.closest('.dino').remove(this.dino)
  },

  promoteDino(ev) {
    const btn = ev.target
    btn.closest('.dino').promote(this.dino)
  },
}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
})