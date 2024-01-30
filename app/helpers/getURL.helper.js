const getURL = () => {
    return `${process.env.PROTOCOL}://${process.env.DOMAIN}:${process.env.PORT}`
}

export default getURL