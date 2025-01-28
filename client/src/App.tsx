import { FC } from 'react';
import { useRoutes } from './hooks/useRouter';


const App:FC = () => {
  const routes = useRoutes()
  return (
    <>
   {routes}
    </>
  )
}

export default App;