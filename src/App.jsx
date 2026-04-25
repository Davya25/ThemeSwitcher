import ThemeSwitcher from "./components/ThemeSwitcher";
import { ThemeProvider } from "./Context/ThemeContext";


const App=()=>{
  return(<>
 
    <ThemeProvider>
   <ThemeSwitcher />
</ThemeProvider>
  
  </>);
};

export default App;