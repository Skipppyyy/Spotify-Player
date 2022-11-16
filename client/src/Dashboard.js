// displayed once log in
import React from 'react'
import useAuth from './useAuth'
 
export default function Dashboard({code}) { // can do Dashboard(props) but ({code}) makes more readable, props made up of {code, any other params}
    console.log("DB" + code)
    const accessToken = useAuth({code}); // its a function not react component, so dont use <>
    return (
        <div>
            {code}
        </div>
    );
}