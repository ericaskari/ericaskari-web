import { InjectionToken } from "@angular/core";

export const environment = {
    production: true
};

export const environmentInjectionToken = new InjectionToken<typeof environment>("environment")
