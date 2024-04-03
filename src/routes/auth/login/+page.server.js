import { fail, redirect } from '@sveltejs/kit';
import bcrypt from "bcrypt";

const users = [
    {
        email: "test1@gmail.com",
        password: "$2b$10$igT.JhB7/2yPMuzXQ/BMAeiTkNpFYbiCoW0.IfHlFLA9Thx61ZFLy"
    },
    {
        email: "test2@gmail.com",
        password: "$2b$10$XM032qoEaLt2TzyjGgxuGewkbLNWziozErJdkXWxR/.QSDKpysrWW"
    }
]
let loggetUser = {};
/** @type {import('./$types').PageServerLoad} */
export async function load() {
    if (Object.values(loggetUser).length){
        redirect(302, '/');
    }
    return {users, user: loggetUser};
};

function validateEmail(email) {
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}

export const actions = {
    login: async(event)=>{
        const formData = Object.fromEntries(await event.request.formData());   
        const errorsObj = {}  
        const findUser = users.find((users)=>users.email === formData.email)
        console.log("Data", formData);
        if (!validateEmail(formData.email)){
            errorsObj.email = "Email is not valid";
        }

        if(findUser === undefined){
            errorsObj.password = "User is not register"
        }
        if(Object.values(errorsObj).length){
            return fail(400,errorsObj);}
        const isPasswordCompare = bcrypt.compareSync(formData.password,     findUser?.password);
        if(isPasswordCompare){
            loggetUser = findUser;
            
        }else{
                errorsObj.email = "Password or email is not correct";
                errorsObj.password = "Password or email is not correct";
        }
        
        if(Object.values(errorsObj).length){
            return fail(400,errorsObj);}
        redirect(302, '/');
    }, 
    
    register: async(event)=>{
        const formData = Object.fromEntries(await event.request.formData());
        const findUser = users.find((users)=>users.email === formData.email)
        if(findUser !== undefined){
            return fail(400, {email: "Email registered"})
        }   
        const errorsObj = {} 
        console.log("Data", formData);
        if(!validateEmail(formData.email)){
            errorsObj.email = "Email is not valid";
        }
        if(!formData.password || formData.password.length < 6){
            errorsObj.password = "Password is more 6 character";
        }
        if(Object.values(errorsObj).length){
            console.log(errorsObj);
            return fail(400,errorsObj);
        }
        if (validateEmail(formData.email)){
            const findUser = users.find((users)=>users.email === formData.email)
            console.log("finduser", findUser)
            if(findUser === undefined && formData.password){
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(formData.password, salt);
                console.log("hash", hash)
                const newUser = {
                    email: formData.email,
                    password: hash
                };
                users.push(newUser);
                
                loggetUser = newUser;
            }
        }
    redirect(302, '/');
    }
} 
    
