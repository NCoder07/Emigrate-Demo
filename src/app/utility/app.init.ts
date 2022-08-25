
import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService):() => Promise<boolean>
{
    return () =>
     keycloak.init(
                    {
                        config:{
                            url: 'http://10.210.6.232:8080/auth',
                            realm: 'front-office',
                            clientId: 'angular-keycloak'
                        },
                        loadUserProfileAtStartUp: false,
                        initOptions:{
                            onLoad: "login-required",
                            flow: "standard"
                        }
                    });
                }