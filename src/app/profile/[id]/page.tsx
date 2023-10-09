// "use client";

export default function ProfileIdPage({ params }: any) {
  return (
    <div>
      <h1>Profile ID Page </h1>

      <h2>Current id is {params.id}</h2>

      <br></br>
      <button>Logout</button>
    </div>
  );
}
