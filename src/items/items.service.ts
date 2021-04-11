// service module purpose:
// the business logic can be devloped in service module
// if we want to use external database such as MYSQL or MongoDB
// we only need to modify the code here
// we don't need to modify the controller or any other file

// Data Model Interfaces
import { Items } from "./items.interface";
import { BaseItem, Item } from "./item.interface";

// In-Memory Store
// to simplify the practice, we use the in-memory store
// Express wipes the in-memory data every restart time
// but with ts-node-dev,it only happens when there are changes in ther service file
let items: Items = {
  1: {
    id: 1,
    name: "Burger",
    price: 599,
    description: "Tasty",
    image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png",
  },
  2: {
    id: 2,
    name: "Pizza",
    price: 299,
    description: "Cheesy",
    image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png",
  },
  3: {
    id: 3,
    name: "Tea",
    price: 199,
    description: "Informative",
    image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png",
  },
};

// Service Methods
// read and write method are async functions
// Because it's an async funciton, it will return a Promise
// and this Promise is in the type of item array, which are stored in items object
// findAll() returns the whole items store objects
// Object.value(items) return an array with all items
export const findAll = async (): Promise<Item[]> => Object.values(items);

// find() returns a specific item with the id
export const find = async (id: number): Promise<Item> => items[id];

// create() receive an item in BaseItem type without id, and put it into the items arrays
// id is created by the current Date()

export const create = async (newItem: BaseItem): Promise<Item> => {
  const id = new Date().valueOf();

  items[id] = {
    id,
    ...newItem,
  };

  return items[id];
};

// update() receives an id and an updated item as parameters
// it will find the id first, if the id is not found, it returns null
// if it finds the id, it updates the item into items
export const update = async (
  id: number,
  itemUpdate: BaseItem
): Promise<Item | null> => {
  const item = await find(id);
  if (!id) {
    return null;
  }
  items[id] = {
    id,
    ...itemUpdate,
  };
  return items[id];
};

// remove() receive id, and find the item to delete
export const remove = async (id: number): Promise<null | void> => {
  const item = await find(id);

  if (!item) {
    return null;
  }
  delete items[id];
};
