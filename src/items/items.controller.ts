// Required External Modules and Interfaces
import express, { Request, Response, NextFunction } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface";

const getItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items: Item[] = await ItemService.findAll();
    res.status(200).send(items);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const createItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item: BaseItem = req.body;
    const newItem = await ItemService.create(item);

    res.status(200).json(newItem);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const getDetail = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: Item = await ItemService.find(id);
    if (item) {
      return res.status(200).send(item);
    }
    res.status(400).send("item not found");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const updateDatail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdate: BaseItem = req.body;
    const existingItem: Item = await ItemService.find(id);
    if (existingItem) {
      const updatedItem = await ItemService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }
    // if there is no existing item, create one
    const newItem = await ItemService.create(itemUpdate);
    res.status(200).json(newItem);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const deleteDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ItemService.remove(id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export default {
  getItem,
  createItem,
  getDetail,
  updateDatail,
  deleteDetail,
};
