
const getHola = async (req, res) => {
    const docs = {
        message: 'Hola rey'
    }
    res.status(200).json(docs)
}

export default getHola