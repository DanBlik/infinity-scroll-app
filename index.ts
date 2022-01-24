const loader = document.querySelector('.loader')
let photosArr = []
let ready = false
let imagesLoaded = 0
let totalImages = 0

// unsplash api
const count = 10
const apiKey = 'ythl0-0COk3ksSbbv_3LplfcLHlQ7bqqJXxAa63QeKM'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'

const imageLoaded = () => {
  imagesLoaded++

  if (imagesLoaded === totalImages) {
    ready = true
  }
}

// Display photos
type addNodesWithPhotosT = (photos: dataT) => void

const addElementsWithPhotos: addNodesWithPhotosT = (photos) => {
  const setAttributes = (elem: Element, attributes: {[k: string]: string}) => {
    for (const key in attributes) {
      elem.setAttribute(key, attributes[key])
    }
  }

  photosArr = [...photosArr, ...photos]
  totalImages = photosArr.length

  const imgContainer = document.querySelector('.img-container')

  photos.forEach(photo => {
    const link = document.createElement('a')
    setAttributes(link, {
      href: photo.links.html,
      target: '_blank',
    })

    const img = document.createElement('img')
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
    })
    img.addEventListener('load', imageLoaded)

    link.appendChild(img)
    imgContainer.appendChild(link)
  })
}


// Get photos from api
type photoT = {
  [key: string]: photoT & string
}

type dataT = photoT[]
const  getPhotos = async () => {
  try {
    const response = await fetch(proxyUrl + apiUrl)
    const data: dataT = await response.json()
    addElementsWithPhotos(data)
  }
  catch (e) {
    throw new Error(e)
  }
}

getPhotos()

// onscroll
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false
    getPhotos()
  }
})