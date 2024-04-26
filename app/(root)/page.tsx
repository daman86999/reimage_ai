import { SignedIn, UserButton } from "@clerk/nextjs";

const Home = () => {
  return (
    <div>
      <p>Home</p>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
};

export default Home;
