import { createContext,useState } from "react";

export const AppContext=createContext();

export default function AppContextProvider({children}){
    const [teamName,setTeamName]=useState("");
    const value={
        teamName,setTeamName
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}