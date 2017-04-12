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

intent.matches('ProductCost' ,[

function (session, args, next) {

		
        var s7 = builder.EntityRecognizer.findEntity(args.entities, 'Tai nghe::Tai nghe Samsung S7');	
		var asus = builder.EntityRecognizer.findEntity(args.entities, 'Tai nghe::Tai nghe Asus');
		var sacDung = builder.EntityRecognizer.findEntity(args.entities, 'Sạc::Sạc đứng không dây SS');
		var sacNam = builder.EntityRecognizer.findEntity(args.entities, 'Sạc::Sạc nằm không dây SS');
		var denLed = builder.EntityRecognizer.findEntity(args.entities, 'Đèn LED USB'); 
		
			

			if (s7) {
				session.dialogData.searchType = 'Tai nghe Samsung S7';
				next({ response: s7.entity });
			}
			else if(asus){
				session.dialogData.searchType = 'Tai nghe Asus';
				next({ response: asus.entity });
			}
			else if(sacDung){
				session.dialogData.searchType = 'Sạc đứng không dây SS';
				next({ response: sacDung.entity });
			}
			else if(sacNam){
				session.dialogData.searchType = 'Sạc nằm không dây SS';
				next({ response: sacNam.entity });
			}
			else if(denLed){
				session.dialogData.searchType = 'Đèn LED USB';
				next({ response: denLed.entity });
			}
			else
				session.send('Tôi không hiểu hoặc shop chưa có sản phẩm này, bạn vui lòng nhập lại !');


},
	function (session, results) {
        var destination = results.response;

        var message = '';

        if ( session.dialogData.searchType === 'Tai nghe Samsung S7' ){
			 message += ' %s chính hãng bảo hành 6 tháng giá : 120k';
		}

		else if ( session.dialogData.searchType === 'Tai nghe Asus' ) {
			message += ' %s chính hãng bảo hành 6 tháng giá : 100k';
		}
		
		else if ( session.dialogData.searchType === 'Sạc đứng không dây SS' ) {
			message += ' %s chính hãng bảo hành 6 tháng giá : 690k';
		}
		
		else if ( session.dialogData.searchType === 'Sạc nằm không dây SS' ) {
			message += ' %s chính hãng bảo hành 6 tháng giá : 390k';
		}
		
		else if ( session.dialogData.searchType === 'Đèn LED USB' ) {
			message += ' %s chính hãng bảo hành 6 tháng giá : 20k';
		}
		else 
			message += 'ko thấy';

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


var DialogLabels = {
    Tainghe: 'Tai nghe',
    Sac: 'Sạc',
    Cap: 'Cáp',
	Denled: 'Đèn LED USB',
	Tais7: 'Tai nghe Samsung S7',
	Taiasus: 'Tai nghe Asus',
	Sacnhanh: 'Sạc nhanh chuẩn CE',
	Sacthuong: 'Sạc 5V 2A chuẩn CE',
	Sacnam: 'Sạc nằm không dây SS',
	Sacdung: 'Sạc đứng không dây SS',
	Cap1m: 'Cáp 1m chuẩn CE',
	Cap15: 'Cáp 1,5m chuẩn CE',
	Ketthuc: 'Kết thúc'
	
};


intent.matches('Help', [function (session) {        
		builder.Prompts.choice(session, 'Bạn cần thông tin về sản phẩm nào ? ( Vui lòng nhập đúng hoặc chọn theo số thứ tự ) ', 
		[DialogLabels.Tainghe , DialogLabels.Sac , DialogLabels.Cap , DialogLabels.Denled , DialogLabels.Ketthuc],
		{
                maxRetries: 4,
                retryPrompt: 'Not a valid option'
        }
		);
    },
	function (session, results) {
		
			var luachon_1 = results.response.entity;
			
			if(luachon_1 == DialogLabels.Tainghe){		
				builder.Prompts.choice(session, 'Các loại tai nghe hiện có , hãy chọn 1 cái : ', ['Tai nghe Samsung S7', 'Tai nghe Asus', 'Kết thúc']);
			}
			else if(luachon_1 == DialogLabels.Sac){
				builder.Prompts.choice(session, 'Các loại sạc hiện có , hãy chọn 1 cái : ', ['Sạc nhanh chuẩn CE', 'Sạc 5V 2A chuẩn CE', 'Sạc nằm không dây SS' , 'Sạc đứng không dây SS', 'Kết thúc']);	
			}
			else if(luachon_1 == DialogLabels.Cap){
				builder.Prompts.choice(session, 'Các loại cáp hiện có , hãy chọn 1 cái : ', ['Cáp 1m chuẩn CE', 'Cáp 1,5m chuẩn CE', 'Kết thúc']);
			}
			else if(luachon_1 == DialogLabels.Denled){
				session.endDialog( luachon_1 + ' giá : 20k');	
			}
			
			else if(luachon_1 == DialogLabels.Ketthuc){
				session.endDialog('Bạn cần giúp gì nữa không ?');
			}
			else
				session.endDialog('Vui lòng nhập đúng , nhập "help" để được trợ giúp ');
				
		
	},

	function (session, results) {
		var luachon_case = results.response.entity;
		
			if( luachon_case == 'Tai nghe Samsung S7'){
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



