export const endpoints = (name) => {
    const isLocal = window.location.origin.includes('localhost')
    const BACKEND = isLocal ? process.env.NEXT_PUBLIC_BACKEND : process.env.NEXT_PUBLIC_BACKEND

    const endpoints = {
        user_login: `${BACKEND}/users/login`,
        expenses:`${BACKEND}/expenses/get`,
        categories:`${BACKEND}/categories/get`,
    }
    return endpoints[name];
}

export const email = () => {
    const isLocal = window.location.origin.includes('localhost')
    const email = isLocal ? process.env.NEXT_PUBLIC_EMAIL : process.env.NEXT_PUBLIC_EMAIL;
    return email
}; 

// export const headers = () => {
//     const token = JSON.parse(localStorage.getItem('user') || '').token
//     return {
//         headers: {
//             'Authorization': `Bearer ${token}` 
//         }
//     }
// }