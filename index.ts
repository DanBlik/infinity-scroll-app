// unsplash api
const count: number = 10
const apiKey: string = 'ythl0-0COk3ksSbbv_3LplfcLHlQ7bqqJXxAa63QeKM'
const apiUrl: string = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Display photos
type addNodesWithPhotosT = (photos: dataT) => void

const addElementsWithPhotos: addNodesWithPhotosT = (photos) => {
  const setAttributes = (elem: Element, attributes: {[k: string]: string}) => {
    for (const key in attributes) {
      elem.setAttribute(key, attributes[key])
    }
  }

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
    const response = await fetch(apiUrl)
    const data: dataT = await response.json()
    console.log(data);
    addElementsWithPhotos(data)
  }
  catch (e) {
    throw new Error(e)
  }
}

getPhotos()