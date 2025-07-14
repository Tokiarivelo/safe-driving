import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-2xl font-bold">Welcome</div>
      <div className="flex space-x-4">
        <a href="#" className="text-gray-700 hover:text-blue-500">
          Home
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-500">
          About
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-500">
          Contact
        </a>
        <div>
          <Button>S'authentifier</Button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
