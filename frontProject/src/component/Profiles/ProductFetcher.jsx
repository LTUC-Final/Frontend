import { useState } from "react";
import { useSelector } from "react-redux";

export default function ProductFetcher(){
 const user = useSelector((state) => state.UserInfo.user);
 const [product,setProduct]=useState(null);



    return( 
    <>
       
        
       
     </>
     );
}