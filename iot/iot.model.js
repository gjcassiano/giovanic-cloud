const {instances} = require('gstore-node');
const gstore = instances.get('giovanic');
const {Schema} = gstore;

/**
 * Create the schema for the User Model
 */
const iotSchema = new Schema({
    name: {type: String, required: true},
    value: {type: String, required: true},
    created_at: {default: gstore.defaultValues.NOW, write: false, read: true},
},{ timestamps: { createdAt: 'created_at' } });

const listSettings = {
    limit: 15
};

iotSchema.queries('list', listSettings);

module.exports = gstore.model('Iot', iotSchema);
