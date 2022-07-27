import express from 'express'
import {
  about,
  privacy,
  answers,
  topic,
  unimplemented
} from '../controllers/viewController.js'

const viewRouter = express.Router()

viewRouter.get('/', about)
viewRouter.get('/privacy', privacy)
viewRouter.get('/search', unimplemented)
viewRouter.get('/profile/:name', unimplemented)
viewRouter.get('/topic/:slug', topic)
viewRouter.get('/unanswered/:slug', answers)
viewRouter.get('/:slug', answers)

export default viewRouter
