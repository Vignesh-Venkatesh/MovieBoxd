import { Avatar, Menu } from "@mantine/core";
import { FaUser, FaEye, FaPen, FaTrash } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

const name = "John Doe";

export default function Navbar() {
  return (
    <div className="text-slate-100 bg-zinc-950 h-16 flex justify-center ">
      <div className="w-[1000px] flex items-center">
        <h1 className="text-2xl font-bold w-1/4 flex justify-start">
          <span className="text-orange-400">Movie</span>
          <span className="text-slate-300">Boxd</span>
        </h1>
        {/* Buttons */}
        <div className="flex w-1/2"></div>
        <div className="flex w-1/2 justify-between items-center">
          <h1 className="uppercase font-bold text-slate-400 hover:cursor-pointer hover:text-orange-400 ">
            Home
          </h1>
          <h1 className="uppercase font-bold text-slate-400 hover:cursor-pointer hover:text-orange-400 ">
            Watchlist
          </h1>
          <h1 className="uppercase font-bold text-slate-400 hover:cursor-pointer hover:text-orange-400">
            Favorites
          </h1>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Avatar
                key={name}
                name={name}
                color="initials"
                className="hover:cursor-pointer"
              ></Avatar>
            </Menu.Target>

            <Menu.Dropdown
              style={{
                backgroundColor: "#27272a", // Dark background for dropdown
                border: "none",
              }}
            >
              <Menu.Label>Options</Menu.Label>

              <Menu.Item
                style={{
                  color: "#e2e8f0", // Text color
                  backgroundColor: "#27272a", // Default background color
                }}
                leftSection={<FaUser />}
              >
                Profile
              </Menu.Item>

              <Menu.Item
                style={{
                  color: "#e2e8f0", // Text color
                  backgroundColor: "#27272a", // Default background color
                }}
                leftSection={<FaEye />}
              >
                Activity
              </Menu.Item>
              <Menu.Item
                style={{
                  color: "#e2e8f0", // Text color
                  backgroundColor: "#27272a", // Default background color
                }}
                leftSection={<FaPen />}
              >
                My Reviews
              </Menu.Item>
              <Menu.Item
                style={{
                  color: "#e2e8f0", // Text color
                  backgroundColor: "#27272a", // Default background color
                }}
                leftSection={<LuLogOut />}
              >
                Logout
              </Menu.Item>
              {/* <Menu.Item>Collections</Menu.Item> */}
              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                color="#ef4444"
                leftSection={<FaTrash className="text-red-500" />}
              >
                Delete my account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>
  );
}
