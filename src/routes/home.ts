export = (app: any) => {
    app.get("/", (req: any, res: any) => {
        res.sendFile("../public/index.html");
    });
};
