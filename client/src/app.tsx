import './app.module.css'
import { Footer } from './components/footer';
import { Navigation } from './components/navigation';
import { Home } from './pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About } from './pages/about';
import { NotFound } from './pages/page-not-found';
import { Login } from './pages/login';
import { PublicOutlet } from './components/public-outlet';
import { PrivateOutlet } from './components/private-outlet';
import { Register } from './pages/register';
import { CurrentUserProvider } from './context/user-context';
import { GameCardDetails } from './pages/games/game-card-details';
import { CreateGameForm } from './pages/games/create-game-form';
import { Users } from './pages/users';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { CategoryGames } from './components/category-games';
import { UserPreferencesProvider } from './context/user-preferences';
import { Profile } from './pages/profile';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000'
    },
    secondary: {
      main: '#EE7879'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CurrentUserProvider>
        <UserPreferencesProvider>
          <BrowserRouter>
            <CssBaseline />
            <Navigation />

            <Routes>
              <Route path='/' element={<About />} />

              <Route path='/games' element={<PrivateOutlet />}>
                <Route path='' element={<Home />} />
                <Route path='create' element={<CreateGameForm />} />
                <Route path=':id' element={<GameCardDetails />} />
              </Route>

              <Route path='/categories' element={<PrivateOutlet />}>
                <Route path='category/:id' element={<CategoryGames />} />
              </Route>

              <Route path='/user' element={<PublicOutlet />}>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
              </Route>

              <Route path='/profile' element={<PrivateOutlet />}>
                <Route path='' element={<Profile />} />
              </Route>

              {/* Only for admins!! */}
              <Route path='/users' element={<Users />} />

              <Route path='*' element={<NotFound />} />
            </Routes>

            <Footer />
          </BrowserRouter>
        </UserPreferencesProvider>
      </CurrentUserProvider>
    </ThemeProvider>
  )
}

export default App;