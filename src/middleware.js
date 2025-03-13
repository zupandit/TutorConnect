//Without a defined matcher, this one line applies next-auth to entire proj
export {default } from "next-auth/middleware"

//Applied next-auth to only matching routes - can be regex
export const config = {matcher: ["/dashboard"]}