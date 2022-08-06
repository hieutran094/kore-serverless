import { Router } from 'express'
import { authController } from '../../controllers/index'

const router = Router()

router.route('/token').post(authController.getToken.bind(authController))

export default router
