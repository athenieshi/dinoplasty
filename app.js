// const app = {
//  max: 0,
//  init(selectors) {
//     this.dino =[]
//     this.max = 0
//     this.list = document
//       .querySelector(selectors.listSelector)
//     this.template = document
//       .querySelector(selectors.templateSelector)
//     document
//       .querySelector(selectors.formSelector)
//       .addEventListener('submit', this.addDino.bind(this))

//  },   

//  addDino(ev) {
//     ev.preventDefault()

//     const dino = {
//       id: this.max + 1,
//       name: ev.target.dinoName.value, 
//     }

//     const listItem = this.renderListItem(dino)
//     this.list.insertBefore(listItem, this.list.firstChild)
   
//     this.dino.push(dino)

//     ++ this.max
//     ev.target.reset()
//  },

//  renderListItem(dino) {
//     const item = this.template.cloneNode()

//     const item = document.createElement('li')
//     item.classList.add('dino')

//     item.dataset = dino.id

//     item.textContent = dino.name

//     const remove = document.createElement('button')
//     remove.textContent = 'remove'
//     remove.id="removeDino"
//     item.appendChild(remove)
//     remove.addEventListener('click', this.removeDino)

//     const promote = document.createElement('button')
//     promote.id = "promoteDino"    
//     promote.textContent = 'promote'
//     item.appendChild(promote)
//     promote.addEventListener('click', this.promoteDino)

//     return item
//  },

//   removeDino(ev) {
//     const btn = ev.target
//     btn.closest('.dino').remove()
//   },

//   promoteDino(ev) {
//     const btn = ev.target
//     const promoteListItem = btn.closest('.dino')
    
//   },
// }

// app.init({
//     formSelector: '#dino-form',
//     listSelector: '#dino-list',
//     templateSelector: '.dino.template',
// })

const app = {
  init(selectors) {
    this.dinos = []
    this.max = 0
    this.list = document
      .querySelector(selectors.listSelector)
    this.template = document
      .querySelector(selectors.templateSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addDinoFromForm.bind(this))

    this.load()
  },

  load() {
    // load the JSON from localStorage
    const dinoJSON = localStorage.getItem('dinos')

    // convert the JSON back into an array
    const dinoArray = JSON.parse(dinoJSON)

    // set this.dinos with the dinos from that array
    if (dinoArray) {
      dinoArray
        .reverse()
        .map(this.addDino.bind(this))
    }
  },

  addDino(dino) {
    const listItem = this.renderListItem(dino)
    this.list.insertBefore(listItem, this.list.firstChild)

    this.dinos.unshift(dino)
    this.save()

    ++ this.max
  },

  addDinoFromForm(ev) {
    ev.preventDefault()

    const dino = {
      id: this.max + 1,
      name: ev.target.dinoName.value,
    }

    this.addDino(dino)
    
    ev.target.reset()
  },


  save() {
    const listItems = this.list.children
    for (let i=0; i < listItems.length; i++) {
      const listItem = listItems[i]
      this.dinos[i].id = i
      listItem.dataset.id = this.dinos[i].id
      console.log(i)
    }
    localStorage
      .setItem('dinos', JSON.stringify(this.dinos))
    
  },

  renderListItem(dino) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = dino.id

    item
      .querySelector('.dino-name')
      .textContent = dino.name

    item
      .querySelector('button.remove')
      .addEventListener('click', this.removeDino.bind(this))

    return item
  },

  removeDino(ev) {
    const listItem = ev.target.closest('.dino')
    listItem.remove()

    for (let i = 0; i < this.dinos.length; i++) {
      const currentId = this.dinos[i].id.toString()
      if (listItem.dataset.id === currentId) {
        this.dinos.splice(i, 1)
        break;
      }
    }

    this.save()
  },
}

app.init({
  formSelector: '#dino-form',
  listSelector: '#dino-list',
  templateSelector: '.dino.template',
})