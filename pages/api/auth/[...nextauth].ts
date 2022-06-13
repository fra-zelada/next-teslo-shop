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


  // custom pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },


  session: {
    maxAge: 2592000, //30d
    strategy: 'jwt',
    updateAge: 86400, //se actualiza cada día
  },

  //Callbacks

  callbacks: {

    async jwt({ token, account, user }) {
      // console.log({token, account, user});
      if ( account ) {
        token.accessToken = account.access_token;
        switch ( account.type ) {
          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser( user?.email || '', user?.name || '');
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
