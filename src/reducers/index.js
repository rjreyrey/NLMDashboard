import { combineReducers } from 'redux';
import AppcliationsReducer from './applications';
import SpinnerReducer from './spinner';
import WebviewControls from './webviewControls';
import Account from './account';
import ActiveApplication from './activeApplication';
import Tabbar from './tabbar';
import Webviews from './webviews';
import AccountSearch from './accountSearch';

const rootReducer = combineReducers({
    applications: AppcliationsReducer,
    spinner: SpinnerReducer,
    controls: WebviewControls,
    account: Account,
    activeApplication: ActiveApplication,
    webviews: Webviews,
    tabs: Tabbar,
    accountSearch: AccountSearch
});

export default rootReducer;