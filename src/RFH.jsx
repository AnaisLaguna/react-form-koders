import React, { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

// ...
export default function RHF() {
  const [todos, setTodos] = useState([]);
  const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } = useForm();

  function onSubmit(data) {
    setTodos([...todos, data]);
  }

  function removeTodo(indexToRemove) {
    const newTodos = todos.filter((todo, idx) => idx!== indexToRemove);
    setTodos(newTodos);
  }

  return (
    <main className="w-full min-h-screen flex flex-col bg-gradient-to-r from-cyan-500 to-blue-500">
      <header className="w-full py-4 flex justify-center">
        <h1 className="text-3xl font-bold text-white">FORM KODERS</h1>
      </header>
      <form
        className="flex flex-row gap-2 justify-center p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className={clsx("px-3 py-2 rounded-md text-sm text-gray-700 w-full max-w-xs", {
            'border-2 border-red-500 bg-red-300': errors.nombre,
          })}
          placeholder="Ingresa tu nombre"
          required
          {...register("nombre", {
            required: { value: true, message: "Campo requerido" },
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
          })}
        />
        <input
          type="text"
          className={clsx("px-3 py-2 rounded-md text-sm text-gray-700 w-full max-w-xs", {
            'border-2 border-red-500 bg-red-300': errors.apellido,
          })}
          placeholder="Ingresa tu apellido"
          required
          {...register("apellido", {
            required: { value: true, message: "Campo requerido" },
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
          })}
        />
        <input
          type="email"
          className={clsx("px-3 py-2 rounded-md text-sm text-gray-700 w-full max-w-xs", {
            'border-2 border-red-500 bg-red-300': errors.email,
          })}
          placeholder="Ingresa tu correo electrónico"
          required
          {...register("email", {
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Correo electrónico inválido",
            },
          })}
        />
        <button
          className="text-black px-3 py-2 rounded bg-stone-400 hover:bg-stone-500"
          disabled={isSubmitted?!isValid : false}
        >
          + Agregar
        </button>
      </form>

      {errors.nombre && (
        <p className="text-red-500 text-center text-sm font-semibold">
          {errors.nombre?.message}
        </p>
      )}
      {errors.apellido && (
        <p className="text-red-500 text-center text-sm font-semibold">
          {errors.apellido?.message}
        </p>
      )}
      {errors.email && (
        <p className="text-red-500 text-center text-sm font-semibold">
          {errors.email?.message}
        </p>
      )}

      <div className="max-w-screen-sm w-full mx-auto p-4 flex flex-col gap-1">
        {todos.length === 0 && (
          <p className="text-white/50">No tienes datos guardados 🤷‍♀️</p>
        )}
        {todos.length > 0 &&
          todos.map((todo, idx) => {
            return (
              <div key={`todo-${idx}`} className="bg-white/10 rounded p-4 flex flex-row justify-between">
                <span className="select-none text-black">
                  {todo.nombre} {todo.apellido} - {todo.email}
                </span>
                <span
                  className="text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1 size-5 text-center items-center flex"
                  onClick={() => removeTodo(idx)}
                >
                  X
                </span>
              </div>
            );
          })}
      </div>
    </main>
  );
}