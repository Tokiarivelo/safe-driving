import Acceuil from '@/components/home';

const HomePage = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="relative w-full overflow-hidden">
        <Acceuil />
      </section>
    </div>
  );
};

export default HomePage;
