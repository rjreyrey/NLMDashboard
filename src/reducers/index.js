import { combineReducers } from 'redux';
import Appcliations from './applications';
import Spinner from './spinner';
import WebviewControls from './webviewControls';
import Account from './account';
import ActiveApplication from './activeApplication';
import Tabbar from './tabbar';
import Webviews from './webviews';
import AccountSearch from './accountSearch';
import AvailableBUs from './availableBUs';
import Settings from './settings';
import Login from './login';
import AutoUpdater from './autoUpdater';

const rootReducer = combineReducers({
    activeApplication: ActiveApplication,
    applications: Appcliations,
    spinner: Spinner,
    controls: WebviewControls,
    account: Account,
    webviews: Webviews,
    tabs: Tabbar,
    accountSearch: AccountSearch,
    availableBUs: AvailableBUs,
    settings: Settings,
    login: Login,
    autoUpdater: AutoUpdater
});

export default rootReducer;