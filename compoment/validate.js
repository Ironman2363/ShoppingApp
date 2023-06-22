export const checkRe_Passwords = (text, password) =>{
      if(text === ""){
        return false
      }else if(text !== password){
        return false
      }
      else{
        return true
      }
}

export const checkEmail = (text)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(text === ""){
        return false
    }else if(!regex.test(text)){
       return false
    }else{
        return true
    }
}

export const checkPassword = (text) =>{
    if(text === ""){
        return false 
    }else{
        return true
    }
}