import {Router} from 'express'
import { createCardHandler, deleteCardHanlder, getCards, updateCardHandler } from '../controllers/cardController.js'
export const cardsRouter = Router()

cardsRouter.get('/',getCards)
cardsRouter.post('/',createCardHandler)
cardsRouter.patch('/:id',updateCardHandler)
cardsRouter.delete('/:id',deleteCardHanlder)