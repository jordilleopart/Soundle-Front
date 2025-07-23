import Navbar from "../components/organisms/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-black text-white min-h-screen p-4">
        {/* Aquí irá el resto del contenido */}
        <h2 className="text-xl font-semibold">Contenido de la Home</h2>
      </main>
    </>
  );
}
