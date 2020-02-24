
var ExpressCassandra = require('express-cassandra');
var models = ExpressCassandra.createClient({
    clientOptions: {
        contactPoints: ['172.16.3.43'],
        protocolOptions: { port: 9042 },
        keyspace: 'Alamgir',
        queryOptions: {consistency: ExpressCassandra.consistencies.one}
    },
    ormOptions: {
        defaultReplicationStrategy : {
            class: 'SimpleStrategy',
            replication_factor: 1
        },
        migration: 'safe',
    }
});

module.exports = {ExpressCassandra,models};
