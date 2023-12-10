export function formatPriceForDB(price: number | string | undefined | null): number | undefined {
    if (price === null) return
    else if (price === 0) return 0
    else if (!price) return
    let formatPrice = 0

    if (typeof price === 'string')
        formatPrice = parseInt(price, 10)
    else formatPrice = price

    return parseInt((formatPrice * 100).toFixed(0), 10)
}


export function formatPriceForFront(price: number | undefined | null): number | undefined {
    if (price === null) return
    else if (price === 0) return 0
    else if (!price) return

    return parseFloat((price / 100).toFixed(2))
}
