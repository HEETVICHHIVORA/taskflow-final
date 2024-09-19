import { createContext,useState } from "react";

export const AppContext=createContext();

export default function AppContextProvider({children}){
    const [teamName,setTeamName]=useState("");
    const [loader,setloader]=useState(false);
    const [role,setrole]=useState("");
    const value={
        teamName,setTeamName,loader,setloader,role,setrole
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}