import React  from 'react';
 import ReactDOM from 'react-dom';
 import Friends from './components/Friends';
 import {QueryRender,graphql} from 'react-relay';
 import {environment,Network,RecordResource,Store} from 'relay-runtime';

 //Network layer
 function fetchQuery(
    operation,
    variables,
  ) {
    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(response => {
      return response.json();
    });
  }
  
  const modernEnviroment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),  
  });


 const mountNode =document.getElementById('root');
   ReactDOM.render(

    <QueryRender
    environment={modernEnviroment}
    query={graphql`
      query AppQuery{
          viewer{
              ...Friends_viewer
          }
      }
    `}
    variables={{}}
    render={({error,props})=>{
         if(props) return <Friends viewer={props.viewer}/>
         else return <div>LOADING...</div>
    }}
    
    />,
    mountNode
   );