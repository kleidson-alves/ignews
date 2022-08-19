import { query } from "faunadb";
import NextAuth from "next-auth"
import { decode, encode } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github"
import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
            scope: 'read:user'
        }
      }
    }),
  ],
  secret: process.env.AUTH_KEY,
 
  callbacks: {
    async signIn({user, account, profile}) {
      const { email } = user;
      
      try {
        await fauna.query(
          query.If(
            query.Not(
              query.Exists(
                query.Match(
                  query.Index('user_by_email'),
                  query.Casefold(user.email)
                )
              )
            ),
            query.Create(
              query.Collection('users'),
              {data: { email }}
            ),
            query.Get(
              query.Match(
                query.Index('user_by_email'),
                query.Casefold(user.email)
              )
            )
          )
        )

        return true;

      } catch(err){

        return true;

      }
      

    }
  }
})