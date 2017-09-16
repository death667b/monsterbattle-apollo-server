import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { GraphQLSchema } from 'graphql';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';

// Build GraphQLSchema.
const schema: GraphQLSchema = makeExecutableSchema({
	resolvers: resolvers,
	typeDefs: typeDefs,
});

const PORT = 3666;
const app = express();
app.use(cors()); // Allow All
app.use(bodyParser.json()); // Output JSON

// bodyParser is needed just for POST.
app.use('/graphql', graphqlExpress((req, res) => {
	console.log('req.body', req.body);
	return ({ schema: schema }) 
}));


app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql' }));

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
