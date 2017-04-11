var restify = require('restify');
var builder = require('botbuilder');


//=========================================================
// Bot Setup
//=========================================================
 
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

const APPID = "f7fa8691-b494-4f6f-b395-e2f8d41bc9e8";
const APPKEY = "CZNmqLtj4oTvPwRb8BZQQbt";

 
// Create chat bot
var connector = new builder.ChatConnector({
    appId: APPID,
    appPassword: APPKEY
});
var bot = new builder.UniversalBot(connector);
;


var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/927a07ad-21ce-43f8-9044-776d720a5e8e?subscription-key=c5940b22af1c4c6ea4347c211b72036c&verbose=true&timezoneOffset=0.0&q='
var recognizer = new builder.LuisRecognizer(model);
var intent = new builder.IntentDialog({ recognizers: [recognizer] });

server.post('/', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/' , intent);

intent.matches('ProductCost' ,

		[function (session, args, next) {

        // try extracting entities
        var productHeadPhone = builder.EntityRecognizer.findEntity(args.entities, 'Tai nghe');
		var productAdapter = builder.EntityRecognizer.findEntity(args.entities, 'Sạc');


			if (productHeadPhone) {
				session.dialogData.searchType = 'Tai nghe';
				next({ response: productHeadPhone.entity });
			}
			else if(productAdapter){
				session.dialogData.searchType = 'Sạc';
				next({ response: productAdapter.entity });
			}


},
	function (session, results) {
        var destination = results.response;

        var message = '';

        if ( session.dialogData.searchType === 'Tai nghe' ){
			 message += ' %s Samsung chính hãng giá : 70k';
		}

		else if ( session.dialogData.searchType === 'Sạc' ) {
			message += ' %s Samsung chính hãng giá : 150k';
		}

        session.send(message , destination);
	}
]);



intent.matches('Greetings' , function (session){
	session.send('Xin chào ! Tôi có thể giúp gì cho bạn ?');
});
intent.matches('Bye' , function (session){
	session.send('Tạm biệt, hẹn gặp lại !');
});
intent.matches('None' , function (session){
	session.send('Tôi tạm thời chưa hiểu !');
});



intent.matches('Help', [function (session) {        
		builder.Prompts.choice(session, 'Bạn cần thông tin về sản phẩm nào ? ( Vui lòng nhập đúng hoặc chọn theo số thứ tự ) ', ['Tai nghe', 'Sạc', 'Cáp', 'Đèn LED USB' , 'Kết thúc']);
    },
	function (session, results) {
		var luachon_1 = results.response.entity;
		
		if(luachon_1 == 'Tai nghe'){		
			builder.Prompts.choice(session, 'Các loại tai nghe hiện có , hãy chọn 1 cái : ', ['Tai nghe Samsung S7', 'Tai nghe Asus', 'Kết thúc']);
		}
		else if(luachon_1 == 'Sạc'){
			builder.Prompts.choice(session, 'Các loại sạc hiện có , hãy chọn 1 cái : ', ['Sạc nhanh chuẩn CE', 'Sạc 5V 2A chuẩn CE', 'Sạc nằm không dây SS' , 'Sạc đứng không dây SS', 'Kết thúc']);	
		}
		else if(luachon_1 == 'Cáp'){
			builder.Prompts.choice(session, 'Các loại cáp hiện có , hãy chọn 1 cái : ', ['Cáp 1m chuẩn CE', 'Cáp 1,5m chuẩn CE', 'Kết thúc']);
		}
		else if(luachon_1 == 'Đèn LED USB'){
			builder.Prompts.text( luachon_case + ' giá : 20k');	
		}
		else
			session.endDialog('Rất tiếc chúng tôi chưa có sản phẩm này !');
		
		
		
	},

	function (session, results) {
		var luachon_case = results.response.entity;
		
			if( luachon_case = 'Tai nghe Samsung S7'){
						session.endDialog( luachon_case + ' chính hãng bảo hành 6 tháng giá : 120k');
			}
			
			
			else if( luachon_case == 'Tai nghe Asus'){
						session.endDialog( luachon_case + ' chính hãng bảo hành 6 tháng giá : 100k');
			}
			
			
			else if( luachon_case == 'Sạc nhanh chuẩn CE'){
						session.endDialog( luachon_case + ' chính hãng bảo hành 6 tháng giá : 120k');
			}
			
			
			else if( luachon_case == 'Sạc 5V 2A chuẩn CE'){
						session.endDialog( luachon_case + ' chính hãng bảo hành 6 tháng giá : 80k');
			}
			
			
			else if( luachon_case == 'Sạc nằm không dây SS'){
						session.endDialog( luachon_case + ' chính hãng bảo hành 6 tháng giá : 390k');
			}
			
			
			else if( luachon_case == 'Sạc đứng không dây SS'){
						session.endDialog( luachon_case + ' chính hãng bảo hành 6 tháng giá : 690k');
			}
					
			else if( luachon_case == 'Cáp 1m chuẩn CE'){
						session.endDialog( luachon_case1 + ' chính hãng bảo hành 6 tháng giá : 50k');
			}
			
			
			else if( luachon_case == 'Cáp 1,5m chuẩn CE'){
						session.endDialog( luachon_case1 + ' chính hãng bảo hành 6 tháng giá : 60k');
			}		
			
			else 
						session.endDialog('Bạn cần giúp gì nữa không ?');
									
		}
		]);



