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



//NEW CODE UPDATE



// const app = {
//   init(selectors) {
//     this.dinos = []
//     this.max = 0
//     this.list = document
//       .querySelector(selectors.listSelector)
//     this.template = document
//       .querySelector(selectors.templateSelector)
//     document
//       .querySelector(selectors.formSelector)
//       .addEventListener('submit', this.addDinoFromForm.bind(this))

//     this.load()
//   },

//   load() {
//     // load the JSON from localStorage
//     const dinoJSON = localStorage.getItem('dinos')

//     // convert the JSON back into an array
//     const dinoArray = JSON.parse(dinoJSON)

//     // set this.dinos with the dinos from that array
//     if (dinoArray) {
//       dinoArray
//         .reverse()
//         .map(this.addDino.bind(this))
//     }
//   },

//   addDino(dino) {
//     const listItem = this.renderListItem(dino)
//     this.list.insertBefore(listItem, this.list.firstChild)

//     this.dinos.unshift(dino)
//     this.save()

//     ++ this.max
//   },

//   addDinoFromForm(ev) {
//     ev.preventDefault()

//     const dino = {
//       id: this.max + 1,
//       name: ev.target.dinoName.value, color: ev.target.dinoColor.value,
//     }

//     this.addDino(dino)
    
//     ev.target.reset()
//   },


//   save() {
//     const listItems = this.list.children
//     for (let i=0; i < listItems.length; i++) {
//       const listItem = listItems[i]
//       this.dinos[i].id = i
//       listItem.dataset.id = this.dinos[i].id
//     }
//     localStorage
//       .setItem('dinos', JSON.stringify(this.dinos))
    
//   },

//   renderListItem(dino) {
//     const item = this.template.cloneNode(true)
//     item.classList.remove('template')
//     item.dataset.id = dino.id

//     item
//       .querySelector('.dino-name')
//       .textContent = dino.name

//       if (dino.fave) {
//         item.classList.add('fave')
//       }
//     item
//       .querySelector('.dino-color')
//       .textContent = dino.color
//     item
//       .querySelector('button.remove')
//       .addEventListener('click', this.removeDino.bind(this))
//     item
//       .querySelector('button.fave')
//       .addEventListener('click', this.faveDino.bind(this, dino))
//     return item
//   },

//    faveDino(dino, ev){
    
//     const listeItem = ev.target.closest('.dino')

//     if(dino.fave)
//     listItem.classList.add('fave')

    
//     this.save()
//   },

//   removeDino(ev) {
//     const listItem = ev.target.closest('.dino')
//     listItem.remove()

//     for (let i = 0; i < this.dinos.length; i++) {
//       const currentId = this.dinos[i].id.toString()
//       if (listItem.dataset.id === currentId) {
//         this.dinos.splice(i, 1)
//         break;
//       }
//     }


//     this.save()
//   },
// }

// app.init({
//   formSelector: '#dino-form',
//   listSelector: '#dino-list',
//   templateSelector: '.dino.template',
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
      fav: false,
    }

    this.addDino(dino)
    
    ev.target.reset()
  },

  save() {
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

    if (dino.fav) {
      item.classList.add('fav')
    }

    item
      .querySelector('button.remove')
      .addEventListener('click', this.removeDino.bind(this))
    item
      .querySelector('button.fav')
      .addEventListener('click', this.favDino.bind(this, dino))
    item
      .querySelector('button.move-up')
      .addEventListener('click', this.moveUp.bind(this, dino))
    item
      .querySelector('button.move-down')
      .addEventListener('click', this.moveDown.bind(this, dino))

    return item
  },

  moveDown(dino, ev) {
    const listItem = ev.target.closest('.dino')

    const index = this.dinos.findIndex((currentDino, i) => {
      return currentDino.id === dino.id
    })

    if (index < this.dinos.length - 1) {
      this.list.insertBefore(listItem.nextElementSibling, listItem)

      const nextDino = this.dinos[index + 1]
      this.dinos[index + 1] = dino
      this.dinos[index] = nextDino
      this.save()
    }
  },

  moveUp(dino, ev) {
    const listItem = ev.target.closest('.dino')

    const index = this.dinos.findIndex((currentDino, i) => {
      return currentDino.id === dino.id
    })

    if (index > 0) {
      this.list.insertBefore(listItem, listItem.previousElementSibling)

      const previousDino = this.dinos[index - 1]
      this.dinos[index - 1] = dino
      this.dinos[index] = previousDino
      this.save()
    }
  },

  favDino(dino, ev) {
    const listItem = ev.target.closest('.dino')
    dino.fav = !dino.fav

    if (dino.fav) {
      listItem.classList.add('fav')
    } else {
      listItem.classList.remove('fav')
    }

    this.save()
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