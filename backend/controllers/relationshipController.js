// const supabase = require('../middleware/supabase');

async function getRelationships(req, res) {
    // console.log('getRelationships');
        const { data, error } = await req.supabase
            .from('entity_relationship_all')
            .select('Subject')
            .limit(10);
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'No data found' });
        }

        return res.status(200).json(data);
    };

module.exports = { getRelationships };