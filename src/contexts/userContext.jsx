import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserProvider = (props) =>{
    const [loggedInUsername, setLoggedInUserName] = useState({
        name: 'tickle122', img_url: "https://i.ibb.co/mzP0Jxc/322367357-862890088290252-4633494968470653183-n.jpg" 
    })

return (
    <UserContext.Provider value={{ loggedInUsername, setLoggedInUserName}}>
    {props.children}
   </UserContext.Provider>
    );

}