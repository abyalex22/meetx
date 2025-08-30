"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const{data:session }= authClient.useSession()
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () =>{
    authClient.signUp.email({
      email,
      name,
      password
    },{
    onError: () =>{
      window.alert("Something went wrong")
    },
    onSuccess: () =>{
      window.alert("User created successfully")
    }
    }); 
  }
 
  if(session){
 return(
   <div className=" flex flex-col p-4 gap-4">
     <p> Logged in as {session.user.name}</p>
     <Button onClick={() => authClient.signOut()}>
      Sign out
     </Button>
   </div>
 );
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
    <Button onClick={onSubmit}>
      Create User
    </Button>
    </div>
  );
}
