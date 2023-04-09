import { ENV_LOCAL } from './environment.local';
import { ENV_DEV } from './environment.dev';

export interface APP_ENV_VARIABLES {
    APP_ENV: string;
    API_BASE: string; 
}

let ENV = ENV_DEV

// LOCAL ENV VARIABLES
if (process.env.REACT_APP_ENV === 'local') {
    ENV = ENV_LOCAL
}

// DEV ENV VARIABLES
if (process.env.REACT_APP_ENV === 'dev') {
    ENV = ENV_DEV
}
 
export default ENV