import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/rooms/new' component={NewRoom} />
          <Route path='/rooms/:id' component={Room} />
          <Route path='/admin/rooms/:id' component={AdminRoom} />
        </Switch>
        <Toaster
          position='top-center'
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#f8f8f8',
              color: '#29292e',
            },
            success: {
              style: {
                background: '#835afd',
                color: '#fff',
              },
            },
            error: {
              style: {
                background: '#e73f5d',
                color: '#fff',
              },
            },
          }}
        />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
