// use interface for the data as they are not part of the compiled JS bundle
// it's slim and the application won't need instances of the data
export interface BaseItem {
  name: string;
  price: number;
  description: string;
  image: string;
}

// there are scenarios that you only need to assert the item's info without its id
export interface Item extends BaseItem {
  id: number;
}
