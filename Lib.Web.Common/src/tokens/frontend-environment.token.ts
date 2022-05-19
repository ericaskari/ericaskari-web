import { InjectionToken } from '@angular/core';

import { FrontendEnvironment } from '../interfaces/frontend.environment';

export const frontendEnvironmentInterfaceInjectionToken = new InjectionToken<FrontendEnvironment>('environment');
