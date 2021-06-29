import { Request, Response } from 'express';
import express from 'express';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { importGtfs } from 'gtfs';
import { graphqlHTTP } from 'express-graphql';
import { typeDefs } from './schemas/TypeDefs'
import { resolvers } from './resolvers'
const config = require('../config.json')
const app = express();
const port = process.env.PORT || '8000';

// API working check

// Endpoint - Root
export const rootHandler = (_req: Request, res: Response) => {
    importGtfs(config)
    return res.send('API is working 🤓');
};

app.get('/', rootHandler);


// Endpoint - /graphql
export const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});
app.use('/graphql', graphqlHTTP({
    schema: executableSchema,
    graphiql: true,
}));


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});