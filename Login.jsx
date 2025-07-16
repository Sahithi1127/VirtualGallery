import React, { useState } from "react";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";


const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Logged in as ${username}`);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl transition-all duration-500">
        <CardContent className="p-6">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>
            <div>
              <Button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-2 transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;