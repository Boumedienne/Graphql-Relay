import express from 'express';
import graphqlHTTP  from 'express-graphql';
import { getEnabledCategories } from 'trace_events';
import path from 'path';
import webpack from 'webpack';
import WebPackDevServer from 'webpack-dev-server';
import {schema} from './data/schema' ;

const APP_PORT=3000;
const GRAPHQL_PORT=8080;

//Graphql server 

const graphqlServer= express();

graphqlServer.use('/',graphqlHTTP({
  schema,
  pretty:true,
  graphiql:true,

 }));
 graphqlServer.listen(GRAPHQL_PORT,()=>{
  console.log(`Running server on localhost:${GRAPHQL_PORT}`);
});


//relay 
const compiler =webpack({
  entry:['whatwg-fetch',path.resolve(__dirname,'src','App.js')],
  module:{
    loaders:[
      {
        exculde:/node_modules/,
         loader:'babel-loader',
         test:/\.js$/,
      },
    ],
  },
  output:{filename:'App.js',path:'/'}
});

const app =new WebPackDevServer(compiler,{
  contentBase:'/public/',
  proxy:{'/graphql/':`htttp://localhost:${APP_PORT}`},
  publicPath:'/src/',
  stats:{colors:true},
})

app.use('/',express.static(path.resolve(__dirname,'public')));
graphqlServer.listen(APP_PORT,()=>console.log(`Graphql server on localhost:${APP_PORT}`))