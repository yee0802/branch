import Header from "./Header";

type FallbackPageProps = {
  message: string;
  status: number;
};

const FallbackPage: React.FC<FallbackPageProps> = ({ message, status }) => {
  return (
    <div className="flex h-screen min-h-screen w-screen flex-col">
      <Header />
      <div className="flex h-full flex-grow items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <h1 className="text-4xl font-semibold">{status}</h1>
          <p className="text-center text-xl">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default FallbackPage;
