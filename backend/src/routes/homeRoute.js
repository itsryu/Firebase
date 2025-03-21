class HomeRoute {
    /**
     * @param {import('express').Request} _
     * @param {import('express').Response} res
     */
    run = (_, res) => {
        res.send('Hello World!');
    }
}

export { HomeRoute };