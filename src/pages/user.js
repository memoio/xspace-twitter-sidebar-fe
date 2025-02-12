import { getSession, signOut } from "next-auth/react";

// gets a prop from getServerSideProps
function User({ user }) {
  return (
    <div className="text-slate-700">
      <h4 className="">User session:</h4>
      <pre className="text-red-500">{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => signOut({ redirect: "/signin" })}>Sign outr</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // redirect if not authenticated
  if (!session) {
    
  }

  return {
    props: { user: session },
  };
}

export default User;