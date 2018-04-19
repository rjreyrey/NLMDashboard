import { combineReducers } from 'redux';
import AppcliationsReducer from './applications';
import SpinnerReducer from './spinner';
import WebviewControls from './webviewControls';
import Account from './account';
import ActiveApplication from './activeApplication';

const rootReducer = combineReducers({
    applications: AppcliationsReducer,
    spinner: SpinnerReducer,
    controls: WebviewControls,
    account: Account,
    activeApplication: ActiveApplication
});

export default rootReducer;