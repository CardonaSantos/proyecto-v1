"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { email: "", password: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Ingresa un correco valido";
    }

    if (!validatePassword(password)) {
      newErrors.password = "La contraseña debe tener 8 caracteres minimo";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      // Aquí enviarías los datos al backend
      console.log("Form is valid, submitting...", { email, password });
    }
  };

  console.log(localStorage.getItem("authToken"));

  return (
    <div className="flex justify-center w-full">
      {/* <Card className="w-[350px] border-4"> */}
      {/* <Card className="w-full max-w-md md:max-w-2xl mx-auto"> */}
      <Card className="w-full max-w-md md:max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          {/* <CardDescription>Ingrese su usuario</CardDescription> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingrese su email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
