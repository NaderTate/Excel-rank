import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
function UserAvatar() {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user ? (
        <Dropdown
          placement="bottom-end"
          className="bg-background shadow-xl shadow-blue-600/10"
        >
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name={session?.user?.name || "User"}
              size="sm"
              src={
                session?.user?.image ||
                `https://ui-avatars.com/api/?name=${session?.user?.name}`
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{session?.user?.email || "User"}</p>
            </DropdownItem>
            <DropdownItem key="dashboard">
              <Link href={{ pathname: "/dashboard" }}>Dashboard</Link>
            </DropdownItem>
            <DropdownItem key="account">
              <Link href={{ pathname: "/account" }}>Settings</Link>
            </DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={() => {
                signOut();
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button
          as={Link}
          color="primary"
          variant="flat"
          href="/signin"
          className="dark:text-white"
        >
          Login
        </Button>
      )}
    </div>
  );
}

export default UserAvatar;
