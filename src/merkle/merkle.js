class merkel{

comeout(hashArray){

for(let i=hashArray.length-1;i>=0;i--){
hashArray[i]=SHA256(hashArray[i]).toString()
}


    let current=hashArray
    while(current.length>1){
        for(let i=1;i<=current.length;i++){
            if(i%2==0){
                current[i/2-1]=SHA256(current[i-1]+current[i-2]).toString()
            }else if(i==current.length&&i%2!=0){
    current[i/2]=SHA256(current[i-1]).toString()
            }
       }
    
       if(current.length%2==0){
        current.splice(current.length/2,current.length/2)
    }else{
        current.splice((current.length+1)/2,(current.length-1)/2)
    }
    }
    
   return current[0]
}


}
