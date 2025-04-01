// // Utility function to decode JWT (Client-Side Safe Alternative)
// export function parseJwt(token: string) {
//   try {
//     return JSON.parse(atob(token.split('.')[1]))
//   } catch (err) {

//     console.error(err)
//     return null
//   }
// }
