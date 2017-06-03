// Routes

module.exports = function (app, IPModel, ip_renders) {
    app.get('/:user', function (req, res) {

        var ip1 = new IPModel({
            id: '1'
        });

        ip1.save(function (err, ip) {
            if (err) throw err;
            console.log("SAVED:  " + ip.id);
        });

        res.render("homepage", {
            user: req.params.user
        });
    });

    app.get('/ips/iplist', function (req, res) {
        res.render('iplist', {
            ip_list: ip_renders,
            title_placeholder: "Available IPs"
        });
    });

    app.get('/', function (req, res) {
        res.render("homepage", {
            title_placeholder: "IP Distribution | Node App"
        });
    });


    app.post('/button_click', function (req, res) {
        // console.log(req.body);
        // res.send(200);
        console.log("BUTTON CLICK");
        res.send(200);
    });

};