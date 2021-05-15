import FormInput from "./FormInput";

export default function Signup({
  handleChange,
  registerForm,
  signupError,
  signUp,
  uniList,
}) {
  return (
    <div className="font-sans absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
      <div className="">
        <p className="mb-3">Correo electrónico</p>
        <FormInput
          name="email"
          value={registerForm.email}
          type="email"
          placeholder="Correo..."
          onChange={handleChange}
        />
      </div>
      <div className="">
        <p className="mb-3">Nombre de usuario</p>
        <FormInput
          name="username"
          value={registerForm.username}
          type="email"
          placeholder="Correo..."
          onChange={handleChange}
        />
      </div>
      <div className="">
        <p className="mb-3">Contraseña</p>
        <FormInput
          name="password"
          value={registerForm.password}
          type="password"
          placeholder="Contraseña..."
          onChange={handleChange}
        />
      </div>
      <div className="">
        <p className="mb-3">Universidad</p>
        <FormInput
          name="university-field"
          type="text"
          placeholder="Universidad..."
          onChange={handleChange}
        />
        <select
          name="university"
          value={registerForm.university}
          onChange={handleChange}
        >
          {uniList.map((x) => {
            return <option value={x.id}>{x.name}</option>;
          })}
        </select>
      </div>
      <p>{!!signupError && signupError}</p>
      <button onClick={signUp} className="mt-8 text-3xl">
        Crear cuenta
      </button>
    </div>
  );
}