import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import { dbUsers } from "../../../database";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    Credentials({
      name:'Custom Login',
      credentials: {
        email: { label: 'Correo', type: 'email' , placeholder:'correo@google.com'},
        password: { label: 'Contraseña', type: 'password' , placeholder:'Contraseña'}
      },
      async authorize(credentials) {

        // console.log({credentials})

        // return { name: 'Francisco', correo: 'francisco@gmail.com', role:'admin'};
        return await dbUsers.checkUserEmailPassword( credentials?.email ||'', credentials?.password || '')
      }
    })

  ],

  //Callbacks

  callbacks: {

    async jwt({ token, account, user }) {
      // console.log({token, account, user});
      if ( account ) {
        token.accessToken = account.access_token;
        switch ( account.type ) {
          case 'oauth':
            // TODO: crear usuario o verificar sie xiste en bd
          break;
          
          case 'credentials':
            token.user = user;
          break;
          
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      // console.log({token, session, user});

      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    }

  }

});
