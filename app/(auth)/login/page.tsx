

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-gradient-to-b from-orange-200 to-orange-200 min-h-screen w-screen flex items-center justify-center">

      <div className="bg-orange-500 w-full max-w-[264px] px-8 py-5 rounded-md">

        <p className="text-2xl mb-4 text-white text-center">
          Iniciar sesión
        </p>

        <div className="flex flex-col gap-2 my-4">
          <input
            type="email"
            placeholder="Email *"
            required
            className="w-full h-[42px] rounded-lg bg-gray-100 px-3 text-sm text-gray-600 outline-none"
          />

          <input
            type="password"
            placeholder="Contraseña *"
            required
            className="w-full h-[42px] rounded-lg bg-gray-100 px-3 text-sm text-gray-600 outline-none"
          />
        </div>

        <div className="flex flex-col items-center gap-2 mt-3">
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm"
          >
            Registrarse
          </button>

          <p className="text-white text-sm text-center whitespace-nowrap">
            ¿No tienes cuenta?{" "}
            <Link
              href="/signup"
              className="text-red-600 underline"
            >
              Regístrate
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
