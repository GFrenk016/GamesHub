import SessionProvider from './context/SessionProvider';
import Routing from './routes/Routing';

export default function App() {
  return (
    <SessionProvider>
      <Routing />
    </SessionProvider>
  );
}
