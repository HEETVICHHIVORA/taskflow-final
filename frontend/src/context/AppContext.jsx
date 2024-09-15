import { createContext,useState } from "react";

export const AppContext=createContext();

export default function AppContextProvider({children}){
    const [teamName,setTeamName]=useState("");
    const [loader,setloader]=useState(false);
    const value={
        teamName,setTeamName,loader,setloader
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}