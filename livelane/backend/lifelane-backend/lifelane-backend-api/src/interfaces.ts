export interface CapacityHour {
    hour: number;
    percentage: number;
  }
  export  interface Day {
    day: string;
    hours: Array<CapacityHour>
  }
  export  interface Location {
    lat: number;
    lng: number;
  }
  export interface SupermarketGoogle {
    placeId: string;
    distance: number;
    name: string;
    formatted_address: string;
    location: Location
    status: string;
    week: Array<Day>
  }
  export interface Article {
    name: string;
    hash: string;
    availability: number;
    lastupdate: string;
  }
  export interface SupermarketResp {
    name: string;
    placeId: string;
    formatted_address: string;
    occupancy: number;
    articles: Array<Article>
  }
  export interface ArticleMin {
    name: string;
    hash: string;
  }