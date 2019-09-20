import path from "path";

export = (app: any) => {
    app.get("/", (req: any, res: any) => {
        res.sendFile(path.join(__dirname, "../../public", "index.html"));
    });
};
