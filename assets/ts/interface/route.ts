export interface Route {
    creater_id: number
    name: string
    description: string
    privateRoute: boolean
    approved: boolean
    places: [{
      name: string
      description: string
      lot: number
      lat: number
      images: {
        src: string
        alt: string
      }[]
    }]
    images:{
      src: string
      alt: string
    }[]
    city: string
  }