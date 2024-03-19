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
    register: async(event)=>{
        const formData = Object.fromEntries(await event.request.formData());    
        console.log("Data", formData);
        if (validateEmail(formData.email)){
            const findUser = users.find((users)=>users.email === formData.email)
            console.log("finduser", findUser)
            if(findUser !== undefined && formData.password === findUser?.password){
                loggetUser = findUser
            }
        }
    }
} 