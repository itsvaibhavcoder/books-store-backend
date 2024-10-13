import express, { IRouter } from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import WishlistController from '../controllers/wishlist.controller';

class WishlistRoutes {
  private router = express.Router();
  private wishlistController = new WishlistController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //Get wishlist items for the user
    this.router.get('', userAuth, this.wishlistController.getWishlist);

    //Add an item to the wishlist
    this.router.post('/:id', userAuth, this.wishlistController.addToWishlist);

    //Remove an item from the wishlist
    this.router.delete('/:id', userAuth, this.wishlistController.removeFromWishlist);
  }

  // Expose the routes
  public getRoutes(): IRouter {
    return this.router;
  }
}

export default WishlistRoutes;
