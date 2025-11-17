import Sidebare from '../../../../../components/Driver/Dashboard/sidebare/sidebare';
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full h-screen">
        <Sidebare />
        {children}
      </div>
    </>
  );
}
