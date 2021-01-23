import App from '../App';

import Footer from './footer'
import NavHeader from './nav-header'

/* this function is currently not used */
export default function skeleton (props){

    return(
    <div className="center">
            {NavHeader()}
            <App />
            {Footer()}
    </div>

    )
}