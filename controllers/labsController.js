const Lab = require('../models/lab')

class LabsController {

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    static index = (req, res) => {
        const labs = Lab.all();
        res.send(labs);
    }

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    static store = (req, res) => {
        const { name, subject_name, filename } = req.body

        const lab = new Lab(name, subject_name, filename);
        lab.save()
        res.send(lab);
    }

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    static show = (req, res) => {
        const { id } = req.params
        const lab = Lab.find(id);
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
    static update = (req, res) => {
        const { id } = req.params
        const { body } = req

        const lab = Lab.find(id);
        
        if (!lab) {
            res.status(404).send(`Lab with id ${id} not found!`)
        }
        Object.keys(body).forEach(key => {
            lab[key] = body[key]
        });
        res.send(labs);
    }

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    static delete = (req, res) => {
        const { id } = req.params
        const labs = Lab.find(id);
        if (!lab) {
            res.status(404).send(`Lab with id ${id} not found!`)
        }

        labs.delete();
        res.send('OK');
    }

}

module.exports = LabsController;