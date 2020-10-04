const { Model } = require('objection');

class Lab extends Model {
    static get tableName() {
        return 'labs';
    }

    $beforeInsert() {
        this.created_at = new Date().toISOString();
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'subject_name', 'filename'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                subject_name: { type: 'string', minLength: 1, maxLength: 255 },
                filename: { type: 'string', minLength: 1, maxLength: 255 },
                created_at: { type: 'datetime' },
                updated_at: { type: 'datetime' }
            }
        };
    }

}

module.exports = Lab;