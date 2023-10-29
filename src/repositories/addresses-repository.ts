export type AddressType = {
    id: number
    value: string
}

const addresses = [{ id: 1, value: 'Nezavisimosti 12' }, { id: 2, value: 'Selickaga 11' }]

export const addressesRepository = {
    async findAddresses(): Promise<AddressType[]> {
        return addresses
    },
    async findAddressById(id: number): Promise<AddressType | undefined> {
        let address = addresses.find(a => a.id === id)
        return address
    },
}