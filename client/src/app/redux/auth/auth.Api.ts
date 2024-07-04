import { AddUserDto } from "@/app/types/user";

export const addUserApi = async (user: AddUserDto) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + "/user/add-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add user");
    }
    return response.json();
  };
  