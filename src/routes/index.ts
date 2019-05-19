import api from "./api";
import home from "./home";
export = (app: any) => {
    api(app);
    home(app);
};
