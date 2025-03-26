

export const SubmitForm = async (data) => {
    try {
        const { email, password } = data
        let Username = email.split('@')[0]
        let Session="SignedIn"
        localStorage.setItem("User", JSON.stringify({ Username, email, password,Session }))

        return {success: true,message:"User Created successfully"}
    } catch (error) {
        console.log(error)
        return {success: false,message:"Error in creating user"}
    }

}

