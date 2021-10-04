import { config } from "../config/environment";

class ConfigService {
    public getEnvironmentConfigurations() {
        return config;
    }
}

export default new ConfigService();