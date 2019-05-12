import {
GraphQLObjectType,
GraphQLSchema,
GraphQLString,
} from 'graphql';

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    fromGlabalId,
    globalIdField,
    nodeDefinitions,
    toGlobalId,
} from 'graphql-relay';

import {
    User,
    Friend,
    getFriend,
    getFriends,
    getUser,
    getViewer,
} from './database'
 const {nodeInterface,nodeField} = nodeDefinitions(
    (globalId)=> {
        const {type,id}= fromGlabalId(globalId);
        if(type==='Friend')
         return getFriend(id);
         else if (type==='User')
           return getUser(id); 
         return null;  
    },
    (obj) =>{
        if(obj instanceof Friend)  
          return GraphqlFriend;
        else if (obj instanceof User)
             return    GraphQLUser;
        return null;     
    }
 );
const GraphQLUser= new GraphQLObjectType({
    name:'User',
    fields:()=>({
        id:globalIdField('User'),
        friends:{
            type:friendConnection,
            args:connectionArgs,
            resolve:(_,args) => connectionFromArray(getFriends(),args),

        },
    }),

    interfaces: [nodeInterface],

});

const GraphqlFriend= new GraphQLObjectType({
   name:'Friend',
   fields:() =>({
    id:globalIdField('Friend'),
    firstname:{
        type:GraphQLString
    }, 
    lastname:{
        type:GraphQLString
    },
    gender:{
        type:GraphQLString
    },
    language:{
        type:GraphQLString
    },
    email:{
        type:GraphQLString
    },
   }),
   interface:[nodeInterface],
 
});

const {connectionType:friendConnection}=
                   connectionDefinitions({name:'Friend',nodeType:GraphqlFriend});
    
const Query = new GraphQLObjectType({
    name:'Query',
    fields:()=>({
        node:nodeField,
        viewer:{
            type:GraphQLUser,
            resolve:() => getViewer(),
        },
    }),
});
export const schema =new GraphQLSchema({
    query:Query

})