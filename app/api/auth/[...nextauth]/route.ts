import startDb from "@/lib/db";
import UserModel from "@/models/userModel"
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id_token?: string
    provider?: string
    accessToken?: string
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) throw Error("E-mail invalid!");
        if(password.length < 5) throw Error("Password has to have 6 or more digits!")
        await startDb();
        const user = await UserModel.findOne( { email } );
        if(!user) throw Error("E-mail/password mismatch!");
        const passwordMatch = await user.comparePassword( password )
        if(!passwordMatch) throw Error("E-mail/password mismatch!")
        if(user){
        return {
          name: user.name,
          email: user.email,
          id: user._id,
          };
        }
      return null;
      }
    }),
  ],
  pages: {
    signIn: "/auth/login",
    // error: '/auth/error',
    signOut: '/auth/signout'
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token
        token.provider = account.provider
        token.accessToken = account.access_token
      }
      return token;
    },
    async session({ session, user, token }) {
      if (session.user) {
        (session.user as {id: string}).id = token.id as string;
        session.accessToken = token.accessToken as string
      }
      return session;
    }
  },
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };