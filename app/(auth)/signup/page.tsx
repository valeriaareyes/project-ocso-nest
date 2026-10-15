




import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="bg-orange-200 min-h-screen w-screen flex items-center justify-center px-4">
      <div className="bg-orange-500 w-full max-w-sm px-10 py-6 rounded-md">

        <p className="text-2xl mb-4 text-white text-center">
          Registrarse
        </p>

        <div className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Email *"
            required
            className="h-12 w-full rounded-lg bg-gray-100 px-3 text-sm text-gray-600 outline-none"
          />

          <input
            type="password"
            placeholder="Contraseña *"
            required
            className="h-12 w-full rounded-lg bg-gray-100 px-3 text-sm text-gray-600 outline-none"
          />

          <input
            type="password"
            placeholder="Repetir contraseña *"
            required
            className="h-12 w-full rounded-lg bg-gray-100 px-3 text-sm text-gray-600 outline-none"
          />
        </div>

        <div className="flex flex-col items-center gap-2 mt-4">
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Registrarse
          </button>

          <p className="text-white text-sm text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              className="text-red-600 underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
