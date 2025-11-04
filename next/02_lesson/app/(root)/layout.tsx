const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Root Navbar
      </h1>
      {children}
    </div>
  );
};

export default layout;
