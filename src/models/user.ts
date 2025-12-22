import { ObjectId } from "mongodb";
import { getDb } from "../utils/database.ts";
import type { ICart, ICartItem } from "../types/cart.ts";
import type { IProduct } from "../types/products.ts";

class User {
  private name: string;
  private email: string;
  private _id?: ObjectId;
  private cart?: ICart;

  constructor(name: string, email: string, id?: ObjectId, cart?: ICart) {
    this.name = name;
    this.email = email;
    if (id) this._id = id;
    if (cart) this.cart = cart;
  }

  public getUserId = () => this._id;

  save() {
    const db = getDb();
    const userData = {
      name: this.name,
      email: this.email,
    };
    return db.collection("users").insertOne(userData);
  }

  addToCart(product: IProduct) {
    if (!product._id || !this._id) {
      return Promise.reject("No product ID or user ID");
    }

    if (!this.cart) {
      this.cart = { items: [] };
    }

    const cartItemIdx = this.cart.items.findIndex((ci) => {
      return ci.productId.toString() === product._id!.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartItemIdx >= 0) {
      const currentItem = updatedCartItems[cartItemIdx];
      if (currentItem) {
        newQuantity = currentItem.quantity + 1;
        updatedCartItems[cartItemIdx] = {
          ...currentItem,
          quantity: newQuantity,
        };
      }
    } else {
      updatedCartItems.push({
        productId: product._id,
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };

    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  getCart() {
    const db = getDb();
    if (!this.cart) return;
    const productIds = this.cart?.items.map((item) => item.productId);
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        const cart = this.cart!;
        let cartItems: ICartItem[] = [];
        if (cart.items) {
          cartItems = cart.items;
        }
        return products.map((product) => {
          return {
            ...product,
            quantity: cartItems.find((p) => {
              return p.productId.toString() === product._id.toString();
            })?.quantity,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(id: string) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new ObjectId(id) });
  }
}

export default User;
