const Lab = require('../models/lab')

class LabsController {

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    static index = async (req, res) => {
        const labs = await Lab.query();
        res.send(labs);
    }

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    static store = async (req, res) => {
        const { name, subject_name, filename } = req.body

        const lab = await Lab.query().insert({ name, subject_name, filename });
        res.send(lab);
    }

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    static show = async (req, res) => {
        const { id } = req.params
        const lab = await Lab.query().findById(id);
        if (!lab) {
            res.status(404).send(`Lab with id ${id} not found!`)
        }

        res.send(lab);
    }

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    static update = async (req, res) => {
        const { id } = req.params
        const { body } = req

        const numUpdated  = await Lab.query().findById(1).patch(body);
        if (!numUpdated) {
            res.status(404).send(`Lab with id ${id} not found!`)
        }

        res.send(`Laba with id ${id} update ${numUpdated} rows`);
    }

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    static delete = async (req, res) => {
        const { id } = req.params
        const lab = await Lab.query().deleteById(id);

        res.send('OK');
    }

}

module.exports = LabsController;