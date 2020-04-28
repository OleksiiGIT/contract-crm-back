import App from "./App";

App.init().then(app => {

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log('Express server listening on port ' + port);
    });

}).catch(e => console.log(e));