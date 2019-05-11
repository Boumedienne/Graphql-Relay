import express from 'express';
import graphqlHTTP  from 'express-graphql';
import schema  from './schema';
import { getEnabledCategories } from 'trace_events';
import path from 'path';
import webpack from 'webpack';
import WebPackDevServer from 'webpack-dev-server';
import {schema} from './data/database' ; // adding later 


const APP_PORT=3000;
const GRAPHQL_PORT=8080;

//Graphql server 

const graphqlServer= express();

graphqlServer.use('/graphql',graphqlHTTP({
  schema,
 pretty:true,
  graphiql:true,

 }));
 graphqlServer.listen(GRAPHQL_PORT,()=>{
  console.log(`Running server on localhost:${GRAPHQL_PORT}`);
});