import { fail } from '@sveltejs/kit';
const users = [
    {
        email: "test1@gmail.com",
        password: "1"
    },
    {
        email: "test2@gmail.com",
        password: "123456"
    }
]
let loggetUser = {};
/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {users, user: loggetUser};
};

function validateEmail(email) {
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}

export const actions = {
    login: async(event)=>{
        const formData = Object.fromEntries(await event.request.formData());    
        console.log("Data", formData);
        if (validateEmail(formData.email)){
            const findUser = users.find((users)=>users.email === formData.email)
            console.log("finduser", findUser)
            if(findUser !== undefined && formData.password === findUser?.password){
                loggetUser = findUser
            }
        }
    },
    register: async(event)=>{
        const formData = Object.fromEntries(await event.request.formData());
        const findUser = users.find((users)=>users.email === formData.email)
        if(findUser !== undefined){
            return fail(400, {email: formData.email, message: "Email registered"})
        }    
        console.log("Data", formData);
        if(!validateEmail(formData.email)){
            return fail(400, {email: formData.email, message: "Email is not valid"})
        }
        if(!formData.password || formData.password.length < 6){
            return fail(400, {password: formData.password, message: "Password is more 6 character"})
        }
        if (validateEmail(formData.email)){
            const findUser = users.find((users)=>users.email === formData.email)
            console.log("finduser", findUser)
            if(findUser === undefined && formData.password){
                const newUser = {
                    email: formData.email,
                    password: formData.password
                };
                users.push(newUser);
                
                loggetUser = newUser;
            }
        }
    }
} 
    
