import { useSession, signIn, signOut } from "next-auth/react";
import useSWR from "swr";
import api from "../utils/api";

export default function Component() {
  const { data: session, loading } = useSession();

  const { data, error } = useSWR(`/api/user/${session?.user?.email}`, api);

  return (
    <>
      <div style={{width:"100vw", height:"calc(100vh - 54px)"}} class="flex justify-center items-center ..." >
        {!session && (
          
          <div style={{width:"auto", height:"auto", backgroundColor:"#04D361", padding:"4rem 7rem 4rem 7rem", borderRadius:"3rem"}} class="flex justify-center items-center ...">
            <div >
              Fazer login
              <br />
              <button
                onClick={() => signIn("auth0")}
                className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >
                Login
              </button>
            </div>
          </div>
        )}
        {session && data && (
          <>
            <div>
              Signed in as {session.user.email} <br />
              <p> {data.data.coins}</p>
              <button onClick={() => signOut()}>Sign out</button>
            </div>
          </>
        )}
        {error && session && (
          <div>
            O usuário com email {session.user.email} não existe em nossa base de
            dados.
            <br />
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        )}
        {loading && <div>Carregando...</div>}
      </div>
    </>
  );
}
