import { combineReducers } from 'redux';
import AppcliationsReducer from './applications';
import SpinnerReducer from './spinner';
import WebviewControls from './webviewControls';
import Account from './account';
import ActiveApplication from './activeApplication';
import Tabbar from './tabbar';
import Webviews from './webviews';
import AccountSearch from './accountSearch';
import AvailableBUs from './availableBUs';
import Settings from './settings';
import Login from './login';

const rootReducer = combineReducers({
    activeApplication: ActiveApplication,
    applications: AppcliationsReducer,
    spinner: SpinnerReducer,
    controls: WebviewControls,
    account: Account,
    webviews: Webviews,
    tabs: Tabbar,
    accountSearch: AccountSearch,
    availableBUs: AvailableBUs,
    settings: Settings,
    login: Login
});

export default rootReducer;