import express from 'express';
import graphqlHTTP  from 'express-graphql';
import schema  from './schema';


const app= express();

app.get('/',(req,res) =>{
   res.send('Graphql & relay modern') ;
});
 const root = {friend:(args)=>{
   return{
     "id":122315456,
     "firstname":"Sofiane",
     "lastname":"benmesvah",
     "gender":"Female",
     "language":"English", 
     "email":"vooven@gmail.com"
   }
 }

};  

 app.use('/graphql',graphqlHTTP({
  schema,
  rootValue:root,
  graphiql:true,

 }));
app.listen(8080,()=>{
  console.log('Running server on localhost:8080/graphql');
});