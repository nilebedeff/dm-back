const addresses = [{ id: 1, value: 'Nezavisimosti 12' }, { id: 2, value: 'Selickaga 11' }]

export const addressesRepository = {
    findAddresses() {
        return addresses
    },
    findAddressById(id: number) {
        let address = addresses.find(a => a.id === id)
        return address
    },
}