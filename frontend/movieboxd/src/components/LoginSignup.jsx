import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Text,
  Stack,
  Container,
  Flex, // Importing Flex from Mantine
} from "@mantine/core";

export default function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false); // checking whether the form is in login or signup mode
  const [username, setUsername] = useState(""); // changed email to username
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // handling form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignup && password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // logic for handling form submission
    console.log(isSignup ? "Signing up" : "Logging in", { username, password });
  };

  return (
    <div className="flex flex-col min-h-screen justify-center">
      <Container size={500} my={40}>
        <div className="mb-5 flex justify-between items-end">
          <h1 className="font-bold text-2xl">
            <span className="text-orange-400">Movie</span>
            <span className="text-slate-300">Boxd</span>
          </h1>
          <h1 className="font-bold text-center text-xl text-slate-400">
            {isSignup ? "Sign Up" : "Login"}
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <Stack spacing="sm">
            <TextInput
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isSignup && (
              <PasswordInput
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}
          </Stack>

          <Group position="apart" mt="md">
            <Button
              variant="gradient"
              gradient={{ from: "#f97316", to: "#fb923c", deg: 75 }}
              type="submit"
            >
              {isSignup ? "Sign Up" : "Login"}
            </Button>
            <Text
              size="sm"
              onClick={() => setIsSignup((prev) => !prev)}
              style={{ cursor: "pointer" }}
            >
              {isSignup
                ? "Already have an account? Login"
                : "Need an account? Sign Up"}
            </Text>
          </Group>
        </form>
      </Container>
    </div>
  );
}
