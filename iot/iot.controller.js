const Iot = require('./iot.model');

const getList = (req ,res) => {
    const pageCursor = req.query.cursor;
    Iot.list({ start: pageCursor })
        .then((entities) => {
            res.json(entities);
        })
        .catch((err)=>{
            res.status(400).json(err);
        });
};

const getData = (req, res) => {
    Iot.get(req.params.id) // Retrieve the reference entity
        .then((entity) => {
            res.json(entity.plain());
        })
        .catch(err => res.status(400).json(err));
};

const createData = (req, res) => {
    const entityData = Iot.sanitize(req.body);
    const iot = new Iot(entityData);

    iot.save()
        .then((entity) => {
            res.json(entity.plain());
        })
        .catch((err) => {
            // If there are any validation error on the schema
            // they will be in this error object
            res.status(400).json(err);
        })
};

const deleteData = (req, res) => {

    Iot.delete(req.params.id)
        .then((response) => {
            res.json(response);
        })
        .catch(err => res.status(400).json(err));
};

module.exports = {
    getList,
    getData,
    createData,
    deleteData
};
