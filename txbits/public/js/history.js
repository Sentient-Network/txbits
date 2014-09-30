$(function(){
    var dw_template = Handlebars.compile($("#deposit-withdraw-history-template").html());
    var trade_template = Handlebars.compile($("#trade-history-template").html());
    var login_history_template = Handlebars.compile($("#login-history-template").html());
    API.deposit_withdraw_history().success(function(data){
        var i;
        for (i = 0; i < data.result.length; i++){
            data.result[i].created = moment(Number(data.result[i].created)).format("YYYY-MM-DD HH:mm:ss");
            data.result[i].amount = zerosToSpaces(data.result[i].amount);
            data.result[i].fee = zerosToSpaces(data.result[i].fee);
            data.result[i].address = data.result[i].address ? data.result[i].address : "N/A";
            if (data.result[i].typ == 'd') {
                data.result[i].typ = "Deposit";
                data.result[i].klass = "success";
            } else {
                data.result[i].typ = "Withdrawal";
                data.result[i].klass = "danger";
            }
        }
        var html = dw_template(data.result);
        $('#deposit-withdraw-history').html(html);
    });
    API.trade_history().success(function(data){
        var i;
        for (i = 0; i < data.result.length; i++){
            data.result[i].value = zerosToSpaces(Number(data.result[i].amount) * Number(data.result[i].price));
            data.result[i].amount = zerosToSpaces(data.result[i].amount);
            data.result[i].price = zerosToSpaces(data.result[i].price);
            data.result[i].created = moment(Number(data.result[i].created)).format("YYYY-MM-DD HH:mm:ss");
            data.result[i].fee = zerosToSpaces(data.result[i].fee);
            if (data.result[i].typ == "ask") {
                data.result[i].fee_currency = data.result[i].counter;
                data.result[i].order_type = "Sell";
                data.result[i].klass = "danger";
            } else {
                data.result[i].fee_currency = data.result[i].base;
                data.result[i].order_type = "Buy";
                data.result[i].klass = "success";
            }
        }
        var html = trade_template(data.result);
        $('#trade-history').html(html);
    });
    API.login_history().success(function(data){
        var i;
        for (i = 0; i < data.result.length; i++){
            data.result[i].created = moment(Number(data.result[i].created)).format("YYYY-MM-DD HH:mm:ss");
        }
        var html = login_history_template(data.result);
        $('#login-history').html(html);
    });
});
