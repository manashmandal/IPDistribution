// Routes
var gen_ip = require('./helpers/ip').generate_ip_list;
var get_CIDR = require('./helpers/ip').get_CIDR;

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


    // Ip Details []
    app.get('/ip/detail/:ip_address', function (req, res) {
        
        //Init ip count 
        var ip_count = 5;

        if (req.query.count === undefined) {
            console.log("Count query undefined");
            ip_count = 5;
        } else{
            ip_count = +req.query.count - 2;
        }

        // Get ip address from get_request parameter
        var ip_address = req.params.ip_address;

        // Generate ips 
        var generated_ips = gen_ip({
            ip: req.params.ip_address + "/" + get_CIDR(ip_count),
            count: ip_count
        });

        res.render('ip_details', {
            title_placeholder: "Available IP Addresses from Network and CIDR",
            NetworkAddress: ip_address,
            ip_list: generated_ips,
            IPCount: ip_count
        });
    });

};