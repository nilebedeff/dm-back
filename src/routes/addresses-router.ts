import { Request, Response, Router } from "express"
import { AddressType, addressesRepository } from "../repositories/addresses-repository"

export const addressesRouter = Router({})

addressesRouter.get('/', async (req: Request, res: Response) => {
    const foundAddresses: AddressType[] = await addressesRepository.findAddresses()
    res.send(foundAddresses)
})
addressesRouter.get('/:id', async (req: Request, res: Response) => {
    const foundAddress: AddressType | undefined = await addressesRepository.findAddressById(+req.params.id)
    if (foundAddress) {
        res.send(foundAddress)
    } else {
        res.sendStatus(404)
    }
})