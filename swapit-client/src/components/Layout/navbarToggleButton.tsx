import { FiMenu } from "react-icons/fi";

const NavbarToggleButton = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  return (
    <nav className="flex items-center justify-between bg-white shadow p-4">
      <button onClick={onToggleSidebar} className="text-xl">
        <FiMenu />
      </button>
      <h1 className="text-lg font-bold">Admin Panel</h1>
    </nav>
  );
};

export default NavbarToggleButton;
