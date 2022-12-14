import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { cityData } from './city-data/city-data';
import { offerProcess } from './offer-process/offer-process';
import { offersProcess } from './offers-process/offers-process';
import { commentsProcess } from './comments-process/comments-process';
import { userProcess } from './user-process/user-process';
import { nearbyOffersProcess } from './nearby-offers-process/nearby-offers-process';
import { newCommentProcess } from './new-comment-process/new-comment-process';
import { mainProcess } from './main-process/main-process';
import { favoritesProcess } from './favorites-process/favorites-process';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.City]: cityData.reducer,
  [NameSpace.Comments]: commentsProcess.reducer,
  [NameSpace.Offer]: offerProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.NearbyOffers]: nearbyOffersProcess.reducer,
  [NameSpace.NewComment]: newCommentProcess.reducer,
  [NameSpace.Main]: mainProcess.reducer,
  [NameSpace.Favorites]: favoritesProcess.reducer,
});
