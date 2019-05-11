import data from './data.json';

class User {}
class Friend{}

const viewer = new User();
 viewer.id ='1';
 viewer.name='me';
 const friends=data.map((obj)=>{
const friend= new Friend();
   friend.id= require('crypto').randomBytes(10).toString('hex');
   friend.firstname=obj.firstname;
   friend.lastname=obj.lastname;
   friend.gender=obj.gender;
   friend.language=obj.language;
   friend.email=obj.email;
   friend.image=obj.image;

 })