import { Request, Response, Router } from "express"
import { addressesRepository } from "../repositories/addresses-repository"

export const addressesRouter = Router({})

addressesRouter.get('/', (req: Request, res: Response) => {
    const foundAddresses = addressesRepository.findAddresses()
    res.send(foundAddresses)
})
addressesRouter.get('/:id', (req: Request, res: Response) => {
    let foundAddress = addressesRepository.findAddressById(+req.params.id)
    if (foundAddress) {
        res.send(foundAddress)
    } else {
        res.send(404)
    }
})