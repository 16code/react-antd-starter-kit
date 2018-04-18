import { BrowserRouter } from 'react-router-dom';
import Routes from '../routes';
const Container = () => (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
);
BrowserRouter.displayName = 'BrowserRouter';
Container.displayName = 'Container';
export default Container;
