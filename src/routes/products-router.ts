import { Request, Response, Router } from "express"
import { ProductType, productsRepository } from "../repositories/products-repository"
import { body } from "express-validator"
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware"

export const productsRouter = Router({})

const titleValidation = body('title').trim().isLength({ min: 3, max: 10 }).withMessage('title must be between 3 and 10 characters')

productsRouter.get('/', async (req: Request, res: Response) => {
    const foundProducts: ProductType[] = await productsRepository.findProducts(req.query.title?.toString())
    res.send(foundProducts)
})
productsRouter.post('/',
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newProduct: ProductType = await productsRepository.createProduct(req.body.title)
        res.status(201).send(newProduct)
    })
productsRouter.get('/:id', async (req: Request, res: Response) => {
    let foundProduct: ProductType | undefined = await productsRepository.findProductById(+req.params.id)
    if (foundProduct) {
        res.send(foundProduct)
    } else {
        res.sendStatus(404)
    }
})
productsRouter.put('/:id',
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const isUpdated: boolean = await productsRepository.updateProduct(+req.params.id, req.body.title)
        if (isUpdated) {
            const product = productsRepository.findProductById(+req.params.id)
            res.send(product)
        } else {
            res.sendStatus(404)
        }
    })
productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted: boolean = await productsRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})